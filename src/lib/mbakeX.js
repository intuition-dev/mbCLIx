"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MBakeX {
    static verx() {
        return 'v1.10.6';
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
                logger.warn(err);
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
const logger = require('tracer').console();
const FileHound = require("filehound");
const fs = require("fs-extra");
const yaml = require("js-yaml");
const FileOpsBase_1 = require("mbake/lib/FileOpsBase");
class GitDown {
    constructor(pass_) {
        var standard_input = process.stdin;
        standard_input.setEncoding('utf-8');
        logger.trace("Please, enter your git password.");
        standard_input.on('data', (password) => {
            if (password == 'exit\n') {
                logger.trace("Input failed.");
                process.exit();
            }
            else {
                const last = pass_.lastIndexOf('/');
                this.pass = password.replace(/\n/g, '');
                this.dir = pass_.substring(0, last);
                this.config = yaml.load(fs.readFileSync('gitdown.yaml'));
                logger.trace(this.dir, this.config.BRANCH);
                logger.trace(this.config);
                this.remote = 'https://' + this.config.LOGINName + ':';
                this.remote += this.pass + '@';
                this.remote += this.config.REPO + '/';
                this.remote += this.config.PROJECT;
                this._emptyFolders();
                this.process();
            }
        });
    }
    async process() {
        try {
            let b = this.config.BRANCH;
            await this._branchExists(b);
            logger.trace(this.exists);
            if (this.exists)
                await this._getEXISTINGRemoteBranch(b);
            else
                await this._getNEWRemoteBranch(b);
            this._moveTo(b);
        }
        catch (err) {
            console.error(err);
            process.exit();
        }
    }
    _moveTo(branch) {
        let dir = this.config.PROJECT;
        dir = this.dir + '/' + dir + '/' + this.config.REPOFolder;
        let dirTo = this.config.PROJECT;
        dirTo = this.dir + '/' + this.config.LOCALFolder;
        logger.trace(dir, dirTo);
        fs.moveSync(dir, dirTo);
        let dirR = this.config.PROJECT;
        dirR = this.dir + '/' + dirR;
        fs.removeSync(dirR);
        logger.trace('removed', dirR);
        logger.trace();
        fs.writeJsonSync(dirTo + '/branch.json', { branch: branch, syncedOn: MBakeX.date() });
        logger.trace('DONE!');
        logger.trace();
        process.exit();
    }
    _emptyFolders() {
        let dirR = this.config.PROJECT;
        dirR = this.dir + '/' + dirR;
        logger.trace('remove', dirR);
        fs.removeSync(dirR);
        let dirTo = this.config.PROJECT;
        dirTo = this.dir + '/' + this.config.LOCALFolder;
        logger.trace('remove', dirTo);
        fs.removeSync(dirTo);
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
        logger.trace(dir, branch);
    }
    async _branchExists(branch) {
        let cmd = this.remote;
        cmd += '.git';
        logger.info(cmd);
        const { stdout } = await execa('git', ['ls-remote', cmd]);
        this.exists = stdout.includes(branch);
        logger.trace(stdout);
    }
}
exports.GitDown = GitDown;
class Resize {
    do(dir) {
        logger.info(dir);
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
        logger.info(file, ' is low res');
        return false;
    }
    smaller(file) {
        logger.info(file);
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
