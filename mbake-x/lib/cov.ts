
const recast = require('recast')
const { Parser } = require('acorn')
import fs = require('fs-extra')

export class Cover {

   file(dir?, fileName?) {

      const f =`function decrementAndAdd(a, b){
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
      `
      const ast = Parser.parse(f) // fs.readFileSync(fileName).toString())
      
      const functionNames = []

      recast.visit(ast, function(path){
         var newPath = path.get('body')
 
         // sub-traversing
         recast.visit(newPath, function(path){
           functionNames.push(path.node.id.name)
           return false
         })
       
         // return false to not look at other functions contained in this function
         // leave this role to the sub-traversing
         return false;
       })
       
      console.log(functionNames)
   }//()

}//class

module.exports = {
   Cover
}