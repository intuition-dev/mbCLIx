"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('tracer').console();
const fs = require("fs-extra");
const ts_morph_1 = require("ts-morph");
class Cover {
    constructor() {
        this.fns = [];
    }
    file(fullFileName) {
        const f0 = `function decrementAndAdd(a, b){
         function add(c, d){
            return c + d;
         }
         a--;
         b = b - 1;
         return add(a,b)
      }
      
      function incrementAndMultiply(a, b){
          function multiply(c, d){
            return c * d;
          }
          a++;
          b = b + 1;
          return multiply(a, b)
      }
      `;
        const project = new ts_morph_1.Project();
        if (true)
            return;
        const f = fs.readFileSync(fullFileName).toString();
        const sourceFile = project.addExistingSourceFile("path/to/file.ts");
        const diagnostics = project.getPreEmitDiagnostics();
        console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));
    }
}
exports.Cover = Cover;
module.exports = {
    Cover
};
