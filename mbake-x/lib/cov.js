"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recast = require('recast');
const { Parser } = require('acorn');
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
      
      // test the code
      function incrementAndMultiply(a, b){
          function multiply(c, d){
            return c * d;
          }
          a++;
          b = b + 1;
          return multiply(a, b)
      }
      `;
        const ast = Parser.parse(f);
        const functionNames = [];
        recast.visit(ast, function (path) {
            var newPath = path.get('body');
            recast.visit(newPath, function (path) {
                functionNames.push(path.node.id.name);
                return false;
            });
            return false;
        });
    }
}
exports.Cover = Cover;
module.exports = {
    Cover
};
