/*

License: MIT

Used as generator steps for pug w/ filters, sass, riot, etc.

Installation steps(sudo, admin or supper user):
	npm -g install node-sass
	npm -g install autoprefixer
	npm -g install clean-css
	npm -g install riot
	npm -g install pug
	npm -g install jstransformer-markdown-it
	npm -g install jstransformer-sass

Current version of node is 7.12 and node-sass version is 3.13: npm -g ls node-sass

More: http://pugjs.org/language/filters.html
*/

// -- INSTALL: --
module.paths.push('/usr/local/lib/node_modules')
const sass		= require('node-sass')
const autoprefixer = require('autoprefixer')
const postcss	= require('postcss')
const CleanCSS = require('clean-css');
const pug 		= require('pug')
const riot		= require('riot')
const fs  		= require('fs')

//install pug filters:
require('jstransformer')
require('jstransformer-markdown-it')
require('jstransformer-sass')
// -----------------------------------------------

// -- CONFIG: --
var PUG = {}
PUG.pretty=true

var SASS = {}
SASS.clean = false
SASS.outputStyle = 'compact'

var RIOT = {}

var UG = {}
UG.beautify = false
UG.preamble = 'All Rights Reserved - Contact this domain webmaster for Intellectual Property licensing'

// -- STEPS: --

function doErr(err, loc, onComp, ctx_, root) {
	console.log(loc)
	console.log(err)
	onComp(err, ctx_, root)
}

exports.prePug = function(root, path, onComp, ctx_) {
	var fullPath = root + path
	try {
		var res = pug.renderFile(fullPath, PUG)
		onComp(res, ctx_, root)
	} catch (err) { doErr(err, 'catch pug', onComp, ctx_, root) } //err
}//()

exports.preSass = function(root, path, onComp, ctx_) {//optional
	var fullPath = root + path
	try {
		var res = sass.renderSync({ file: fullPath, SASS })
		var css = res.css.toString()
		postcss([ autoprefixer ]).process(css).then(function (result) {
			result.warnings().forEach(function (warn) {
				doErr(warn.toString(), 'postcss', onComp, ctx_, root)
				throw(warn.toString() + ctx)
			})
			var fixed = result.css
			//console.log(fixed)
			if(SASS.clean)
				new CleanCSS().minify(fixed, function (error, minified) {
					if(error) { doErr(error, 'CleanCSS', onComp, ctx_, root); return }
					onComp(minified.styles, ctx_, root)
				})
			else onComp(fixed, ctx_, root)
		})
	} catch (err) { doErr(err, 'catch sass', onComp, ctx_, root) } //err
}//()

exports.preRiotPug = function(root, path, onComp, ctx_) { // calls pug b4 riot
	var fullPath = root + path
	try {
		var source_string = pug.renderFile(fullPath, PUG)
		var js  = riot.compile(source_string)
		onComp(js, ctx_, root)
	} catch (err) { doErr(err, 'catch riotPug', onComp, ctx_, root) } //err
}//()

exports.onDoneFile = function (data, ctx, dir) {
	//console.log(data)
	console.log(ctx)
	fs.writeFile(dir + ctx, data, function(err) {
		if(err) return console.log(err)
	})
}
