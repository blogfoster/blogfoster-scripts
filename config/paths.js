const path = require('path');

const appDirectory = process.cwd();
const resolveAppDirectory = relativePath =>
  path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveAppDirectory('dist'),
  appIndexJs: resolveAppDirectory('src/index.js'),
  appPackageJson: resolveAppDirectory('package.json'),
  appSrc: resolveAppDirectory('src'),
  dotenv: resolveAppDirectory('.env'),
};
