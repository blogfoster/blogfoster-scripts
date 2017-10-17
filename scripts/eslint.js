const CLIEngine = require('eslint').CLIEngine
const { projectSrc, selfESLintConfig } = require('../util/describe-project')

const baseConfig = Object.assign({}, require(selfESLintConfig), {
  useEslintrc: false,
  ignore: false
})
// not yet implemented
const ignorePattern = undefined

const engine = new CLIEngine({ baseConfig, ignorePattern })
const formatter = engine.getFormatter('stylish')
const report = engine.executeOnFiles([projectSrc])

console.log(formatter(report.results))

if (report.errorCount > 0) {
  process.exit(1)
}
