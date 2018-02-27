const chalk = require('chalk');

module.exports = `
  ${chalk.bold('blogfoster-scripts')} <command>

  ${chalk.gray('Commands:')}

    lint                  Fix any (fixable) linting issues
    format                Fix any (fixable) formatting issues
    build                 Build the app for production

  ${chalk.gray('Options:')}

    -h, --help            Output usage information
    -v, --version         Out the version number
    --check               Only check for issues without fixing them
`;
