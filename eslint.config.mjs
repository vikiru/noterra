import { FlatCompat } from '@eslint/eslintrc';
import perfectionist from 'eslint-plugin-perfectionist';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

// import eslintPaths from 'eslint-plugin-paths';
import deprecated from 'eslint-plugin-deprecate';
import security from 'eslint-plugin-security';
import noSecrets from 'eslint-plugin-no-secrets';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const nextConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default tseslint.config([
    ...nextConfig,
    ...compat.extends('plugin:drizzle/recommended'),
    tseslint.configs.recommendedTypeChecked,
    perfectionist.configs['recommended-natural'],
    security.configs.recommended,
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: './tsconfig.json',
            },
        },
        plugins: {
            unicorn: eslintPluginUnicorn,
            deprecate: deprecated,
            // 'eslint-plugin-paths': eslintPaths,
            'no-secrets': noSecrets,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/no-misused-promises': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
            '@typescript-eslint/restrict-template-expressions': 'off',
            'drizzle/enforce-delete-with-where': 'warn',
            'perfectionist/sort-objects': 'off',
            'perfectionist/sort-object-types': 'off',
        },
    },
]);

// export default eslintConfig;
