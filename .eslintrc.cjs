module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        "import/extensions": ['error', 'ignorePackages'],
        "no-underscore-dangle": ['error', { allow: ['_id'] }], 
    },
};
