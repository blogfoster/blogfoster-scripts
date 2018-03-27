const { spawn } = require('child_process');
const { existsSync } = require('fs');
const webpack = require('webpack');
const paths = require('../config/paths');
const webpackDevConfig = require(paths.selfWebpackConfigDev);

function startChildProcess() {
  return spawn('node', [paths.projectBuildIndexJs], {
    cwd: paths.projectSrc,
    stdio: 'inherit',
  });
}

if (!existsSync(paths.projectIndexJs)) {
  console.error('`src/index.js` file does not exist.');

  process.exit(1);
}

// There's a bug in webpack where it compiles multiple times when the entry file
// changed right before the watch started. This is a workaround to prevent
// multiple unnecessary compilations.
//
// https://github.com/webpack/watchpack/issues/25
const fixWatchLoop = compiler => {
  compiler.plugin('watch-run', (watching, callback) => {
    watching.startTime += 11000;
    callback();
  });
  compiler.plugin('done', stats => {
    stats.startTime -= 11000;
  });

  return compiler;
};

const compiler = fixWatchLoop(webpack(webpackDevConfig));
const watchOptions = {};
let childProcess;

compiler.watch(watchOptions, (err, stats) => {
  // Handle webpack configuration errors
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }

    process.exit(1);
  }

  const info = stats.toJson();

  // Handle compilation errors
  if (stats.hasErrors()) {
    console.error(info.errors);

    process.exit(1);
  }

  // Print any warnings before anything else
  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log(
    stats.toString({
      colors: true,
    })
  );

  if (childProcess) {
    // If the child process is already running, kill it so we can restart the
    // server on the same port
    childProcess.kill();
    if (!childProcess.killed) {
      console.error('Server in child process could not be killed');

      process.exit(1);
    }
  }

  // Create the server in a child process
  childProcess = startChildProcess();
});
