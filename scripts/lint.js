const CLIEngine = require('eslint').CLIEngine
const paths = require('../config/paths')

const defaultConfig = {
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

const appPackageJson = require(paths.appPackageJson)
const customConfig = appPackageJson.hasOwnProperty('eslintConfig')
const baseConfig = customConfig ? appPackageJson.eslintConfig : defaultConfig

const engine = new CLIEngine({ baseConfig })
const formatter = engine.getFormatter('stylish')
const report = engine.executeOnFiles([paths.appSrc])

console.log(formatter(report.results))

if (report.errorCount > 0) {
  process.exit(1)
}
