"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('tracer').console();
const fs = require("fs-extra");
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
        Cover._cfile(clazzDir);
        Cover._tfile(testsDir);
        let tstCount = 0;
        let totalCount = 0;
        let tstClzCount = 0;
        let totalClzCount = 0;
        Object.keys(Cover.clazzList).forEach(key => {
            logger.trace(key);
            totalClzCount++;
            if (key in Cover.tstList) {
                tstClzCount++;
                const members = Cover.clazzList[key];
                totalCount = totalCount + members.size;
                const tests = Cover.tstList[key];
                tstCount = tstCount + tests.size;
            }
            else {
            }
        });
        console.log('REPORT:');
        console.log('Classes:', totalClzCount);
        console.log('Tested Classes:', tstClzCount);
        console.log('Tested Class props:', totalCount);
        console.log('Tested props:', tstCount);
        console.log();
        Cover.clear();
    }
    static _tfile(fullFileName) {
        console.log(fullFileName);
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
        console.log(fullFileName);
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
Cover.ids = {};
Cover.tstList = {};
Cover.clazzList = {};
Cover.memberList = new Set([]);
exports.Cover = Cover;
module.exports = {
    Cover
};
