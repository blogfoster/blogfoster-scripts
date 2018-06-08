const { execSync } = require('child_process');

test('format --check fails on src/format-fails.js', () =>
  expect(() =>
    execSync('node bin format --check tests/src/format-fail.js')
  ).toThrow());

test('format --check runs without an error on src/format-correct.js', () =>
  expect(() =>
    execSync('node bin format --check tests/src/format-correct.js')
  ).not.toThrow());
