// `rules` states
const ACTIVATE = 'error'
const DEACTIVATE = 'off'


module.exports = {
	env: {
		es6: true,
		node: true,
	},

	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},

	plugins: [
		'eslint-comments',
		'import',
		'jsdoc',
	],

	extends: [
		'eslint:recommended',
		'plugin:ava/recommended',
		'plugin:unicorn/recommended',
	],

	rules: {
		// POSSIBLE ERRORS
		'no-await-in-loop': ACTIVATE,
		'no-prototype-builtins': ACTIVATE,
		'valid-typeof': [
			ACTIVATE,
			{
				requireStringLiterals: true,
			},
		],


		// BEST PRACTICES
		'array-callback-return': ACTIVATE,
		'block-scoped-var': ACTIVATE,
		'consistent-return': ACTIVATE,
		'curly': [
			ACTIVATE,
			'multi-line',
			'consistent',
		],
		'default-case': ACTIVATE,
		'dot-location': [
			ACTIVATE,
			'property',
		],
		'dot-notation': ACTIVATE,
		'eqeqeq': [
			ACTIVATE,
			'always',
			{
				null: 'ignore',
			},
		],
		'guard-for-in': ACTIVATE,
		'no-caller': ACTIVATE,
		'no-case-declarations': ACTIVATE,
		'no-else-return': ACTIVATE,
		'no-lone-blocks': ACTIVATE,
		'no-multi-spaces': ACTIVATE,
		'no-multi-str': ACTIVATE,
		'no-param-reassign': ACTIVATE,
		'no-proto': ACTIVATE,
		'no-return-assign': ACTIVATE,
		'no-sequences': ACTIVATE,
		'no-throw-literal': ACTIVATE,
		'no-unused-expressions': ACTIVATE,
		'no-useless-call': ACTIVATE,
		'no-useless-catch': ACTIVATE,
		'no-useless-concat': ACTIVATE,
		'no-useless-return': ACTIVATE,
		'no-void': ACTIVATE,
		'no-with': ACTIVATE,
		'radix': ACTIVATE,
		'require-await': ACTIVATE,
		'yoda': [
			ACTIVATE,
			'never',
			{
				exceptRange: true,
			},
		],


		// VARIABLES
		'no-shadow': ACTIVATE,
		'no-shadow-restricted-names': ACTIVATE,
		'no-undef-init': ACTIVATE,
		'no-undefined': ACTIVATE,


		// NODE.JS
		'global-require': ACTIVATE,
		'no-mixed-requires': ACTIVATE,
		'no-path-concat': ACTIVATE,
		'no-process-exit': ACTIVATE,


		// STYLE
		'brace-style': [
			ACTIVATE,
			'1tbs',
			{
				allowSingleLine: true,
			},
		],
		'camelcase': ACTIVATE,
		'comma-dangle': [
			ACTIVATE,
			'always-multiline',
		],
		'comma-spacing': [
			ACTIVATE,
			{
				after: true,
				before: false,
			},
		],
		'comma-style': [
			ACTIVATE,
			'last',
		],
		'computed-property-spacing': ACTIVATE,
		'eol-last': ACTIVATE,
		'func-call-spacing': ACTIVATE,
		'func-names': ACTIVATE,
		'indent': [
			ACTIVATE,
			'tab',
			{
				ArrayExpression: 1,
				CallExpression: {
					arguments: 1,
				},
				FunctionDeclaration: {
					body: 1,
					parameters: 1,
				},
				FunctionExpression: {
					body: 1,
					parameters: 1,
				},
				MemberExpression: 0,
				ObjectExpression: 1,
				SwitchCase: 1,
				VariableDeclarator: 1,
				outerIIFEBody: 1,
			},
		],
		'key-spacing': ACTIVATE,
		'keyword-spacing': ACTIVATE,
		'linebreak-style': ACTIVATE,
		'new-parens': ACTIVATE,
		'newline-per-chained-call': ACTIVATE,
		'no-array-constructor': ACTIVATE,
		'no-bitwise': ACTIVATE,
		'no-lonely-if': ACTIVATE,
		'no-mixed-operators': ACTIVATE,
		'no-multiple-empty-lines': [
			ACTIVATE,
			{
				max: 2,
				maxBOF: 0,
				maxEOF: 0,
			},
		],
		'no-negated-condition': ACTIVATE,
		'no-nested-ternary': ACTIVATE,
		'no-tabs': [
			ACTIVATE, {
				allowIndentationTabs: true,
			},
		],
		'no-trailing-spaces': ACTIVATE,
		'no-unneeded-ternary': [
			ACTIVATE,
			{
				defaultAssignment: false,
			},
		],
		'no-whitespace-before-property': ACTIVATE,
		'nonblock-statement-body-position': ACTIVATE,
		'object-curly-spacing': [
			ACTIVATE,
			'always',
		],
		'object-property-newline': [
			ACTIVATE,
			{
				allowMultiplePropertiesPerLine: true,
			},
		],
		'one-var': [
			ACTIVATE,
			'never',
		],
		'one-var-declaration-per-line': [
			ACTIVATE,
			'always',
		],
		'padded-blocks': [
			ACTIVATE,
			'never',
		],
		'quote-props': [
			ACTIVATE,
			'consistent-as-needed',
		],
		'quotes': [
			ACTIVATE,
			'single',
		],
		'semi': [
			ACTIVATE,
			'never',
		],
		'semi-spacing': ACTIVATE,
		'space-before-blocks': ACTIVATE,
		'space-before-function-paren': ACTIVATE,
		'space-in-parens': ACTIVATE,
		'space-infix-ops': ACTIVATE,
		'space-unary-ops': ACTIVATE,
		'spaced-comment': [
			ACTIVATE,
			'always',
		],
		'unicode-bom': ACTIVATE,


		// ES6
		'no-confusing-arrow': [
			ACTIVATE,
			{
				allowParens: true,
			},
		],
		'no-useless-computed-key': ACTIVATE,
		'no-useless-constructor': ACTIVATE,
		'no-useless-rename': ACTIVATE,
		'no-var': ACTIVATE,
		'object-shorthand': [
			ACTIVATE,
			'always',
			{
				avoidQuotes: true,
			},
		],
		'prefer-arrow-callback': [
			ACTIVATE,
			{
				allowNamedFunctions: true,
				allowUnboundThis: false,
			},
		],
		'prefer-const': ACTIVATE,
		'prefer-rest-params': ACTIVATE,
		'prefer-spread': ACTIVATE,
		'prefer-template': ACTIVATE,
		'rest-spread-spacing': ACTIVATE,
		'template-curly-spacing': ACTIVATE,


		// MISCELLANEOUS


		'require-jsdoc': ACTIVATE,
		'strict': ACTIVATE,


		// PLUGINS


		'ava/no-cb-test': ACTIVATE,


		'eslint-comments/disable-enable-pair': [
			ACTIVATE, {
				allowWholeFile: true,
			},
		],
		'eslint-comments/no-aggregating-enable': ACTIVATE,
		'eslint-comments/no-duplicate-disable': ACTIVATE,
		'eslint-comments/no-unlimited-disable': ACTIVATE,
		'eslint-comments/no-unused-disable': ACTIVATE,
		'eslint-comments/no-unused-enable': ACTIVATE,


		'import/group-exports': ACTIVATE,
		'import/newline-after-import': [
			ACTIVATE,
			{ count: 2 },
		],
		'import/no-absolute-path': ACTIVATE,
		'import/no-cycle': ACTIVATE,
		'import/no-dynamic-require': ACTIVATE,
		'import/no-extraneous-dependencies': [
			ACTIVATE,
			{
				devDependencies: [
					'build.js',
					'**/__tests__/**',
				],
				optionalDependencies: false,
			},
		],
		'import/no-self-import': ACTIVATE,
		'import/no-unresolved': [
			ACTIVATE,
			{
				commonjs: true,
			},
		],
		'import/no-useless-path-segments': ACTIVATE,


		'jsdoc/check-examples': ACTIVATE,
		'jsdoc/check-param-names': ACTIVATE,
		'jsdoc/check-tag-names': ACTIVATE,
		'jsdoc/check-types': ACTIVATE,
		'jsdoc/newline-after-description': ACTIVATE,
		'jsdoc/no-undefined-types': ACTIVATE,
		'jsdoc/require-description-complete-sentence': ACTIVATE,
		'jsdoc/require-hyphen-before-param-description': ACTIVATE,
		'jsdoc/require-param': ACTIVATE,
		'jsdoc/require-param-name': ACTIVATE,
		'jsdoc/require-param-type': ACTIVATE,
		'jsdoc/require-returns': ACTIVATE,
		'jsdoc/require-returns-type': ACTIVATE,
		'jsdoc/valid-types': ACTIVATE,


		'unicorn/explicit-length-check': [
			ACTIVATE,
			{
				'non-zero': 'greater-than',
			},
		],
		'unicorn/custom-error-definition': ACTIVATE,
		'unicorn/no-unsafe-regex': ACTIVATE,
		'unicorn/filename-case': DEACTIVATE,
	},

	settings: {
		jsdoc: {
			allowInlineConfig: false,
			noDefaultExampleRules: true,
		},
	},
}
