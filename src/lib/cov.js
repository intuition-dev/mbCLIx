"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const FileHound = require('filehound');
const terse_b_1 = require("terse-b/terse-b");
const ts = __importStar(require("typescript"));
const log = new terse_b_1.TerseB(this.constructor.name);
/**
 NOT MULTI INSTANCE or CONCURRENT
**/
class Cover {
    // https://astexplorer.net
    /**
     clear at start and end
    */
    static clear() {
        //classes
        Cover.curClazz = '';
        Cover.memberList = new Set([]);
        Cover.clazzList = {};
        //tests
        Cover.ids = {};
        Cover.tstList = {};
    }
    static run(clazzDir, testsDir) {
        Cover.clear();
        const memFiles = FileHound.create() // hard coded but does not need to be:
            .paths(clazzDir)
            .ext('ts')
            .glob('*ViewModel.ts')
            .findSync();
        for (let f of memFiles) {
            Cover._cfile(f);
            Cover.memberList = new Set([]); //reset for next
        }
        const tstFiles = FileHound.create() // hard coded but does not need to be:
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
        //sort keys
        Object.keys(Cover.clazzList).sort().forEach(function (key) {
            var value = Cover.clazzList[key];
            delete Cover.clazzList[key];
            Cover.clazzList[key] = value;
        });
        Object.keys(Cover.clazzList).forEach(key => {
            totalClzCount++;
            if (key in Cover.tstList) { // Clz has
                console.info('*', key);
                tstClzCount++;
                const members = Cover.clazzList[key];
                totalCount = totalCount + members.size;
                const tests = Cover.tstList[key];
                tstCount = tstCount + tests.size;
                // using data structures, not AST:
                let intersection = new Set([...members].filter(x => tests.has(x)));
                console.info('Tested:', Array.from(intersection).sort());
                let minus = new Set([...members].filter(x => !tests.has(x)));
                console.info('Not Tested:', Array.from(minus).sort());
            } //fi
            else
                console.info('** No tests for', key);
        }); //loop
        console.info();
        console.info('REPORT:');
        console.info('Classes:', totalClzCount);
        console.info('Tested Classes:', tstClzCount);
        console.info('Of tested Classes, their prop #:', totalCount);
        console.info('Tested props:', tstCount);
        console.info();
    } //()
    /**
     Tester file
    @param fullFileName
     */
    static _tfile(fullFileName) {
        console.info(fullFileName);
        const f = fs.readFileSync(fullFileName).toString();
        const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true);
        Cover._visitTst(ast);
        //console.info(Cover.tstList)
    }
    static _visitTst(node) {
        // declared
        if (ts.isBinaryExpression(node))
            if (ts.isNewExpression(node.right)) {
                const cl = node.right.expression.getText();
                if (cl in Cover.clazzList)
                    Cover.ids[node.left.getText()] = node.right.expression.getText();
            } // inner
        // accessed
        if (ts.isPropertyAccessExpression(node)) {
            const left = node.expression.getText();
            if (left in Cover.ids) {
                const clazz = Cover.ids[left];
                if (!(clazz in Cover.tstList))
                    Cover.tstList[clazz] = new Set([]);
                const val = Cover.tstList[clazz];
                val.add(node.name.getText());
            } //inner
        } //outer
        node.forEachChild(Cover._visitTst);
    }
    /*******************
      @param fullFileName
     *****************/
    static _cfile(fullFileName) {
        console.info(fullFileName);
        const f = fs.readFileSync(fullFileName).toString();
        const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true);
        Cover._visitClass(ast);
        Cover.clazzList[Cover.curClazz] = Cover.memberList;
        //console.info(Cover.clazzList)
    } //()
    static _visitClass(node) {
        if (ts.isClassDeclaration(node))
            Cover.curClazz = node.name.getText();
        if (ts.isMethodDeclaration(node))
            try {
                const mod = node.modifiers[0].getText();
                let s = node.name.getText();
                if (!(mod.includes('pr'))) //skip private or protected
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
                if (!(mod.includes('pr'))) //skip private or protected
                    Cover.memberList.add(s);
            }
            catch (err) {
                let s = node.name.getText();
                Cover.memberList.add(s);
            }
        node.forEachChild(Cover._visitClass);
    }
} //class
exports.Cover = Cover;
Cover.ids = {};
Cover.tstList = {};
Cover.clazzList = {};
Cover.memberList = new Set([]);
