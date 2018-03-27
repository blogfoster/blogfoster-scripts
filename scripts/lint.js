const { existsSync, readFileSync } = require('fs');
const { CLIEngine } = require('eslint');
const mri = require('mri');
const paths = require('../config/paths');
const baseConfig = require(paths.selfESLintConfig);

function getGlobPatternsToIgnore(ignorePath) {
  const contents = readFileSync(ignorePath, { encoding: 'utf8' });

  return contents.split('\n').filter(Boolean);
}

const args = mri(process.argv.slice(2), {
  boolean: 'check',
});
const subcommandOrTarget = args._[args._.length - 1];
const hasTarget = subcommandOrTarget !== 'lint';
const target = hasTarget ? subcommandOrTarget : paths.projectRoot;
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
  fix: !args.check,
});

const report = engine.executeOnFiles([target]);
let errorCount = report.errorCount;

if (!args.check) {
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
