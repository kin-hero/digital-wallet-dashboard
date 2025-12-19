import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Enforce ES Modules
      '@typescript-eslint/no-require-imports': 'error',

      // Enforce destructuring imports where possible
      'prefer-destructuring': ['error', {
        'array': false,
        'object': true
      }],

      // Avoid any types
      '@typescript-eslint/no-explicit-any': 'error',

      // Require await in async functions
      '@typescript-eslint/require-await': 'error',

      // Prefer type imports
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports'
      }],

      // No unused vars (except underscore prefix)
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
    }
  },
  {
    // Disable strict unsafe rules for schema files (Zod type inference)
    files: ['**/*.schema.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off'
    }
  },
  {
    ignores: ['dist/', 'node_modules/', '*.config.js']
  }
);
