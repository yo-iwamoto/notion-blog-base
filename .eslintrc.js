module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    // off
    'react/react-in-jsx-scope': 'off',
    'func-names': 'off',
    'react/jsx-props-no-spreading': 'off',

    // warn
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn',
    'import/no-unresolved': 'off',

    // error
    'react-hooks/rules-of-hooks': 'error',

    // custom
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
};
