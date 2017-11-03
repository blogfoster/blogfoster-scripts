const { CLIEngine } = require("eslint");
const paths = require("../config/paths");
const baseConfig = require(paths.selfESLintConfig);

// not yet implemented
const ignorePattern = undefined;

const engine = new CLIEngine({
  baseConfig,
  ignorePattern,
  useEslintrc: false,
  ignore: false
});
const report = engine.executeOnFiles([paths.projectSrc]);

const formatter = engine.getFormatter("stylish");
console.log(formatter(report.results));

if (report.errorCount > 0) {
  process.exit(1);
}
