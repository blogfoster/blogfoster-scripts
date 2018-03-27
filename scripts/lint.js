const { existsSync, readFileSync } = require('fs');
const { CLIEngine } = require('eslint');
const paths = require('../config/paths');
const baseConfig = require(paths.selfESLintConfig);

function getGlobPatternsToIgnore(ignorePath) {
  const contents = readFileSync(ignorePath, { encoding: 'utf8' });

  return contents.split('\n').filter(Boolean);
}

const optionalArg = process.argv[3];
const shouldFix = optionalArg !== '--check';
const hasIgnoreOverride = existsSync(paths.projectESLintIgnore);
const ignorePath = hasIgnoreOverride
  ? paths.projectESLintIgnore
  : paths.selfESLintIgnore;
const ignorePattern = getGlobPatternsToIgnore(ignorePath);

const engine = new CLIEngine({
  cwd: paths.projectRoot,
  baseConfig,
  ignorePattern,
  useEslintrc: false,
  fix: shouldFix,
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
