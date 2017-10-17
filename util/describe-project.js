const { resolve } = require('path')

const projectRoot = process.cwd()
const selfRoot = resolve(__dirname, '../')

const resolveProjectDirectory = relativePath =>
  resolve(projectRoot, relativePath)
const resolveSelfDirectory = relativePath => resolve(selfRoot, relativePath)

module.exports = {
  projectRoot,
  projectBuild: resolveProjectDirectory('./dist'),
  projectIndexJs: resolveProjectDirectory('./src/index.js'),
  projectPackageJson: resolveProjectDirectory('./package.json'),
  projectSrc: resolveProjectDirectory('./src'),
  dotenv: resolveProjectDirectory('./.env'),
  selfRoot,
  selfESLintConfig: resolveSelfDirectory('./config/.eslintrc.js'),
  selfPrettierBin: resolveSelfDirectory('./node_modules/.bin/prettier'),
  selfPrettierConfig: resolveSelfDirectory('./config/.prettierrc.json'),
  selfPrettierIgnore: resolveSelfDirectory('./config/.prettierignore')
}
