
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
      Cover.curClazz=''
      Cover.memeberList=[]
      
      Cover.ids = {}
      Cover.tstList= {}
   }
   static tfile(fullFileName) {
      console.log(fullFileName)
      const f:string = fs.readFileSync(fullFileName).toString()
      const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true)
      
      Cover._visitTst(ast)
      console.log(Cover.tstList)
   }

   static ids = {}
   static tstList = {}

   static _visitTst(node: ts.Node) {
      // declared
      if (ts.isBinaryExpression(node)) 
         if (ts.isNewExpression(node.right)) {
            const cl = node.right.expression.getText()
            if(cl.includes('ViewModel')) 
               Cover.ids[node.left.getText()] = node.right.expression.getText()
         } // inner

      // accessed
      if (ts.isPropertyAccessExpression(node)) {
         const left = node.expression.getText() 
         if(left in Cover.ids ) {
            const clazz = Cover.ids[left]
            if( !(clazz in Cover.tstList)) 
               Cover.tstList[clazz] = new Set([])
            const val:Set<string> = Cover.tstList[clazz]
            val.add(node.name.getText())
         }//inner
      }//outer

      node.forEachChild(Cover._visitTst)
   }

   /**
     appends to array, including modifiers like private
     @param fullFileName 
    */
   static cfile(fullFileName) {
      console.log(fullFileName)
      const f:string = fs.readFileSync(fullFileName).toString()
      const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true)
      
      Cover._visitClass(ast)
      console.log(Cover.memeberList)
   }//()

   static curClazz:string
   static memeberList=[]
   static _visitClass(node: ts.Node) {
      if (ts.isClassDeclaration(node)) 
         Cover.curClazz  = node.name.getText()

      if (ts.isMethodDeclaration(node)) 
         try {
            let s = node.name.getText() +':'+ node.modifiers[0].getText()
            Cover.memeberList.push(Cover.curClazz +':'+ s)
         } catch(err){
            let s = node.name.getText()
            Cover.memeberList.push(Cover.curClazz +':'+ s)
         }
      
      if (ts.isPropertyDeclaration(node)) 
         try {
            let s = node.name.getText() +':'+ node.modifiers[0].getText()
            Cover.memeberList.push(Cover.curClazz +':'+ s)
         } catch(err){
            let s = node.name.getText() 
            Cover.memeberList.push(Cover.curClazz +':'+ s)
         }

      node.forEachChild(Cover._visitClass)
    }

   static filter (set:Set<string>, node: ts.Node) {

   }//()
}//class

module.exports = {
   Cover
}