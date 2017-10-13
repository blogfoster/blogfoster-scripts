const CLIEngine = require('eslint').CLIEngine
const paths = require('../config/paths')

const defaultESLintConfig = {
  useEslintrc: false,
  parserOptions: {
    ecmaVersion: 6
  },
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-console': 'off'
  }
}

const cli = new CLIEngine({ baseConfig: defaultESLintConfig })
const report = cli.executeOnFiles([paths.appSrc])

// TODO: print linting report

if (report.errorCount > 0) {
  process.exit(1)
}
