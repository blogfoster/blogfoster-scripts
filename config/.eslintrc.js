module.exports = {
  extends: ['blogfoster', 'prettier'],
  // Turn off rules that are too strict
  // TODO: Remove these rules when we updated eslint-config-blogfoster
  rules: {
    'global-require': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'import/no-dynamic-require': 'off',
    'import/newline-after-import': 'off',
    'import/prefer-default-export': 'off',
    'import/max-dependencies': 'off'
  }
};
