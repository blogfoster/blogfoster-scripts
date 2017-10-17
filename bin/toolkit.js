#!/usr/bin/env node

const script = process.argv.length > 1 ? process.argv[2] : undefined

switch (script) {
  case 'eslint':
  case 'prettier':
  case 'start': {
    require('dotenv').config({
      path: require('../util/describe-project').dotenv
    })

    require(`../scripts/${script}.js`)
    break
  }
  default: {
    console.log(`Unknwon script "${script}".`)
    console.log()

    process.exit(1)
  }
}
