import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  // App source.
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    plugins: { 'simple-import-sort': importSort },
    languageOptions: { globals: globals.browser },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      // House rule: this repo is a teaching artifact — no `any` in its own source.
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  // Node-side build tooling.
  {
    files: ['plugins/**/*.mjs', 'scripts/**/*.mjs', 'vite.config.ts', '*.config.{js,ts}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
])
