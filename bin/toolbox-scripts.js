#!/usr/bin/env node

const script = process.argv.length > 1 ? process.argv[2] : undefined

switch (script) {
  case 'start': {
    require(`../scripts/${script}.js`)
    break
  }
  default: {
    console.log(`Unknwon script "${script}".`)
    process.exit(1)
  }
}
