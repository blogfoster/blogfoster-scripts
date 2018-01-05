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
  projectIndexJs: resolveProjectDirectory('src/index.js'),
  projectSrc: resolveProjectDirectory('src'),
  projectPrettier: resolveProjectDirectory('node_modules/.bin/prettier'),
  selfESLintConfig: resolveSelfDirectory('config/.eslintrc.js'),
  selfNodeModules: resolveSelfDirectory('node_modules'),
  selfPrettierConfig: resolveSelfDirectory('config/.prettierrc.json'),
  selfPrettierIgnore: resolveSelfDirectory('config/.prettierignore'),
  selfWebpackConfigDev: resolveSelfDirectory('config/webpack.config.dev.js'),
  selfWebpackConfigProd: resolveSelfDirectory('config/webpack.config.prod.js')
};
