const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:react-hooks/recommended',
    'plugin:redux-saga/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@next/next/recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'redux-saga',
    'prettier',
  ],
  rules: {
    camelcase: 0,
    'react/jsx-no-bind': 0,
    'react/require-default-props': 'off',
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/media-has-caption': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'no-param-reassign': 0,
    'no-const-assign': 1,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'no-extra-semi': 0,
    semi: 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-fallthrough': 0,
    'no-empty': 0,
    'no-mixed-spaces-and-tabs': 1,
    'no-redeclare': 0,
    'no-this-before-super': 1,
    'no-undef': 1,
    'no-unreachable': 1,
    'no-use-before-define': 0,
    'constructor-super': 1,
    curly: 0,
    eqeqeq: 1,
    'func-names': 1,
    'valid-typeof': 1,

    'no-console': 0,
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      1,
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],

    'prettier/prettier': ['error', prettierOptions],

    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/static-property-placement': ['error', 'static public field'],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
