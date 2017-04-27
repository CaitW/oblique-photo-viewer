module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        'emcaVersion': 6,
        'sourceType': 'module',
        'emcaFeatures': {
            'modules': true,
            'jsx': true
        }
    },
    rules: {
        'prefer-spread': 'error',
        'array-callback-return': 'error',
        'camelcase': 'off',
        'curly': ['error', 'all'],
        'default-case': ['error'],
        'dot-notation': ['error'],
        'eqeqeq': ['error', 'smart'],
        // ban the use of eval()
        'no-eval': 'error',
        'no-implicit-globals': 'off',
        'no-multi-str': 'error',
        'no-return-assign': 'error',
        'no-script-url': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'block-spacing': ['error', 'always'],
        'comma-spacing': ['error', { before: false, after: true }],
        'eol-last': 'error',
        'func-call-spacing': ['error', 'never'],
        // 4-spaces for indentation
        'indent': ['error', 4, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],
        'line-comment-position': ['error', { position: 'above' }],
        'no-array-constructor': 'error',
        'no-inline-comments': 'off',
        'no-mixed-spaces-and-tabs': 'error',
        'no-tabs': 'error',
        'no-underscore-dangle': ['error', { allowAfterThis: false }],
        'no-whitespace-before-property': 'error',
        'space-before-function-paren': ['error', { anonymous: 'never', named: 'never' }],
        'space-infix-ops': 'error',
        'spaced-comment': ['error', 'always'],
    },
    env: {
    	"browser": true
    }
};
