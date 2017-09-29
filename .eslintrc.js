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
        'indent': ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            FunctionDeclaration: {
                parameters: 1,
                body: 1
            },
            FunctionExpression: {
                parameters: 1,
                body: 1
            }
        }],
        'guard-for-in': 0,
        'no-console': ['error', {allow: ['error']}],
        // TODO: for in loops, for of loops
        'no-restricted-syntax': ['error', {
            selector: 'LabeledStatement',
            message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        }, {
            selector: 'WithStatement',
            message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        }],
        'max-len': ['error', 120],
        'react/forbid-prop-types': 0,
        "comma-dangle": ["error", "never"],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-first-prop-new-line': ['error', 'never'],
        'prefer-template': 'off',
        'react/jsx-closing-bracket-location': ['error', 'after-props']
    },
    env: {
        "browser": true
    },
    plugins: ["react", "import"],
    extends: ["airbnb"],
    globals: {
        "L": false
    }
};
