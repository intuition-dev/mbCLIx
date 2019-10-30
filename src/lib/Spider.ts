// All rights reserved by MetaBake (INTUITION.DEV) | Cekvenich, licensed under LGPL 3.0
// NOTE: You can extend these classes!

import { Dirs, Dat} from 'mbake/lib/FileOpsBase'

import axios from 'axios'
import probe = require('probe-image-size')
import extractor = require('unfluff')//scrape

const SummarizerManager = require("node-summarizer").SummarizerManager
const cheerio = require('cheerio')

const bunyan = require('bunyan')
const bformat = require('bunyan-format')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "spider"})

// map
import sm = require('sitemap')

import yaml = require('js-yaml')

import fs = require('fs-extra')
import FileHound = require('filehound')
import { createSitemap } from 'sitemap';

export class Map {
   _sitemap
   _root
   _rootLen:number
   constructor(root) {
      if (!root || root.length < 1) {
         console.info('no path arg passed')
         return
      }
      this._root = root
      this._rootLen =  root.length
   }
   
   gen() { //:Promise<string> {
      //return new Promise(function (resolve, reject) {

      const m = yaml.load(fs.readFileSync(this._root + '/map.yaml'))

      this._sitemap = createSitemap ( { hostname: m['hostname']}  ) 
      
      const hostname = m['hostname']
      log.info(hostname)

      const rec = FileHound.create() //recursive
         .paths(this._root)
         .match('dat.yaml')
         .findSync()

      for (let val of rec) {// todo try{}
         val = Dirs.slash(val)
         val = val.slice(0, -9)
         let dat = new Dat(val)
         let keys:any = dat.getAll()
         if(!('priority' in keys))
            continue
         
         val  = val.substring(this._rootLen)

         keys.url = val
         this._sitemap.add(keys)
   
      }//for
    
      let xml = this._sitemap.toString(true)
      fs.writeFileSync(this._root + '/sitemap.xml', xml)
      console.info(' Sitemap ready', xml)

     // resolve('OK')
     //})
   }//()


}// class

// //////////////////////////////////////////////////////////////////////////////
export class Scrape {

   constructor() {
      axios.defaults.responseType = 'document'
   }

   //delete me
   tst() {
      const u1 = 'https://www.nbcnews.com/think/opinion/why-trump-all-americans-must-watch-ava-duvernay-s-central-ncna1019421'
      this.s(u1).then(function(ret){
         log.info(ret)
      })
   }

   // most likely write to dat.yaml after folder is named
   s(url:string, selector?:string) {
      const THIZ:Scrape = this
      return new Promise(function (resolve, reject) {
         try {
            console.info(url)
            //feed json items
            axios.get(url).then(function (response) {
               let ret = new Object()
               const $ = cheerio.load(response.data)
               if(!selector) selector = 'body'
               const textTags = $(selector)
               let full_text = textTags.text()
               let img = []
               $('img').each(function(){
                 img.push($(THIZ).attr('src'))
               })
               ret['img'] = img
               let video = []
               $('video').each(function(){
                  video.push($(THIZ).attr('src'))
               })
               ret['video'] = video
               let a = []
               $('a').each(function(){
                 let href:string =  $(THIZ).attr('href')
                 if(href.includes('javascript:')) return
                 if(href.includes('mailto:')) return
                 var n = href.indexOf('?')
                 if(n>0) 
                    href = href.substring(0,n)
                 a.push(href)
               })
               ret['href'] = a 

               let data = extractor.lazy(response.data)
               ret['url'] = data.canonicalLink()
               ret['id'] = data.canonicalLink()

               ret['title'] = data.softTitle()
               ret['content_text'] = data.text()
               ret['image'] = data.image()
               ret['date_published'] = data.date()
               ret['author'] = data.author()
               ret['attachments'] = data.videos()
               ret['tags'] = data.tags()
               ret['description'] = data.description()

               // clean
               ret['title'] = Scrape.asci(ret['title'])
               ret['content_text'] = Scrape.asci(ret['content_text'])
               ret['description'] = Scrape.asci(ret['description'])
               full_text = Scrape.asci(full_text)

               const all = ret['title'] +' '+  ret['content_text'] +' '+  ret['description'] +' '+ full_text
               const Summarizer = new SummarizerManager(all, 1)
               ret['sentiment'] = Summarizer.getSentiment()

               let summary = Summarizer.getSummaryByFrequency()
               //fix to match feed.json
               ret['content_text'] = Scrape.asci(data.description())
               ret['description'] = summary.summary // use this for image tag
               ret['word_count'] = Scrape.countWords(full_text) 

               //image size
               const iurl = ret['image']          
               if(iurl) {
                  Scrape.getImageSize(iurl).then(function(sz){
                     ret['image_sz'] = sz
                     resolve(ret)
                  })
               } else resolve(ret)
            })
         } catch (err) {
            log.warn(err)
            reject(err)
         }
      })//pro
   }

   static getImageSize(iurl_) {
      return probe(iurl_, {timeout: 3000})
   }

   static countWords(str) {
      return str.trim().split(/\s+/).length;
   }


   static asci(str) {
      if (!str) return ''
      const alpha_numeric = Array.from('\'"@,.?!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + ' ')
      let filterd_string = ''

      for (let i = 0; i < str.length; i++) {
         let char = str[i]
         let index = alpha_numeric.indexOf(char)
         if (index > -1) {
            filterd_string += alpha_numeric[index]
         }
      }
      return filterd_string
   }//()

}//class

module.exports = {
   Scrape, Map
}