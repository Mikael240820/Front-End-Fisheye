export default [
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'no-undef': 'off',
      'no-console': 'off',
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'always'],
      'no-trailing-spaces': 'warn'
    }
  }
];
