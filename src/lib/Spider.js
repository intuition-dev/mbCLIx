"use strict";
// All rights reserved by Cekvenich|INTUITION.DEV) |  Cekvenich, licensed under LGPL 3.0
// NOTE: You can extend these classes!
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileOpsBase_1 = require("mbake/lib/FileOpsBase");
const FileOpsExtra_1 = require("agentg/lib/FileOpsExtra");
const axios_1 = __importDefault(require("axios"));
const probe = require("probe-image-size");
const extractor = require("unfluff"); //scrape
// const SummarizerManager = require("node-summarizer").SummarizerManager
const cheerio = require('cheerio');
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
const formatOut = bformat({ outputMode: 'short' });
const log = bunyan.createLogger({ src: true, stream: formatOut, name: "spider" });
const yaml = require("js-yaml");
const fs = require("fs-extra");
const FileHound = require("filehound");
const sitemap_1 = require("sitemap");
class Map {
    constructor(root) {
        if (!root || root.length < 1) {
            console.info('no path arg passed');
            return;
        }
        this._root = root;
        this._rootLen = root.length;
    }
    gen() {
        //return new Promise(function (resolve, reject) {
        const m = yaml.load(fs.readFileSync(this._root + '/map.yaml'));
        this._sitemap = sitemap_1.createSitemap({ hostname: m['hostname'] });
        const hostname = m['hostname'];
        log.info(hostname);
        const rec = FileHound.create() //recursive
            .paths(this._root)
            .match('dat.yaml')
            .findSync();
        for (let val of rec) { // todo try{}
            val = FileOpsExtra_1.Dirs.slash(val);
            val = val.slice(0, -9);
            let dat = new FileOpsBase_1.Dat(val);
            let keys = dat.getAll();
            if (!('priority' in keys))
                continue;
            val = val.substring(this._rootLen);
            keys.url = val;
            this._sitemap.add(keys);
        } //for
        let xml = this._sitemap.toString(true);
        fs.writeFileSync(this._root + '/sitemap.xml', xml);
        console.info(' Sitemap ready', xml);
        // resolve('OK')
        //})
    } //()
} // class
exports.Map = Map;
// //////////////////////////////////////////////////////////////////////////////
class Scrape {
    constructor() {
        axios_1.default.defaults.responseType = 'document';
    }
    //delete me
    tst() {
        const u1 = 'https://www.nbcnews.com/think/opinion/why-trump-all-americans-must-watch-ava-duvernay-s-central-ncna1019421';
        this.s(u1).then(function (ret) {
            log.info(ret);
        });
    }
    // most likely write to dat.yaml after folder is named
    s(url, selector) {
        const THIZ = this;
        return new Promise(function (resolve, reject) {
            try {
                console.info(url);
                //feed json items
                axios_1.default.get(url).then(function (response) {
                    let ret = new Object();
                    const $ = cheerio.load(response.data);
                    if (!selector)
                        selector = 'body';
                    const textTags = $(selector);
                    let full_text = textTags.text();
                    let img = [];
                    $('img').each(function () {
                        img.push($(THIZ).attr('src'));
                    });
                    ret['img'] = img;
                    let video = [];
                    $('video').each(function () {
                        video.push($(THIZ).attr('src'));
                    });
                    ret['video'] = video;
                    let a = [];
                    $('a').each(function () {
                        let href = $(THIZ).attr('href');
                        if (href.includes('javascript:'))
                            return;
                        if (href.includes('mailto:'))
                            return;
                        var n = href.indexOf('?');
                        if (n > 0)
                            href = href.substring(0, n);
                        a.push(href);
                    });
                    ret['href'] = a;
                    let data = extractor.lazy(response.data);
                    ret['url'] = data.canonicalLink();
                    ret['id'] = data.canonicalLink();
                    ret['title'] = data.softTitle();
                    ret['content_text'] = data.text();
                    ret['image'] = data.image();
                    ret['date_published'] = data.date();
                    ret['author'] = data.author();
                    ret['attachments'] = data.videos();
                    ret['tags'] = data.tags();
                    ret['description'] = data.description();
                    // clean
                    ret['title'] = Scrape.asci(ret['title']);
                    ret['content_text'] = Scrape.asci(ret['content_text']);
                    ret['description'] = Scrape.asci(ret['description']);
                    full_text = Scrape.asci(full_text);
                    const all = ret['title'] + ' ' + ret['content_text'] + ' ' + ret['description'] + ' ' + full_text;
                    //const Summarizer = new SummarizerManager(all, 1)
                    //ret['sentiment'] = Summarizer.getSentiment()
                    //let summary = Summarizer.getSummaryByFrequency()
                    //fix to match feed.json
                    ret['content_text'] = Scrape.asci(data.description());
                    //ret['description'] = summary.summary // use this for image tag
                    ret['word_count'] = Scrape.countWords(full_text);
                    //image size
                    const iurl = ret['image'];
                    if (iurl) {
                        Scrape.getImageSize(iurl).then(function (sz) {
                            ret['image_sz'] = sz;
                            resolve(ret);
                        });
                    }
                    else
                        resolve(ret);
                });
            }
            catch (err) {
                log.warn(err);
                reject(err);
            }
        }); //pro
    }
    static getImageSize(iurl_) {
        return probe(iurl_, { timeout: 3000 });
    }
    static countWords(str) {
        return str.trim().split(/\s+/).length;
    }
    static asci(str) {
        if (!str)
            return '';
        const alpha_numeric = Array.from('\'"@,.?!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + ' ');
        let filterd_string = '';
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            let index = alpha_numeric.indexOf(char);
            if (index > -1) {
                filterd_string += alpha_numeric[index];
            }
        }
        return filterd_string;
    } //()
} //class
exports.Scrape = Scrape;
