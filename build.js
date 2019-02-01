const browserize = require('browserize')
const path = require('path')

const { execFileSync: run } = require('child_process')


browserize({
	named: path.resolve('calculation.js'),
	output: path.resolve('index.mjs'),
})

run(
	'npx.cmd',
	[
		'documentation',
		'readme',
		'--document-exported',
		'--section', 'API',
		'index.mjs',
	]
)
