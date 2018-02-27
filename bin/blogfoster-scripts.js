const helpMessage = require('../util/output/help');
const script = process.argv.length > 1 ? process.argv[2] : undefined;

if (['-v', '--version'].includes(script)) {
  console.log(require('../package.json').version);

  process.exit(0);
}

if (['-h', '--help'].includes(script)) {
  console.log(helpMessage);

  process.exit(0);
}

switch (script) {
  case 'lint':
  case 'format':
  case 'dev':
  case 'build': {
    require(`../scripts/${script}.js`);
    break;
  }
  default: {
    console.error(helpMessage);

    process.exit(1);
  }
}
