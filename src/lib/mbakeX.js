"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MBakeX {
    static verx() {
        return 'v1.11.7';
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
                let dir = FileOpsBase_1.Dirs.slash(path_);
                const rec = FileHound.create()
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
const execa = require('execa');
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
const formatOut = bformat({ outputMode: 'short' });
const log = bunyan.createLogger({ src: true, stream: formatOut, name: "x" });
const FileHound = require("filehound");
const fs = require("fs-extra");
const yaml = require("js-yaml");
const FileOpsBase_1 = require("mbake/lib/FileOpsBase");
class GitDown {
    constructor(pass_) {
        var standard_input = process.stdin;
        standard_input.setEncoding('utf-8');
        console.log("Please, enter your git password:");
        standard_input.on('data', (password) => {
            if (password == 'exit\n') {
                log.info("Input failed.");
                process.exit();
            }
            else {
                const last = pass_.lastIndexOf('/');
                this.pass = password.replace(/\n/g, '');
                this.dir = pass_.substring(0, last);
                this.config = yaml.load(fs.readFileSync('gitdown.yaml'));
                log.info(this.dir, this.config.BRANCH);
                log.info(this.config);
                this.remote = 'https://' + this.config.LOGINName + ':';
                this.remote += this.pass + '@';
                this.remote += this.config.REPO + '/';
                this.remote += this.config.PROJECT;
                this.process();
                if (typeof (this.config.LOCALFolder) !== 'undefined')
                    log.info('LOCALFolder is not used, will use REPOfolder, please remove from gitdown.yaml');
            }
        });
    }
    async process() {
        try {
            let b = this.config.BRANCH;
            await this._branchExists(b);
            log.info(this.exists);
            if (this.exists)
                await this._getEXISTINGRemoteBranch(b);
            else
                await this._getNEWRemoteBranch(b);
            this._writeJson(b);
        }
        catch (err) {
            log.error(err);
            process.exit();
        }
    }
    _writeJson(branch) {
        let dir = this.config.PROJECT;
        dir = this.dir + '/' + dir + '/' + this.config.REPOFolder;
        let dirTo = this.dir + '/' + this.config.REPOFolder;
        fs.writeJsonSync(dirTo + '/branch.json', { branch: branch, syncedOn: MBakeX.date() });
        log.info('DONE!');
        log.info();
        process.exit();
    }
    async _getNEWRemoteBranch(branch) {
        const { stdout } = await execa('git', ['clone', this.remote]);
        let dir = this.config.PROJECT;
        dir = this.dir + '/' + dir;
        const { stdout2 } = await execa('git', ['remote', 'add', branch, this.remote], { cwd: dir });
        const { stdout3 } = await execa('git', ['checkout', '-b', branch], { cwd: dir });
        const { stdout4 } = await execa('git', ['push', '-u', 'origin', branch], { cwd: dir });
    }
    async _getEXISTINGRemoteBranch(branch) {
        const { stdout } = await execa('git', ['clone', this.remote]);
        let dir = this.config.PROJECT;
        dir = this.dir + '/' + dir;
        const { stdout2 } = await execa('git', ['checkout', branch], { cwd: dir });
        log.info(dir, branch);
    }
    async _branchExists(branch) {
        let cmd = this.remote;
        cmd += '.git';
        log.info(cmd);
        const { stdout } = await execa('git', ['ls-remote', cmd]);
        this.exists = stdout.includes(branch);
        log.info(stdout);
    }
}
exports.GitDown = GitDown;
class Resize {
    do(dir) {
        log.info(dir);
        const rec = FileHound.create()
            .paths(dir)
            .ext('jpg')
            .findSync();
        let ret = [];
        for (let s of rec) {
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
    }
}
exports.Resize = Resize;
module.exports = {
    Resize, GitDown, MBakeX
};
