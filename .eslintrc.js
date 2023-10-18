module.exports = {
	'root': true,
	'parser': '@typescript-eslint/parser',
	'env': {
		'browser': true,
		'es6': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
		'prettier',
		'plugin:playwright/playwright-test',
		'plugin:chai-friendly/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'playwright',
		'chai-friendly'
	],
	'rules': {
		'playwright/max-nested-describe': ['error', {max: 5}],
		'playwright/missing-playwright-await': 'error',
		'playwright/no-conditional-in-test': 'error',
		'playwright/no-element-handle': 'error',
		'playwright/no-eval': 'error',
		'playwright/no-focused-test': 'error',
		'playwright/no-force-option': 'error',
		'playwright/no-restricted-matchers': 'error',
		'playwright/no-skipped-test': 'error',
		'playwright/no-useless-not': 'error',
		'playwright/no-wait-for-timeout': 'error',
		'playwright/prefer-strict-equal': 'error',
		'playwright/prefer-to-be': 'error',
		'playwright/prefer-to-have-length': 'error',
		'playwright/require-top-level-describe': 'error',
		'playwright/valid-expect': 'error',
		'no-unused-expressions': 0,
		'chai-friendly/no-unused-expressions': 2,
		'no-console': 'warn',
		'no-alert': 'error',
		'no-empty-function': 'error',
		'no-eval': 'error',
		'block-scoped-var': 'warn',
		'complexity': ['error', 10],
		'no-implicit-globals': 'error',
		'no-implied-eval': 'error',
		'no-proto': 'error',
		'require-await': 'error',
		'camelcase': ['warn', {'properties': 'always'}],
		'max-depth': ['warn', 4],
		'max-len': ['warn', {'code': 180, 'tabWidth': 4}],
		'max-lines': ['error', 500],
		'max-lines-per-function': ['error', 300],
		'max-nested-callbacks': ['error', 5],
		'max-params': ['warn', 4],
		'max-statements-per-line': ['warn', {'max': 1}],
		'arrow-spacing': 'warn',
		'indent': [
			'warn',
			'tab',
			{'SwitchCase': 1}
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'no-var': 'warn',
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'warn',
			'always'
		],
		'curly': ['warn', 'multi-line', 'consistent'],
		'brace-style': ['warn', 'allman'],
		'prefer-const': ['warn', {
			'destructuring': 'any',
			'ignoreReadBeforeAssign': false
		}]
	},
	'overrides': [
		{
			files: ['*.spec.s', '*.test.ts'],
			rules: {
				'indent': 'off',
			}
		}
	]
};
