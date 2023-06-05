module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'rules': {
        'prefer-const': 'off',
        'no-prototype-builtins': 'off',
        'semi': ['warn', 'always'],
        'quotes': ['error', 'single'],
        'indent': ['error', 4],
        'object-curly-spacing': [2, 'always'],
        'comma-spacing': ['error', { 'before': false, 'after': true }]
    }
}
