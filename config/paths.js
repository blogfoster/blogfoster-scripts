const { resolve } = require('path')

const scriptsRoot = resolve(__dirname, '../')
const appRoot = process.cwd()

const resolveAppDirectory = relativePath => resolve(appRoot, relativePath)
const resolveScriptsDirectory = relativePath => resolve(scriptsRoot, relativePath)

module.exports = {
  appRoot,
  appBuild: resolveAppDirectory('dist'),
  appIndexJs: resolveAppDirectory('src/index.js'),
  appPackageJson: resolveAppDirectory('package.json'),
  appSrc: resolveAppDirectory('src'),
  dotenv: resolveAppDirectory('.env'),
  scriptsRoot,
  scriptsConfig: resolveScriptsDirectory('config'),
  scriptsAppConfig: resolveScriptsDirectory('.appConfig')
}
