const { spawnSync } = require('child_process');
const paths = require('../config/paths');

const supportedOptions = ['--write', '--debug-check', '--list-different'];
const userOption = process.argv.length > 2 ? process.argv[3] : undefined;
const option = supportedOptions.includes(userOption) ? userOption : undefined;

const prettierArgs = [
  option || '--write',
  '--config',
  paths.selfPrettierConfig,
  '--ignore-path',
  paths.selfPrettierIgnore,
  `./**/*.{js,json}`
];

const result = spawnSync(paths.selfPrettier, prettierArgs, {
  env: process.env,
  cwd: paths.projectSrc,
  stdio: 'inherit'
});

if (result.error) {
  console.error('Command failed with the following error:\n');
  console.error(result.error);

  process.exit(1);
}
