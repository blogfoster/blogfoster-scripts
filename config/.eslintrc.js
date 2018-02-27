module.exports = {
  extends: ['blogfoster', 'prettier'],
  // Turn off rules that are too strict
  // TODO: Remove these rules when we updated eslint-config-blogfoster
  rules: {
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'import/max-dependencies': 'off',
    'import/newline-after-import': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'prefer-template': 'off',
  },
};
