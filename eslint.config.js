import { FlatCompat } from '@eslint/eslintrc';
import perfectionist from 'eslint-plugin-perfectionist';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, globalIgnores } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default defineConfig([
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    perfectionist.configs['recommended-natural'],
    {
        languageOptions: {
            sourceType: 'module',
        },
    },
    {
        rules: {
            'perfectionist/sort-objects': 'off',
            'perfectionist/sort-object-types': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
    },
    globalIgnores([
        'node_modules/**/*',
        '.github/**/*',
        '.next/**/*',
        'public/**/*',
        'build/**/*',
        '*.json',
        '*.md',
        '*.mjs',
        '*.js',
        '*.css',
        '*.xml',
        '*.html',
        '*.ico',
        '.gitignore',
    ]),
]);
