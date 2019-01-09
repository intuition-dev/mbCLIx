var path = require('path')
__dirname=path.resolve('.')
console.info(__dirname)
var pre = require(__dirname+'/pre.js')
// -----------------------------------------------


function preSass( f ) {
	pre.preSass(__dirname, '/' + f+'.sass', pre.onDoneFile , '/' + f+'.css')
}

// build:
console.info('pre processing hello world:')

preSass('test')
