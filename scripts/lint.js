const { CLIEngine } = require('eslint');
const paths = require('../config/paths');
const baseConfig = require(paths.selfESLintConfig);

const ignorePattern = ['node_modules', 'build'];
const optionalArg = process.argv[3];
const shouldFix = optionalArg !== '--check';

const engine = new CLIEngine({
  cwd: paths.projectRoot,
  baseConfig,
  ignorePattern,
  useEslintrc: false,
  fix: shouldFix
});

const report = engine.executeOnFiles([paths.projectRoot]);
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
