var path = require('path')
__dirname=path.resolve('.')
console.log(__dirname)
var pre = require(__dirname+'/pre.js')
// -----------------------------------------------


function preSass( f ) {
	pre.preSass(__dirname, '/' + f+'.sass', pre.onDoneFile , '/' + f+'.css')
}

// build:
console.log('pre processing hello world:')

preSass('test')
