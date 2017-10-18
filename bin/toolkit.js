#!/usr/bin/env node

const script = process.argv.length > 1 ? process.argv[2] : undefined;

switch (script) {
  case "lint":
  case "format":
  case "start": {
    require(`../scripts/${script}.js`);
    break;
  }
  default: {
    console.log(`Unknwon script "${script}".`);
    console.log();

    process.exit(1);
  }
}
