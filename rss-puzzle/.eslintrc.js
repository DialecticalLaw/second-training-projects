'use strict';

module.exports = {
  ignorePatterns: ['node_modules/', 'dist/', 'webpack.*'],
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base/legacy', 'plugin:@typescript-eslint/recommended', 'prettier'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    'max-lines-per-function': ['error', 40],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error'
  }
};
