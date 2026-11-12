export default {
  overrides: [
    {
      files: ['**/*.css'],
      customSyntax: 'postcss-scss',
      rules: {
        'at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['tailwind', 'apply', 'layer', 'responsive', 'screen'],
          },
        ],
      },
    },
  ],
};
