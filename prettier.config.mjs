export default {
    arrowParens: 'always',
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: 'auto',
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: 'typescript',
        },
    ],
    plugins: ['prettier-plugin-jsdoc', 'prettier-plugin-tailwindcss'],
    printWidth: 80,
    semi: true,
    singleAttributePerLine: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    useTabs: false,
};
