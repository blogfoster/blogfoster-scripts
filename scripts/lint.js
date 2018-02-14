const { existsSync } = require('fs');
const { CLIEngine } = require('eslint');
const paths = require('../config/paths');
const baseConfig = require(paths.selfESLintConfig);

if (!existsSync(paths.projectSrc)) {
  console.error('`src` folder does not exist.');

  process.exit(1);
}

// Not yet implemented
const ignorePattern = undefined;
const optionalArg = process.argv[3];
const shouldFix = optionalArg !== '--check';

const engine = new CLIEngine({
  baseConfig,
  ignorePattern,
  useEslintrc: false,
  ignore: false,
  fix: shouldFix
});

const report = engine.executeOnFiles([paths.projectSrc]);
let errorCount = report.errorCount;

if (shouldFix) {
  // Write any fixes to disk
  CLIEngine.outputFixes(report);
  errorCount -= report.fixableErrorCount;
}

// Print the linting results
const formatter = CLIEngine.getFormatter();
const output = formatter(report.results);
console.log(output);

if (errorCount > 0) {
  process.exit(1);
}
