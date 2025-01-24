import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginJest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  pluginJest,
  {
    ignores: ['node_modules'],
  },
];
