
import fs = require('fs-extra')
const FileHound = require('filehound')
import { TerseB } from "terse-b/terse-b"
import * as ts from 'typescript'

const log:any = new TerseB(this.constructor.name) 

/** 
 NOT MULTI INSTANCE or CONCURRENT
**/
export class Cover {
   // https://astexplorer.net
   
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
      const memFiles = FileHound.create() // hard coded but does not need to be:
         .paths(clazzDir)
         .ext('ts')
         .glob('*ViewModel.ts')
         .findSync()
      for (let f of memFiles) {
         Cover._cfile(f)
         Cover.memberList= new Set([]) //reset for next
      }
      
      const tstFiles = FileHound.create() // hard coded but does not need to be:
         .paths(testsDir)
         .ext('js')
         .glob('*Test*')
         .findSync()
      for (let f of tstFiles) {
         Cover._tfile(f)
      }

      Cover._report()
      Cover.clear()
   }
   static _report() {
      let tstCount = 0
      let totalCount = 0
      let tstClzCount = 0
      let totalClzCount = 0
     
      //sort keys
      Object.keys(Cover.clazzList).sort().forEach(function(key) {
         var value = Cover.clazzList[key];
         delete Cover.clazzList[key];
         Cover.clazzList[key] = value;
     })

      Object.keys(Cover.clazzList).forEach( key =>  {
         totalClzCount ++
         if(key in Cover.tstList) { // Clz has
            console.info('*',key)
            tstClzCount ++
            const members:Set<string> = Cover.clazzList[key]
            totalCount = totalCount + members.size
            const tests  :Set<string> = Cover.tstList[key]
            tstCount = tstCount + tests.size

            // using data structures, not AST:
            let intersection = new Set( [...members] .filter(x => tests.has(x)))
            console.info('Tested:', Array.from(intersection).sort() )
            let minus =  new Set( [...members].filter(x => !tests.has(x)) )
            console.info('Not Tested:', Array.from(minus).sort() )
         } //fi
         else console.info('** No tests for',key)

      })//loop

      console.info()
      console.info('REPORT:')
      console.info('Classes:', totalClzCount )
      console.info('Tested Classes:', tstClzCount )
      console.info('Of tested Classes, their prop #:', totalCount )
      console.info('Tested props:', tstCount )
      console.info()
   }//()

   /**
    Tester file
   @param fullFileName 
    */
   static _tfile(fullFileName) {
      console.info(fullFileName)
      const f:string = fs.readFileSync(fullFileName).toString()
      const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true)
      Cover._visitTst(ast)
      //console.info(Cover.tstList)
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
      console.info(fullFileName)
      const f:string = fs.readFileSync(fullFileName).toString()
      const ast = ts.createSourceFile(fullFileName, f, ts.ScriptTarget.Latest, true)
      Cover._visitClass(ast)
      Cover.clazzList[Cover.curClazz] = Cover.memberList
      //console.info(Cover.clazzList)
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

