const { execSync } = require('child_process');

test('build runs without an error', () =>
  expect(() =>
    execSync('node ../bin build', {
      cwd: 'tests',
    })
  ).not.toThrow());
