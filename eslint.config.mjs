// @ts-check

import pluginJs from '@eslint/js';
import jest from 'eslint-plugin-jest';
import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  // DOC: https://typescript-eslint.io/getting-started#additional-configs
  // ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ignores: ['reports', 'node-modules', 'backup', 'src/db'],
  },
  // DOC: https://www.npmjs.com/package/eslint-plugin-jest
  {
    files: ['testAPI/**/*.spec.[tj]s', 'testAPI/**/*.test.[tj]s'],
    ...jest.configs['flat/recommended'],
    plugins: { jest: jest },
    rules: {
      'jest/valid-expect': 'warn',
      'no-commented-out-tests': 'off',
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['testPW/**/*.spec.[tj]s', 'testPW/**/*.test.[tj]s'],
    plugins: { playwright: playwright },
    languageOptions: { globals: jest.environments.globals.globals },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off',
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // 'warn'
    },
  },
);
