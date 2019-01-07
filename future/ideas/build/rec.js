/*
Installation:

npm install walk-sync
npm install watch
*/

var path = require('path')
const walkSync = require('walk-sync')
var fs = require('fs')
const vm = require('vm')
var pre = require('./pre.js')
const watch = require('watch')
const process = require('process')
// -----------------------------------------------
const DIR = '/Users/vic/Dropbox/Apps/site44/cekvenich.site44.com/'
console.log(DIR)


// -----------------------------------------------
var vmOpts = { // recurse
	require: require,
	console: console
}
function rec() { // run _sync in each folder
	var paths = walkSync(DIR, { globs: ['**/_sync.js'] })
	var arrayLength = paths.length
	console.log(arrayLength)
	for (var i = 0; i < arrayLength; i++) {
		process.chdir(DIR)
		var onlyPath = DIR + path.dirname(paths[i])
		//console.log(onlyPath)
		var code = fs.readFileSync(DIR+paths[i])
		process.chdir(onlyPath) // chdir
		vm.runInNewContext(code, vmOpts) // make
		console.log('----------------------------------------------------------------------')
		console.log()
	}//loop
}//()
rec() // rebuild at start

// -----------------------------------------------
// watch and call rec if changed
var waOpts = {
	interval: 1
}
watch.watchTree(DIR, waOpts, function (f, curr, prev) {
	try {
		var ext = path.extname(f)
		console.log(ext) // if sass or pug, run rec()
		if('.pug' == ext || '.md' == ext || '.sass' == ext || '.scss' == ext)
			rec()
	} catch(err) {  }
})//watchTree
