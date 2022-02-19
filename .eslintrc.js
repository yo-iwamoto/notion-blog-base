module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jest'],
  globals: {
    JSX: true,
  },
  rules: {
    // off
    'react/react-in-jsx-scope': 'off', // "preserve" is set for "jsx"
    'func-names': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    camelcase: 'off', // datasource's concern
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'arrow-body-style': 'off', // prettier's concern

    // warn
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn',
    'padded-blocks': 'warn',
    'no-trailing-spaces': 'warn',

    // error
    'react-hooks/rules-of-hooks': 'error',

    // custom
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'max-len': ['warn', { code: 120 }],
  },
};
