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

const engine = new CLIEngine({ baseConfig: defaultESLintConfig })
const formatter = engine.getFormatter('stylish')
const report = engine.executeOnFiles([paths.appSrc])

console.log(formatter(report.results))

if (report.errorCount > 0) {
  process.exit(1)
}
