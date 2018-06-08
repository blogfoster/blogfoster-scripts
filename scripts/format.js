const { existsSync } = require('fs');
const { spawnSync } = require('child_process');
const mri = require('mri');
const paths = require('../config/paths');

const args = mri(process.argv.slice(2), {
  boolean: 'check',
});
const subcommandOrFirstTarget = args._[1];
const hasTarget = subcommandOrFirstTarget !== 'format';
const targetArgs = args._.slice(1);
const targets =
  hasTarget && targetArgs.length > 0 ? targetArgs : `**/*.{js,json,md}`;
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
].concat(targets);

const result = spawnSync(paths.projectPrettier, prettierArgs, {
  env: process.env,
  cwd: paths.projectRoot,
});

if (result.status !== 0) {
  console.error('Command failed with the following error:');
  result.output.forEach(
    chunck => chunck && console.error(chunck.toString('utf8'))
  );
}

process.exit(result.status);
