
const logger = require('tracer').console()
import fs = require('fs-extra')

import * as ts from 'typescript'

/** 
 NOT MULTI INSTANCE or CONCURRENT
**/
export class Cover {
   /**
    clear at start and end
   */
   clear() {
      Cover.clazz=''
      Cover.memeberList=[]
      
      Cover.idList=[]
      Cover.tstList=[]
   }
   static tfile(fullFileName) {
      console.log(fullFileName)
      const f:string = fs.readFileSync(fullFileName).toString()
      const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true)
      
      Cover._visitTst(ast)
      console.log(Cover.tstList)
   }

   static idList=[]
   static tstList=[]
   static _visitTst(node: ts.Node) {
      if (ts.isNewExpression(node)) {

         console.log(node )

      }

      node.forEachChild(Cover._visitTst)
   }

   /**
     appends to array of method, including modifiers like private
     @param fullFileName 
    */
   static cfile(fullFileName) {
      console.log(fullFileName)
      const f:string = fs.readFileSync(fullFileName).toString()
      const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true)
      
      Cover._visitClass(ast)
      console.log(Cover.memeberList)
   }//()

   static clazz:string
   static memeberList=[]
   static _visitClass(node: ts.Node) {
      if (ts.isClassDeclaration(node)) 
         Cover.clazz  = node.name.getText()

      if (ts.isMethodDeclaration(node)) 
         try {
            let s = node.name.getText() +':'+ node.modifiers[0].getText()
            Cover.memeberList.push(Cover.clazz +':'+ s)
         } catch(err){
            let s = node.name.getText()
            Cover.memeberList.push(Cover.clazz +':'+ s)
         }
      
      if (ts.isPropertyDeclaration(node)) 
         try {
            let s = node.name.getText() +':'+ node.modifiers[0].getText()
            Cover.memeberList.push(Cover.clazz +':'+ s)
         } catch(err){
            let s = node.name.getText() 
            Cover.memeberList.push(Cover.clazz +':'+ s)
         }

      node.forEachChild(Cover._visitClass)
    }

}//class

module.exports = {
   Cover
}