
const logger = require('tracer').console()
import fs = require('fs-extra')

import * as recast from 'recast'

export class Cover {
   fns =[]

   file(dir?, fileName?) {

      const f:string =`function decrementAndAdd(a, b){
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
      `
      console.log('here')
      // fs.readFileSync(fileName).toString())
      const ast = recast.parse(f, {
         parser: require('acorn')
      })
       
      const THIZ = this
      recast.visit(ast, { visitFunctionDeclaration: function(path) {
         console.log(path.node.id.name)
         THIZ.fns.push(path.node.id.name)

         
         // return false to stop at this depth
         return false
       }})
   
   }//()

}//class

module.exports = {
   Cover
}