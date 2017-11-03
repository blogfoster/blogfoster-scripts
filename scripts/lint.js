const { CLIEngine } = require("eslint");
const paths = require("../config/paths");

const baseConfig = Object.assign({}, require(paths.selfESLintConfig), {
  useEslintrc: false,
  ignore: false
});
// not yet implemented
const ignorePattern = undefined;

const engine = new CLIEngine({ baseConfig, ignorePattern });
const report = engine.executeOnFiles([paths.projectSrc]);

const formatter = engine.getFormatter("stylish");
console.log(formatter(report.results));

if (report.errorCount > 0) {
  process.exit(1);
}
