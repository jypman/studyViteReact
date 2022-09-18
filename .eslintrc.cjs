module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  ignorePatterns: ['src','.eslintrc.*', 'vite.config.*'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-shadow': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'no-undef': 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-unused-vars': 'off',
    'react/jsx-fragments': 'off',
    'operator-linebreak': 'off',
    'react/no-array-index-key': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'no-confusing-arrow': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'spaced-comment': 'off',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useRecoilCallback',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  }
}
