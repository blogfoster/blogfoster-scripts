const { CLIEngine } = require("eslint");
const paths = require("../config/paths");
const baseConfig = require(paths.selfESLintConfig);

// not yet implemented
const ignorePattern = undefined;
const optionalArg = process.argv[3];
const shouldFix = optionalArg === "--fix";

const engine = new CLIEngine({
  baseConfig,
  ignorePattern,
  useEslintrc: false,
  ignore: false,
  fix: shouldFix
});

const report = engine.executeOnFiles([paths.projectSrc]);

if (shouldFix) {
  // write any fixes to disk
  CLIEngine.outputFixes(report);
}

// print the linting results
const formatter = engine.getFormatter("stylish");
console.log(formatter(report.results));

if (report.errorCount > 0) {
  process.exit(1);
}
