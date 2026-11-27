import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist/**','node_modules','build/**', 'playwright-reports', 'test-results', 'auth', 'tests/performance/jmeter/reports/**','coverage/**',] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ...playwright.configs['flat/recommended'], files: ['tests/**/*.ts'] },
  prettier,
);
