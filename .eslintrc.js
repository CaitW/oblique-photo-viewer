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
        'indent': ['error', 4, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
        'no-console': ['error', {allow: ['error']}],
        'object-curly-spacing': ["error", "always"],
        'no-trailing-spaces': 2,
        // TODO:
        'react/prop-types': 0,
        'import/newline-after-import': 2,
        'eqeqeq': 2,
        'no-eq-null': 2,
        'no-multi-spaces': 2
    },
    env: {
        "browser": true
    },
    plugins: ["react","import"],
    extends: ["airbnb","plugin:import/recommended"],
    globals: {
        "L": false
    }
};
