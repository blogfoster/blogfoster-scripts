const { execSync } = require('child_process');

test('linting runs without an error on src/index.js', () =>
  expect(() =>
    execSync('node bin lint --check tests/src/index.js')
  ).not.toThrow());

test('linting fails on src/eslint-fail.js', () =>
  expect(() =>
    execSync('node bin lint --check tests/src/eslint-fail.js')
  ).toThrow());
