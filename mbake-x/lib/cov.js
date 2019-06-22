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
    clear() {
        Cover.clazzList = {};
        Cover.curClazz = '';
        Cover.memberList = [];
        Cover.ids = {};
        Cover.tstList = {};
    }
    static tfile(fullFileName) {
        console.log(fullFileName);
        const f = fs.readFileSync(fullFileName).toString();
        const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true);
        Cover._visitTst(ast);
        logger.trace(Cover.tstList);
    }
    static _visitTst(node) {
        if (ts.isBinaryExpression(node))
            if (ts.isNewExpression(node.right)) {
                const cl = node.right.expression.getText();
                if (cl.includes('ViewModel'))
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
    static cfile(fullFileName) {
        console.log(fullFileName);
        const f = fs.readFileSync(fullFileName).toString();
        const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true);
        Cover._visitClass(ast);
        Cover.clazzList[Cover.curClazz] = Cover.memberList;
        logger.trace(Cover.clazzList);
    }
    static _visitClass(node) {
        if (ts.isClassDeclaration(node))
            Cover.curClazz = node.name.getText();
        if (ts.isMethodDeclaration(node))
            try {
                let s = node.name.getText() + ':' + node.modifiers[0].getText();
                Cover.memberList.push(Cover.curClazz + ':' + s);
            }
            catch (err) {
                let s = node.name.getText();
                Cover.memberList.push(Cover.curClazz + ':' + s);
            }
        if (ts.isPropertyDeclaration(node))
            try {
                let s = node.name.getText() + ':' + node.modifiers[0].getText();
                Cover.memberList.push(Cover.curClazz + ':' + s);
            }
            catch (err) {
                let s = node.name.getText();
                Cover.memberList.push(Cover.curClazz + ':' + s);
            }
        node.forEachChild(Cover._visitClass);
    }
    static filter(list, node) {
    }
}
Cover.ids = {};
Cover.tstList = {};
Cover.clazzList = {};
Cover.memberList = [];
exports.Cover = Cover;
module.exports = {
    Cover
};
