const { existsSync } = require('fs');
const { spawnSync } = require('child_process');
const mri = require('mri');
const paths = require('../config/paths');

const args = mri(process.argv.slice(2), {
  boolean: 'check',
});
const subcommandOrTarget = args._[args._.length - 1];
const hasTarget = subcommandOrTarget !== 'format';
const target = hasTarget ? subcommandOrTarget : `**/*.{js,json,md}`;
const hasIgnoreOverride = existsSync(paths.projectPrettierIgnore);
const ignorePath = hasIgnoreOverride
  ? paths.projectPrettierIgnore
  : paths.selfPrettierIgnore;

const prettierArgs = [
  args.check ? '--list-different' : '--write',
  '--config',
  paths.selfPrettierConfig,
  '--ignore-path',
  ignorePath,
  target,
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
