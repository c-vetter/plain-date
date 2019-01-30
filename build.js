const browserize = require('browserize')
const path = require('path')

browserize({
	named: path.resolve('calculation.js'),
	output: path.resolve('index.esm.js'),
})
