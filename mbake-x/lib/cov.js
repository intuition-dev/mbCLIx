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
const recast = __importStar(require("recast"));
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
        const f = fs.readFileSync(fullFileName).toString();
        const ast = recast.parse(f, {
            parser: require("recast/parsers/acorn")
        });
        const THIZ = this;
        recast.visit(ast, { visitFunctionDeclaration: function (path) {
                let newPath = path.get('body');
                recast.visit(newPath, { visitFunctionDeclaration: function (path) {
                        console.log(path.node.id.name);
                        THIZ.fns.push(path.node.id.name);
                        return false;
                    } });
                return false;
            } });
    }
}
exports.Cover = Cover;
module.exports = {
    Cover
};
