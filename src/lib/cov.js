"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: "class name" });
const fs = require("fs-extra");
const FileHound = require('filehound');
const ts = __importStar(require("typescript"));
class Cover {
    static clear() {
        Cover.curClazz = '';
        Cover.memberList = new Set([]);
        Cover.clazzList = {};
        Cover.ids = {};
        Cover.tstList = {};
    }
    static run(clazzDir, testsDir) {
        Cover.clear();
        const memFiles = FileHound.create()
            .paths(clazzDir)
            .ext('ts')
            .glob('*ViewModel.ts')
            .findSync();
        for (let f of memFiles) {
            Cover._cfile(f);
            Cover.memberList = new Set([]);
        }
        log.info();
        const tstFiles = FileHound.create()
            .paths(testsDir)
            .ext('js')
            .glob('*Test*')
            .findSync();
        for (let f of tstFiles) {
            Cover._tfile(f);
        }
        Cover._report();
        Cover.clear();
    }
    static _report() {
        let tstCount = 0;
        let totalCount = 0;
        let tstClzCount = 0;
        let totalClzCount = 0;
        Object.keys(Cover.clazzList).sort().forEach(function (key) {
            var value = Cover.clazzList[key];
            delete Cover.clazzList[key];
            Cover.clazzList[key] = value;
        });
        Object.keys(Cover.clazzList).forEach(key => {
            log.info();
            totalClzCount++;
            if (key in Cover.tstList) {
                log.info('*', key);
                tstClzCount++;
                const members = Cover.clazzList[key];
                totalCount = totalCount + members.size;
                const tests = Cover.tstList[key];
                tstCount = tstCount + tests.size;
                let intersection = new Set([...members].filter(x => tests.has(x)));
                log.info('Tested:', Array.from(intersection).sort());
                let minus = new Set([...members].filter(x => !tests.has(x)));
                log.info('Not Tested:', Array.from(minus).sort());
            }
            else
                log.info('** No tests for', key);
        });
        log.info();
        log.info('REPORT:');
        log.info('Classes:', totalClzCount);
        log.info('Tested Classes:', tstClzCount);
        log.info('Of tested Classes, their prop #:', totalCount);
        log.info('Tested props:', tstCount);
        log.info();
    }
    static _tfile(fullFileName) {
        log.info(fullFileName);
        const f = fs.readFileSync(fullFileName).toString();
        const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true);
        Cover._visitTst(ast);
    }
    static _visitTst(node) {
        if (ts.isBinaryExpression(node))
            if (ts.isNewExpression(node.right)) {
                const cl = node.right.expression.getText();
                if (cl in Cover.clazzList)
                    Cover.ids[node.left.getText()] = node.right.expression.getText();
            }
        if (ts.isPropertyAccessExpression(node)) {
            const left = node.expression.getText();
            if (left in Cover.ids) {
                const clazz = Cover.ids[left];
                if (!(clazz in Cover.tstList))
                    Cover.tstList[clazz] = new Set([]);
                const val = Cover.tstList[clazz];
                val.add(node.name.getText());
            }
        }
        node.forEachChild(Cover._visitTst);
    }
    static _cfile(fullFileName) {
        log.info(fullFileName);
        const f = fs.readFileSync(fullFileName).toString();
        const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true);
        Cover._visitClass(ast);
        Cover.clazzList[Cover.curClazz] = Cover.memberList;
    }
    static _visitClass(node) {
        if (ts.isClassDeclaration(node))
            Cover.curClazz = node.name.getText();
        if (ts.isMethodDeclaration(node))
            try {
                const mod = node.modifiers[0].getText();
                let s = node.name.getText();
                if (!(mod.includes('pr')))
                    Cover.memberList.add(s);
            }
            catch (err) {
                let s = node.name.getText();
                Cover.memberList.add(s);
            }
        if (ts.isPropertyDeclaration(node))
            try {
                const mod = node.modifiers[0].getText();
                let s = node.name.getText();
                if (!(mod.includes('pr')))
                    Cover.memberList.add(s);
            }
            catch (err) {
                let s = node.name.getText();
                Cover.memberList.add(s);
            }
        node.forEachChild(Cover._visitClass);
    }
}
exports.Cover = Cover;
Cover.ids = {};
Cover.tstList = {};
Cover.clazzList = {};
Cover.memberList = new Set([]);
module.exports = {
    Cover
};
