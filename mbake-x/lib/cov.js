"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const recast = __importStar(require("recast"));
class Cover {
    file(dir, fileName) {
        const f = `function decrementAndAdd(a, b){
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
        const ast = recast.parse(f, {
            parser: require("acorn")
        });
        const functionNames = [];
        recast.visit(ast);
        console.log(functionNames);
    }
}
exports.Cover = Cover;
module.exports = {
    Cover
};
