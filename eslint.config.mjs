import globals from 'globals';
import tseslint from 'typescript-eslint';

import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import stylisticTsPlugin from '@stylistic/eslint-plugin-ts';

/** @type {import('eslint').Linter.FlatConfig} */
const flatConfig = [
  {
    ignores: [
      '.next',
      'node_modules',
      '*.d.ts',
      'styled-system',
      'public/libs',
    ],
  },
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      import: importPlugin,
      '@stylistic/ts': stylisticTsPlugin,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      '@/curly': 'error',
      '@stylistic/ts/semi': 'error',
      eqeqeq: 'error',
      complexity: [
        'error',
        {
          max: 15,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'no-unneeded-ternary': 'error',
      'prefer-arrow-callback': 'error',
      'no-else-return': 'error',
      'no-useless-return': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
      'array-callback-return': [
        'error',
        {
          allowImplicit: true,
        },
      ],
      'import/order': [
        'error',
        {
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: ['builtin', 'external', 'parent', 'sibling'],
          'newlines-between': 'always',
          pathGroups: [],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
    },
  },
];

export default flatConfig;
