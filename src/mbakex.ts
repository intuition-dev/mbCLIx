#!/usr/bin/env node
// All rights reserved by INTUITION.DEV |  Cekvenich, licensed under LGPL 3.0

import commandLineArgs = require('command-line-args')

import { MBake } from 'mbake/lib/Base'
import { Wa } from 'mbake/lib/Wa'
import { Map } from './lib/Spider'
import { Resize, MBakeX } from './lib/mbakeX'
import { FileOps } from 'mbake/lib/FileOpsBase'

import { Dirs} from 'agentg/lib/FileOpsExtra'

import { VersionNag, DownloadC  } from 'agentg/lib/FileOpsExtra'

import { Cover } from './lib/cov'

// imports done /////////////////////////////////////////////
const cwd: string = process.cwd()

function version() {
   console.info('mbakex CLI version: ' + MBakeX.verx()) // tsc
}

function help() {
   console.info()
   console.info('mbakex CLI version: ' + MBakeX.verx()) // tsc
   console.info('  your node version is ' + process.version)
   console.info('  from ' + __dirname)
   console.info()
   console.info('Usage: ')
   console.info('  For local watcher and server on port:')
   console.info('    -p, --port to specify port for watcher:                    mbakex -w . -p 8091 -r 9857')
   console.info('     (must be used with -r)')
   console.info('    -r, --reload-port to specify port for live reload :        mbakex -w . --port=8091 --reload-port=9857')
   console.info()

   console.info('  To bake with dev. ENV flag(1) in prod(default is 0):         mbakex --bakeD .')
   console.info('  To bake with staging ENV flag(2) in prod:                    mbakex --bakeS .')
   console.info('  To bake with production ENV flag(3) in prod:                 mbakex --bakeP .')

   console.info()
   console.info('  Add|clone an item|page from:to :                             mbakex --add dir:source:target')

   console.info()
   console.info('  To map map.yaml to sitemap.xml                               mbakex -m .')
   console.info('  Compress 3200px or larger .jpg images to 2 sizes:            mbakex -i .')
   console.info()

   console.info('  To get a test coverage report of ViewModel and Test classes: mbakex --cover ViewModelDir:TestDir')
   console.info()
   
   console.info('  To recursively remove source files:                          mbakex --src .')
   console.info()

   console.info('    Note: . is current directory, or use any path instead of .')
   console.info(' -------------------------------------------------------------')
   console.info()

   console.info()
}//()

// args: //////////////////////////////////////////////////////////////////////////////////////////////////////
const optionDefinitions = [
   { name: 'mbakex', defaultOption: true },

   { name: 'help', alias: 'h', type: Boolean },
   { name: 'version', alias: 'v', type: Boolean },

   { name: 'watcher', alias: 'w', type: Boolean },

   { name: 'port', alias: 'p', type: String },
   { name: 'reload-port', alias: 'r', type: String },

   { name: 'src', type: Boolean },

   { name: 'bakeP', type: Boolean },
   { name: 'bakeS', type: Boolean },
   { name: 'bakeD', type: Boolean },

   { name: 'add', type: Boolean },

   { name: 'cover', type: Boolean },

   { name: 'map', alias: 'm', type: Boolean },
   { name: 'img', alias: 'i', type: Boolean },

]

const argsParsed = commandLineArgs(optionDefinitions)
let arg: string = argsParsed['mbakex']
console.info()

VersionNag.isCurrent('mbakex', MBakeX.verx() ).then(function(isCurrent_:boolean){
   try{
   if(!isCurrent_) 
      console.log('There is a newer version of mbakex, please update.')

   } catch(err) {
      console.log(err)
   }
})// 

// ///////////////////////////////////////////////////////////////////////////////////////////

function cover(arg) {
   var res = arg.split(':')
   const VMdir = res[0]
   const TestDir = res[1]
   Cover.run(VMdir, TestDir)
}

function add(arg) {
   const args = arg.split(':')
   let dir:string = args[0]
   if(dir.endsWith('.')) {
      dir = dir.slice(0, -1)
   }

   console.log(dir, args)
   const f = new FileOps(dir)
   f.clone(args[1], args[2])
}

//  ////////////////////////////////////////////////////////////////////////////////////////////////

function map(arg) {
   new Map(arg).gen()
}

function img(arg) {
   new Resize().do(arg)
}

function src(arg) {
   new MBakeX().clearSrc(arg)

}
function bakeP(arg) {
   let pro: Promise<string> = new MBake().bake(arg, 3)
   pro.then(function (val) {
      console.log(val)
      
   })
}
function bakeS(arg) {
   let pro: Promise<string> = new MBake().bake(arg, 2)
   pro.then(function (val) {
      console.log(val)
      
   })
}
function bakeD(arg) {
   let pro: Promise<string> = new MBake().bake(arg, 1)
   pro.then(function (val) {
      console.log(val)
      
   })
}

// get folder to be processed: ///////////////////////////////////////////////////////////////////////////////////////////////////////
if (arg) {
   arg = Dirs.slash(arg)
   if (arg.startsWith('/')) {
      //do nothing, full path is arg
   } else if (arg.startsWith('..')) { // few  cases to test
      arg = arg.substring(2)
      let d = cwd
      d = Dirs.slash(d)
      // find offset
      let n = d.lastIndexOf('/')
      d = d.substring(0, n)
      arg = d + arg
   } else { // just plain, dir passed
      arg = cwd + '/' + arg
   }
}

// start: /////////////////////////////////////////////////////////////////////////////////////
if (argsParsed.watcher) {
      Wa.watch(arg, argsParsed.port, argsParsed['reload-port']);
   }
   else if (argsParsed.img) {
      img(arg)
   }
   else if (argsParsed.map)
      map(arg)
   else if (argsParsed.src)
      src(arg)
   else if (argsParsed.bakeP)
      bakeP(arg)
   else if (argsParsed.bakeS)
      bakeS(arg)
   else if (argsParsed.bakeD)
      bakeD(arg)
   else if (argsParsed.add)
      add(arg)
   else if (argsParsed.cover)
      cover(arg)
   else if (argsParsed.version)
      version()
   else if (argsParsed.help)
      help()
   else if (!arg)
      help()

