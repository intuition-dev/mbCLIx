// All rights reserved by MetaBake (INTUITION.DEV) | Cekvenich, licensed under LGPL 3.0
// NOTE: You can extend these classes!

export class MBakeX {
   static verx() {
      return 'v1.11.8'
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

const execa = require('execa')

// OK
const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "x"})
import FileHound = require('filehound')
import fs = require('fs-extra')
import yaml = require('js-yaml')
import { Dirs } from 'mbake/lib/FileOpsBase';

// //////////////////////////////////////////////////////////////////
export class GitDown {
   config
   remote
   pass: string
   git: any
   dir: string
   constructor(pass_) {
      var standard_input = process.stdin;

      // Set input character encoding.
      standard_input.setEncoding('utf-8')

      // Prompt user to input data in console.
      console.log("Please, enter your git password:")

      // When user input data and click enter key.
      standard_input.on('data', (password:string) => {

         // User input exit.
         if (password == 'exit\n') {
            log.info("Input failed.")
            process.exit()
         } else {

            const last = pass_.lastIndexOf('/')
            this.pass = password.replace(/\n/g, '');
            this.dir = pass_.substring(0, last);

            this.config = yaml.load(fs.readFileSync('gitdown.yaml'))
            log.info(this.dir, this.config.BRANCH)
            log.info(this.config)

            this.remote = 'https://' + this.config.LOGINName + ':'
            this.remote += this.pass + '@'
            this.remote += this.config.REPO + '/'
            this.remote += this.config.PROJECT

            this._emptyFolder();
            this.process();

            if (typeof(this.config.LOCALFolder) !== 'undefined')
               log.info('LOCALFolder is not used, will use REPOfolder, please remove from gitdown.yaml')

         }
      })
   }//()

   async process() {
      try {
         let b = this.config.BRANCH
         await this._branchExists(b)
         log.info(this.exists)

         if (this.exists) await this._getEXISTINGRemoteBranch(b)
         else await this._getNEWRemoteBranch(b)

         this._write(b)
      } catch (err) {
         log.error(err);
         process.exit();
      }
   }

   _write(branch) { // move to folder

      let dir = this.config.PROJECT
      dir = this.dir + '/' + dir + '/' + this.config.REPOFolder

      let dirTo = this.dir + '/' + this.config.REPOFolder
      log.info(dir, dirTo)

      fs.copySync(dir, dirTo)

      let dirR = this.config.PROJECT
      dirR = this.dir + '/' + dirR
      fs.removeSync(dirR)
      log.info('removed temp', dirR)

      fs.writeJsonSync(dirTo + '/branch.json', { branch: branch, syncedOn: MBakeX.date() })
      log.info('DONE!')

      log.info()
      process.exit()
   }

   
   _emptyFolder() {
      let dirR = this.config.PROJECT
      dirR = this.dir + '/' + dirR
      log.info('clean temp', dirR)
      fs.removeSync(dirR)
   }

   async _getNEWRemoteBranch(branch) {
      const { stdout } = await execa('git', ['clone', this.remote])

      let dir = this.config.PROJECT
      dir = this.dir + '/' + dir
      //make a branch
      const { stdout2 } = await execa('git', ['remote', 'add', branch, this.remote], { cwd: dir })
      const { stdout3 } = await execa('git', ['checkout', '-b', branch], { cwd: dir })
      // add to remote
      const { stdout4 } = await execa('git', ['push', '-u', 'origin', branch], { cwd: dir })

      /* list history of the new branch TODO
      await execa('git', ['fetch'], {cwd: dir})
      const {stdout10} = await execa('git', ['log', '-8', '--oneline', 'origin/'+branch], {cwd: dir})
      log.info('history', stdout10)
      /*
      git clone https://cekvenich:PASS@github.com/cekvenich/alan
      cd folder
      git remote add test2 https://cekvenich:PASS@github.com/cekvenich/alan
      git checkout -b test2
      git push -u origin test2
      */
   }

   async _getEXISTINGRemoteBranch(branch) { // if null, master
      const { stdout } = await execa('git', ['clone', this.remote])

      let dir = this.config.PROJECT
      dir = this.dir + '/' + dir
      const { stdout2 } = await execa('git', ['checkout', branch], { cwd: dir })
      log.info(dir, branch)

      /* list history of the branch TODO
      await execa('git', ['fetch'], {cwd: dir})
      const {stdout10} = await execa('git', ['log', '-8', '--oneline', 'origin/'+branch], {cwd: dir})
      log.info('history', stdout10)
      /*
      git clone https://cekvenich:PASS@github.com/cekvenich/alan
      cd folder
      git checkout test2
      */
   }

   exists: boolean
   async _branchExists(branch) {
      let cmd = this.remote
      cmd += '.git'
      log.info(cmd)

      const { stdout } = await execa('git', ['ls-remote', cmd])
      this.exists = stdout.includes(branch)

      log.info(stdout)
      /*
      git ls-remote https://cekvenich:PASS@github.com/cekvenich/alan.git
      */
   }//()
}//class

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


module.exports = {
   Resize, GitDown, MBakeX
}
