
const logger = require('tracer').console()
import fs = require('fs-extra')


export class Cover {
   fns =[]

   file(fullFileName) {

      const f0:string =`function decrementAndAdd(a, b){
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
      const f:string = fs.readFileSync(fullFileName).toString()
 

      
   
   }//()

}//class

module.exports = {
   Cover
}