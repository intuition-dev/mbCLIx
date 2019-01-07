/*
Copyright Vic Cekvenich - 2016: all rights reserved
Licensed under these terms only: http://creativecommons.org/licenses/by-sa/4.0
If you require an alternative email vin(at)eml.cc

Used as generator steps for pug w/ filters, sass and uglify

Installation steps:
	npm install node-sass
	npm install autoprefixer
	npm install - g clean-css
	npm install uglify-js
	npm install pug
	npm install jstransformer-markdown-it
	(sudo) npm install jstransformer-sass

*/
// http://pugjs.org/language/filters.html

// -- CONFIG: --
var PUG = {}
PUG.pretty=true

var SASS = {}
SASS.clean = true

var UG = {}
UG.beautify = false
UG.preamble = 'All Rights Reserved - Contact this domain webmaster for Intellectual Property licensing'

// -- INSTALL: --
const sass	= require('node-sass')
const autoprefixer = require('autoprefixer');
const postcss	= require('postcss')
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js')
const pug 		= require('pug')
//load pug filters:
require('jstransformer')
require('jstransformer-markdown-it')
require('jstransformer-sass')

// -- CODE: --

function doErr(err, loc, onComp, ctx_) {
	console.log(loc)
	console.log(err)
	onComp(err, ctx_)
}

exports.genPug = function(root, path, onComp, ctx_) {
	var fullPath = root + path
	try {
		var res = pug.renderFile(fullPath, PUG)
		onComp(res, ctx_)
	} catch (err) { doErr(err, 'catch pug', onComp, ctx_) } //err
}//()

exports.genUg = function(root, files, onComp, ctx_) {//optional
	var arrayLength = files.length
	var fullFiles = []
	for (var i = 0; i < arrayLength; i++) {
		var fullPath = root + files[i]
		fullFiles.push(fullPath)
	}
	//console.log(fullFiles)
	try {
		var res = UglifyJS.minify(fullFiles, {
			mangle:
				{ }
			, compress:
				{ drop_console: true, collapse_vars: true, screw_ie8: true
				}
			, output:   {
				preamble: UG.preamble, beautify: UG.beautify
			}
		})
		onComp(res.code, ctx_)
	} catch (err) { doErr(err, 'catch ug', onComp, ctx_) } //err
}//()

SASS.outputStyle = 'expanded'
exports.genSass = function(root, path, onComp, ctx_) {//optional
	var fullPath = root + path
	try {
		var res = sass.renderSync({ file: fullPath, SASS })
		var css = res.css.toString()
		postcss([ autoprefixer ]).process(css).then(function (result) {
			result.warnings().forEach(function (warn) {
				doErr(warn.toString(), 'postcss', onComp, ctx_)
				throw(warn.toString() + ctx)
			})
			var fixed = result.css
			//console.log(fixed)
			if(SASS.clean)
				new CleanCSS().minify(fixed, function (error, minified) {
					if(error) { doErr(error, 'CleanCSS', onComp, ctx_); return }
					onComp(minified.styles, ctx_)
				})
			else onComp(fixed, ctx_)
		})
	} catch (err) { doErr(err, 'catch sass', onComp, ctx_) } //err
}//()
