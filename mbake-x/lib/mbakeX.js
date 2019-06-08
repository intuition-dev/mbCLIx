"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
class Verx {
    static ver() {
        return 'v1.00.09';
    }
    static date() {
        return new Date().toISOString();
    }
}
exports.Verx = Verx;
const probe = require("probe-image-size");
const node_firestore_import_export_1 = require("node-firestore-import-export");
const firebase = __importStar(require("firebase-admin"));
const execa = require('execa');
const logger = require('tracer').console();
const FileHound = require("filehound");
const fs = require("fs-extra");
const yaml = require("js-yaml");
class GitDown {
    constructor(pass_) {
        var standard_input = process.stdin;
        standard_input.setEncoding('utf-8');
        console.log("Please input text in command line.");
        standard_input.on('data', (password) => {
            if (password === 'exit\n') {
                console.log("Please, enter your git password.");
                process.exit();
            }
            else {
                console.log('password', password);
                const last = pass_.lastIndexOf('/');
                this.pass = password.replace(/\n/g, '');
                this.dir = pass_.substring(0, last);
                this.config = yaml.load(fs.readFileSync('gitdown.yaml'));
                console.log(this.dir, this.config.BRANCH);
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
            console.log(this.exists);
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
        console.log(dir, dirTo);
        fs.moveSync(dir, dirTo);
        let dirR = this.config.PROJECT;
        dirR = this.dir + '/' + dirR;
        fs.removeSync(dirR);
        console.log('removed', dirR);
        console.log();
        fs.writeJsonSync(dirTo + '/branch.json', { branch: branch, syncedOn: Verx.date() });
        console.log('DONE!');
        console.log('Maybe time to make/bake', dirTo);
        console.log('and then point http server to', dirTo);
        console.log();
        process.exit();
    }
    _emptyFolders() {
        let dirR = this.config.PROJECT;
        dirR = this.dir + '/' + dirR;
        console.log('remove', dirR);
        fs.removeSync(dirR);
        let dirTo = this.config.PROJECT;
        dirTo = this.dir + '/' + this.config.LOCALFolder;
        console.log('remove', dirTo);
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
        console.log(dir, branch);
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
}
exports.Resize = Resize;
class ExportFS {
    constructor(config) {
        this.args = config.split(':');
        this.serviceAccountConfig = this.args[0];
        this.name = this.args[1];
        this.config = require(this.serviceAccountConfig + '.json');
        firebase.initializeApp({
            credential: firebase.credential.cert(this.config),
        });
        this.collectionRef = firebase.firestore();
    }
    export() {
        let _this = this;
        node_firestore_import_export_1.firestoreExport(this.collectionRef)
            .then(data => {
            console.log(data);
            fs.writeJsonSync(_this.name + '.json', data, 'utf8');
        });
    }
}
exports.ExportFS = ExportFS;
class ImportFS {
    constructor(config) {
        this.args = config.split(':');
        this.serviceAccountConfig = this.args[0];
        this.pathToImportedFile = this.args[1];
        this.config = require(this.serviceAccountConfig + '.json');
        firebase.initializeApp({
            credential: firebase.credential.cert(this.config),
        });
        this.collectionRef = firebase.firestore();
    }
    import() {
        let _this = this;
        fs.readJson(this.pathToImportedFile + '.json', function (err, result) {
            node_firestore_import_export_1.firestoreImport(result, _this.collectionRef)
                .then(() => {
                console.log('Data was imported.');
            });
        });
    }
}
exports.ImportFS = ImportFS;
module.exports = {
    Resize, ExportFS, ImportFS, GitDown
};
