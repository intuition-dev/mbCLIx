
const recast = require('recast')
const { Parser } = require('acorn')
import fs = require('fs-extra')

class Cover {

   file(dir, fileName) {
      const ast = Parser.parse(fs.readFileSync(fileName).toString())
      
   }



}


module.exports = {
   Cover
}