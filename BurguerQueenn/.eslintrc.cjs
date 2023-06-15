/* eslint-disable no-undef */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    
    "import/extensions": 0,
    "no-var": "error",
    "prefer-const": "error",
    "eqeqeq": "error",
    "indent": ["error", 2],
    'react-refresh/only-export-components': 'warn',
    
    
  },
  
  
}
