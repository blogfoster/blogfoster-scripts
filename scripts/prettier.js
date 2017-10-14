const { resolve } = require('path')
const { existsSync } = require('fs')
const { spawnSync } = require('child_process')

const paths = require('../config/paths')
const ensureWriteFileSync = require('../util/ensureWriteFileSync')

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

const defaultConfigPath = resolve(paths.scriptsRoot, 'config/.prettierrc.json')
const defaultIgnorePath = resolve(paths.scriptsRoot, 'config/.prettierignore')
const appConfigCopyPath = resolve(paths.scriptsAppConfig, '.prettierrc.json')
const appIgnoreCopyPath = resolve(paths.scriptsAppConfig, '.prettierignore')

let configPathOverride
if (appPackageJson.hasOwnProperty('prettier')) {
  try {
    ensureWriteFileSync(
      appConfigCopyPath,
      JSON.stringify(appPackageJson.prettier)
    )
    configPathOverride = appConfigCopyPath
  } catch (err) {
    console.log('Could not copy content of "prettier".')
    console.log()
    console.log(err)

    process.exit(1)
  }
}

let ignorePathOverride
if (appPackageJson.hasOwnProperty('prettierIgnore')) {
  try {
    ensureWriteFileSync(
      appIgnoreCopyPath,
      appPackageJson.prettierIgnore.join('\n')
    )

    ignorePathOverride = appIgnoreCopyPath
  } catch (err) {
    console.log('Could not copy content of "prettierIgnore".')
    console.log()
    console.log(err)

    process.exit(1)
  }
}

const prettierArgs = [
  supportedArg || '--write',
  '--config',
  configPathOverride || defaultConfigPath,
  '--ignore-path',
  ignorePathOverride || defaultIgnorePath,
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
