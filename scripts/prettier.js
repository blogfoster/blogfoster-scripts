const { spawnSync } = require('child_process')
const {
  projectSrc,
  selfPrettierBin,
  selfPrettierConfig,
  selfPrettierIgnore
} = require('../util/describe-project')

const userOption = process.argv.length > 2 ? process.argv[3] : undefined
const supportedOptions = ['--debug-check', '--list-different']
const option = supportedOptions.includes(userOption) ? userOption : undefined

const prettierArgs = [
  option || '--write',
  '--config',
  selfPrettierConfig,
  '--ignore-path',
  selfPrettierIgnore,
  `./**/*.{js,json}`
]

const result = spawnSync(selfPrettierBin, prettierArgs, {
  env: process.env,
  cwd: projectSrc,
  stdio: 'inherit'
})

if (result.error) {
  console.log('"format" failed with the following error:')
  console.log()
  console.log(result.error)

  process.exit(1)
}
