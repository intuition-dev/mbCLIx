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
        Cover.clazz = '';
        Cover.memeberList = [];
        Cover.idList = [];
        Cover.tstList = [];
    }
    static tfile(fullFileName) {
        console.log(fullFileName);
        const f = fs.readFileSync(fullFileName).toString();
        const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true);
        Cover._visitTst(ast);
        console.log(Cover.tstList);
    }
    static _visitTst(node) {
        if (ts.isNewExpression(node)) {
            console.log(node);
        }
        node.forEachChild(Cover._visitTst);
    }
    static cfile(fullFileName) {
        console.log(fullFileName);
        const f = fs.readFileSync(fullFileName).toString();
        const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true);
        Cover._visitClass(ast);
        console.log(Cover.memeberList);
    }
    static _visitClass(node) {
        if (ts.isClassDeclaration(node))
            Cover.clazz = node.name.getText();
        if (ts.isMethodDeclaration(node))
            try {
                let s = node.name.getText() + ':' + node.modifiers[0].getText();
                Cover.memeberList.push(Cover.clazz + ':' + s);
            }
            catch (err) {
                let s = node.name.getText();
                Cover.memeberList.push(Cover.clazz + ':' + s);
            }
        if (ts.isPropertyDeclaration(node))
            try {
                let s = node.name.getText() + ':' + node.modifiers[0].getText();
                Cover.memeberList.push(Cover.clazz + ':' + s);
            }
            catch (err) {
                let s = node.name.getText();
                Cover.memeberList.push(Cover.clazz + ':' + s);
            }
        node.forEachChild(Cover._visitClass);
    }
}
Cover.idList = [];
Cover.tstList = [];
Cover.memeberList = [];
exports.Cover = Cover;
module.exports = {
    Cover
};
