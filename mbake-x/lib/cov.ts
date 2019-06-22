
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
   static clear() {
      //classes
      Cover.curClazz=''
      Cover.memberList= new Set([])
      Cover.clazzList = {}
      
      //tests
      Cover.ids = {}
      Cover.tstList= {}
   }
   static run(clazzDir, testsDir) {
      Cover.clear()

      Cover._cfile(clazzDir)

      Cover._tfile(testsDir)


      Cover._report()
      Cover.clear()
   }
   static _report() {
      let tstCount = 0
      let totalCount = 0
      let tstClzCount = 0
      let totalClzCount = 0
      Object.keys(Cover.clazzList).forEach( key =>  {
         logger.trace(key)
         totalClzCount ++
         if(key in Cover.tstList) { // Clz has
            tstClzCount ++
            const members:Set<string> = Cover.clazzList[key]
            totalCount = totalCount + members.size
            const tests  :Set<string> = Cover.tstList[key]
            tstCount = tstCount + tests.size

            //show
            let intersection = new Set( [...members] .filter(x => tests.has(x)))
            logger.trace('Tested:',intersection)
            let minus =  new Set( [...members].filter(x => !tests.has(x)) )
            logger.trace('Not Tested:', minus)
         } //fi
      })//loop

      console.log('REPORT:')
      console.log('Classes:', totalClzCount )
      console.log('Tested Classes:', tstClzCount )
      console.log('Tested Class props:', totalCount )
      console.log('Tested props:', tstCount )
      console.log()
   }//()

   /**
    Tester file
   @param fullFileName 
    */
   static _tfile(fullFileName) {
      console.log(fullFileName)
      const f:string = fs.readFileSync(fullFileName).toString()
      const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true)
      Cover._visitTst(ast)
      //logger.trace(Cover.tstList)
   }
   static ids = {}
   static tstList = {}
   static _visitTst(node: ts.Node) {
      // declared
      if (ts.isBinaryExpression(node)) 
         if (ts.isNewExpression(node.right)) {
            const cl:string = node.right.expression.getText()
            if( cl in Cover.clazzList ) 
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
   
   /*******************
     @param fullFileName 
    *****************/
   static _cfile(fullFileName) {
      console.log(fullFileName)
      const f:string = fs.readFileSync(fullFileName).toString()
      const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true)
      Cover._visitClass(ast)
      Cover.clazzList[Cover.curClazz] = Cover.memberList
      //logger.trace(Cover.clazzList)
   }//()
   static clazzList= {}
   static curClazz:string
   static memberList:Set<string>= new Set([])
   static _visitClass(node: ts.Node) {
      if (ts.isClassDeclaration(node)) 
         Cover.curClazz  = node.name.getText()
      if (ts.isMethodDeclaration(node)) 
         try {
            const mod:string = node.modifiers[0].getText()
            let s = node.name.getText()
            if(! (mod.includes('pr'))) //skip private or protected
               Cover.memberList.add(s)
         } catch(err){
            let s = node.name.getText()
            Cover.memberList.add(s)
         }
      if (ts.isPropertyDeclaration(node)) 
         try {
            const mod:string = node.modifiers[0].getText()
            let s = node.name.getText()
            if(! (mod.includes('pr'))) //skip private or protected
               Cover.memberList.add(s)
         } catch(err){
            let s = node.name.getText() 
            Cover.memberList.add(s)
         }
      node.forEachChild(Cover._visitClass)
    }
}//class

module.exports = {
   Cover
}