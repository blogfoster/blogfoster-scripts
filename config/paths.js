const path = require('path');

const projectRoot = process.cwd();
const selfRoot = path.resolve(__dirname, '..');

const resolveProjectDirectory = relativePath =>
  path.resolve(projectRoot, relativePath);
const resolveSelfDirectory = relativePath =>
  path.resolve(selfRoot, relativePath);

module.exports = {
  projectBuild: resolveProjectDirectory('dist'),
  projectBuildIndexJs: resolveProjectDirectory('dist/index.js'),
  projectIndexJs: resolveProjectDirectory('src/index.js'),
  projectSrc: resolveProjectDirectory('src'),
  selfESLintConfig: resolveSelfDirectory('config/.eslintrc.js'),
  selfNodeModules: resolveSelfDirectory('node_modules'),
  selfPrettier: resolveSelfDirectory('node_modules/.bin/prettier'),
  selfPrettierConfig: resolveSelfDirectory('config/.prettierrc.json'),
  selfPrettierIgnore: resolveSelfDirectory('config/.prettierignore'),
  selfWebpackConfigDev: resolveSelfDirectory('config/webpack.config.dev.js'),
  selfWebpackConfigProd: resolveSelfDirectory('config/webpack.config.prod.js')
};
