"use strict";
// All rights reserved by Cekvenich|INTUITION.DEV) |  Cekvenich, licensed under LGPL 3.0
// NOTE: You can extend these classes!
Object.defineProperty(exports, "__esModule", { value: true });
class MBakeX {
    static verx() {
        return 'v8.2.5';
    }
    static date() {
        return new Date().toISOString();
    }
    clearSrc(path_) {
        return new Promise(function (resolve, reject) {
            if (!path_ || path_.length < 1) {
                console.info('no path_ arg passed');
                reject(('no path_ arg passed'));
            }
            try {
                console.info(' Clearing ' + path_);
                let dir = FileOpsExtra_1.Dirs.slash(path_);
                const rec = FileHound.create() //recursive
                    .paths(dir)
                    .ext(['pug', 'yaml', 'js', 'ts', 'scss', 'sass', 'md'])
                    .findSync();
                rec.forEach(file => {
                    const min = file.split('.')[file.split('.').length - 2] === 'min';
                    if (!min) {
                        console.info(' Removing ' + file);
                        fs.removeSync(file);
                    }
                });
            }
            catch (err) {
                log.warn(err);
                reject(err);
            }
            resolve('OK');
        });
    }
}
exports.MBakeX = MBakeX;
const sharp = require("sharp");
const probe = require("probe-image-size");
// OK
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
const formatOut = bformat({ outputMode: 'short' });
const log = bunyan.createLogger({ src: true, stream: formatOut, name: "x" });
const FileHound = require("filehound");
const fs = require("fs-extra");
const FileOpsExtra_1 = require("agentg/lib/FileOpsExtra");
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Resize {
    do(dir) {
        log.info(dir);
        const rec = FileHound.create() //recursive
            .paths(dir)
            .ext('jpg')
            .findSync();
        let ret = []; //empty string array
        for (let s of rec) { //clean the strings
            let n = s.slice(0, -4);
            if (n.includes('.min'))
                continue;
            ret.push(n);
        }
        for (let s of ret) {
            this.smaller(s);
        }
    }
    isWide(file) {
        let data = fs.readFileSync(file + '.jpg');
        let p = probe.sync(data);
        if (p.width && p.width > 3200)
            return true;
        log.info(file, ' is low res');
        return false;
    }
    smaller(file) {
        log.info(file);
        if (!this.isWide(file))
            return;
        sharp(file + '.jpg')
            .resize(1680 * 1.9)
            .jpeg({
            quality: 74,
            progressive: true,
            trellisQuantisation: true
        })
            .blur()
            .toFile(file + '.2K.min.jpg');
        sharp(file + '.jpg')
            .resize(320 * 2)
            .jpeg({
            quality: 78,
            progressive: true,
            trellisQuantisation: true
        })
            .toFile(file + '.32.min.jpg');
    } //()
} //class
exports.Resize = Resize;
