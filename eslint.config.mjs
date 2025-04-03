import pluginJs from '@eslint/js';
import pluginJest from 'eslint-plugin-jest';
import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  // ...playwright.configs['flat/recommended'],
  {
    ignores: [
      'node_modules',
      'coverage',
      'reports',
      'playwright-report',
      'test-results',
    ],
  },
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest, playwright: playwright },
    languageOptions: { globals: pluginJest.environments.globals.globals },
    rules: {
      'jest/valid-expect': 'warn',
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off',
    },
  },
];
