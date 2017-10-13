const path = require('path')

const appRoot = process.cwd()
const resolveAppDirectory = relativePath => path.resolve(appRoot, relativePath)

module.exports = {
  appRoot,
  appBuild: resolveAppDirectory('dist'),
  appIndexJs: resolveAppDirectory('src/index.js'),
  appPackageJson: resolveAppDirectory('package.json'),
  appSrc: resolveAppDirectory('src'),
  dotenv: resolveAppDirectory('.env')
}
