const { spawnSync } = require('child_process');
const { existsSync } = require('fs');
const paths = require('../config/paths');

if (!existsSync(paths.projectSrc)) {
  console.error('`src` folder does not exist.');

  process.exit(1);
}

const supportedOptions = ['--check'];
const userOption = process.argv.length > 2 ? process.argv[3] : undefined;
const option = supportedOptions.includes(userOption) ? userOption : undefined;

const prettierArgs = [
  option === '--check' ? '--list-different' : '--write',
  '--config',
  paths.selfPrettierConfig,
  '--ignore-path',
  paths.selfPrettierIgnore,
  `./**/*.{js,json}`
];

const result = spawnSync(paths.projectPrettier, prettierArgs, {
  env: process.env,
  cwd: paths.projectSrc,
  stdio: 'inherit'
});

if (result.error) {
  console.error('Command failed with the following error:\n');
  console.error(result.error);

  process.exit(1);
}
