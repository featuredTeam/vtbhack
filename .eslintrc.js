module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'jest-formatting',
        'eslint-plugin-import',
        'react-hooks'
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/newline-after-import': ['error', { count: 1 }],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        curly: 'error',
        'no-console': 'warn',
        'jest-formatting/padding-around-all': 2,
        'space-before-blocks': 'error',
        'block-spacing': 'error',
        'no-constant-condition': 'off',
        'no-case-declarations': 'off',
        'react-hooks/rules-of-hooks': 'error',
        '@typescript-eslint/ban-ts-comment': 'warn',
    },
};
