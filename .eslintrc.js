module.exports = {
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  extends: ['eslint:recommended'],
  globals: {
    __dirname: true
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'error',
    'prefer-const': 'error'
  }
}
