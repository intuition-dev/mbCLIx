// All rights reserved by Cekvenich|INTUITION.DEV) |  Cekvenich, licensed under LGPL 3.0
// NOTE: You can extend these classes!

export class MBakeX {
   static verx() {
      return 'v8.4.5'
   }
   static date(): string {
      return new Date().toISOString()
   }

   clearSrc(path_): Promise<string> {
      return new Promise(function (resolve, reject) {
         if (!path_ || path_.length < 1) {
            console.info('no path_ arg passed')
            reject(('no path_ arg passed'))
         }
         try {

            console.info(' Clearing ' + path_)
            let dir = Dirs.slash(path_)

            const rec = FileHound.create() //recursive
               .paths(dir)
               .ext(['pug', 'yaml', 'js', 'ts', 'scss', 'sass', 'md'])
               .findSync()

            rec.forEach(file => {
               const min = file.split('.')[file.split('.').length - 2] === 'min';

               if (!min) {
                  console.info(' Removing ' + file)
                  fs.removeSync(file)
               }
            });
         } catch (err) {
            log.warn(err)
            reject(err)
         }
         resolve('OK')
      })
   }

}

import sharp = require('sharp')

import probe = require('probe-image-size')

// OK

import { TerseB } from "terse-b/terse-b"
const log:any = new TerseB('mbakeX') 

import FileHound = require('filehound')
import fs = require('fs-extra')
import { Dirs} from 'agentg/lib/FileOpsExtra'

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Resize {

   do(dir) {
      log.info(dir)

      const rec = FileHound.create() //recursive
         .paths(dir)
         .ext('jpg')
         .findSync()

      let ret: string[] = [] //empty string array
      for (let s of rec) {//clean the strings
         let n = s.slice(0, -4)
         if (n.includes('.min')) continue
         ret.push(n)

      }
      for (let s of ret) {
         this.smaller(s)
      }
   }

   isWide(file): boolean {
      let data = fs.readFileSync(file + '.jpg')
      let p = probe.sync(data)
      if (p.width && p.width > 3200) return true
      log.info(file, ' is low res')
      return false
   }


   smaller(file) {
      log.info(file)
      if (!this.isWide(file)) return
      sharp(file + '.jpg')
         .resize(1680 * 1.9)
         .jpeg({
            quality: 74,
            progressive: true,
            trellisQuantisation: true
         })
         .blur()
         .toFile(file + '.2K.min.jpg')

      sharp(file + '.jpg')
         .resize(320 * 2)
         .jpeg({
            quality: 78,
            progressive: true,
            trellisQuantisation: true
         })
         .toFile(file + '.32.min.jpg')

   }//()

}//class

