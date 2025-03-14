module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unicorn'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
  ],
  rules: {
    'no-inline-config': 'error',
    'report-unused-disable-directives': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'never' },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'explicit', overrides: { constructors: 'off' } },
    ],
    '@typescript-eslint/member-ordering': 'error',
    'class-methods-use-this': 'error',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/number-literal-case': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          acc: true,
          env: true,
          i: true,
          j: true,
          props: true,
          Props: true,
        },
      },
    ],
  },
};
