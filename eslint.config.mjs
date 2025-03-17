import { includeIgnoreFile } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import noSecrets from 'eslint-plugin-no-secrets';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const compat = new FlatCompat({
    allConfig: js.configs.all,
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
    ...compat.extends(
        'next/core-web-vitals',
        'next/typescript',
        'plugin:diff/diff',
        'plugin:@next/next/recommended',
    ),
];

const ignoreConfig = defineConfig(
    includeIgnoreFile(gitignorePath),
    globalIgnores([
        'node_modules/**/*',
        '.next/**/*',
        '.github/**/*',
        'public/**/*',
        'src/globals.css',
        'src/**/*.css',
        '.env',
        '.env.sample',
        '.gitignore',
        '.prettierignore',
    ]),
);

export default tseslint.config(
    ...eslintConfig,
    ...ignoreConfig,
    perfectionist.configs['recommended-natural'],
    {
        files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: {
            '@next/next': pluginNext,
            'no-secrets': noSecrets,
        },

        rules: {
            'import/no-anonymous-default-export': 'off',
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs['core-web-vitals'].rules,
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/require-await': 'off',
            'no-secrets/no-secrets': 'error',
            'perfectionist/sort-object-types': 'off',
            'perfectionist/sort-objects': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
);
