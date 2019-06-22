
const logger = require('tracer').console()
import fs = require('fs-extra')

import { Project } from 'ts-morph'

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
   
      const project = new Project();


      if(true) return

      const f:string = fs.readFileSync(fullFileName).toString()
      const sourceFile = project.addExistingSourceFile("path/to/file.ts")
      
      const diagnostics = project.getPreEmitDiagnostics()

      console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

      
   
   }//()

}//class

module.exports = {
   Cover
}