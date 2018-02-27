const path = require('path');

const projectRoot = process.cwd();
const selfRoot = path.resolve(__dirname, '..');

const resolveProjectDirectory = relativePath =>
  path.resolve(projectRoot, relativePath);
const resolveSelfDirectory = relativePath =>
  path.resolve(selfRoot, relativePath);

module.exports = {
  projectAssets: resolveProjectDirectory('assets'),
  projectBuild: resolveProjectDirectory('build'),
  projectBuildAssets: resolveProjectDirectory('build/assets'),
  projectBuildIndexJs: resolveProjectDirectory('build/index.js'),
  projectESLintIgnore: resolveProjectDirectory('.eslintignore'),
  projectIndexJs: resolveProjectDirectory('src/index.js'),
  projectPrettier: resolveProjectDirectory('node_modules/.bin/prettier'),
  projectPrettierIgnore: resolveProjectDirectory('.prettierignore'),
  projectRoot,
  projectSrc: resolveProjectDirectory('src'),
  selfESLintConfig: resolveSelfDirectory('config/.eslintrc.js'),
  selfESLintIgnore: resolveSelfDirectory('config/.eslintignore'),
  selfNodeModules: resolveSelfDirectory('node_modules'),
  selfPrettierConfig: resolveSelfDirectory('config/.prettierrc.json'),
  selfPrettierIgnore: resolveSelfDirectory('config/.prettierignore'),
  selfWebpackConfigDev: resolveSelfDirectory('config/webpack.config.dev.js'),
  selfWebpackConfigProd: resolveSelfDirectory('config/webpack.config.prod.js'),
};
