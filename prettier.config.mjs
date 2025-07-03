const config = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    endOfLine: 'auto',
    singleAttributePerLine: false,
    plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-packagejson'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: 'typescript',
        },
    ],
};

export default config;
