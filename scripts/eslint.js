const CLIEngine = require('eslint').CLIEngine

const paths = require('../config/paths')

const defaultConfig = Object.assign({}, require('../config/.eslintrc'), {
  useEslintrc: false,
  ignore: false
})

const appPackageJson = require(paths.appPackageJson)
const customConfig = appPackageJson.hasOwnProperty('eslintConfig')
const customIgnore = appPackageJson.hasOwnProperty('eslintIgnore')
const baseConfig = customConfig ? appPackageJson.eslintConfig : defaultConfig
const ignorePattern = customIgnore ? appPackageJson.eslintIgnore : undefined

const engine = new CLIEngine({ baseConfig, ignorePattern })
const formatter = engine.getFormatter('stylish')
const report = engine.executeOnFiles([paths.appSrc])

console.log(formatter(report.results))

if (report.errorCount > 0) {
  process.exit(1)
}
