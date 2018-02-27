const { existsSync } = require('fs');
const { spawnSync } = require('child_process');
const paths = require('../config/paths');

const supportedOptions = ['--check'];
const userOption = process.argv.length > 2 ? process.argv[3] : undefined;
const option = supportedOptions.includes(userOption) ? userOption : undefined;
const hasIgnoreOverride = existsSync(paths.projectPrettierIgnore);
const ignorePath = hasIgnoreOverride
  ? paths.projectPrettierIgnore
  : paths.selfPrettierIgnore;

const prettierArgs = [
  option === '--check' ? '--list-different' : '--write',
  '--config',
  paths.selfPrettierConfig,
  '--ignore-path',
  ignorePath,
  `**/*.{js,json}`,
];

const result = spawnSync(paths.projectPrettier, prettierArgs, {
  env: process.env,
  cwd: paths.projectRoot,
  stdio: 'inherit',
});

if (result.error) {
  console.error('Command failed with the following error:\n');
  console.error(result.error);

  process.exit(1);
}
