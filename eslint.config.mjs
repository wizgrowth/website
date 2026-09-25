// eslint-config-next 16 ships flat configs; the previous FlatCompat bridge
// crashed ("Converting circular structure to JSON") on every file.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'design/**', 'src/migrations/**'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // The site runs two design systems whose stylesheets must never share a
      // document, so links between the halves are plain anchors on purpose
      // (see src/app/(frontend)/layout.tsx). The rule cannot tell those apart.
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
];

export default eslintConfig;
