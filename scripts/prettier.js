const { resolve } = require('path')
const { existsSync } = require('fs')
const { spawnSync } = require('child_process')

const paths = require('../config/paths')
const ensureWriteFile = require('../util/ensureWriteFile')

const prettierPath = resolve(paths.scriptsRoot, 'node_modules/.bin/prettier')
const prettierExists = existsSync(prettierPath)

if (!prettierExists) {
  console.log('Prettier is not installed. Did you forget to run `npm install`?')

  process.exit(1)
}

const appPackageJson = require(paths.appPackageJson)
const arg = process.argv.length > 2 ? process.argv[3] : undefined
const supportedArgs = ['--debug-check', '--list-different']
const supportedArg = supportedArgs.includes(arg) ? arg : undefined

let configPathOverride
const configOverride = appPackageJson.hasOwnProperty('prettier')
if (configOverride) {
  const appConfigPath = resolve(paths.scriptsAppConfig, '.prettierrc.json')

  try {
    ensureWriteFile(appConfigPath, JSON.stringify(appPackageJson.prettier))
    configPathOverride = appConfigPath
  } catch (err) {
    console.log('Could not create ".prettierrc.json"')
    console.log()
    console.log(err);

    process.exit(1)
  }
}

let ignorePathOverride
const ignoreOverride = appPackageJson.hasOwnProperty('prettierIgnore')
if (ignoreOverride) {
  const appIgnorePath = resolve(paths.scriptsAppConfig, '.prettierignore')
  const data = appPackageJson.prettierIgnore.join('\n')

  try {
    ensureWriteFile(appIgnorePath, data)

    ignorePathOverride = appIgnorePath
  } catch (err) {
    console.log('Could not create ".prettierignore"')
    console.log()
    console.log(err);

    process.exit(1)
  }
}

const prettierConfigPath =
  configPathOverride || resolve(paths.scriptsRoot, 'config/.prettierrc.json')

const prettierIgnorePath =
  ignorePathOverride || resolve(paths.scriptsRoot, 'config/.prettierignore')

const prettierArgs = [
  supportedArg || '--write',
  '--config',
  prettierConfigPath,
  '--ignore-path',
  prettierIgnorePath,
  `**/*.{js,json}`
]

const result = spawnSync(prettierPath, prettierArgs, {
  env: process.env,
  cwd: paths.appSrc,
  stdio: 'inherit'
})

if (result.error) {
  console.log('"format" failed with the following error:')
  console.log()
  console.log(result.error)

  process.exit(1)
}
