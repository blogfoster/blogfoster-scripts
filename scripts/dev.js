const { spawn } = require("child_process");
const webpack = require("webpack");
const paths = require("../config/paths");
const webpackConfig = require(paths.selfWebpackConfigDev);

const compiler = webpack(webpackConfig);
const watchOptions = {};
let childProcess;

const startChildProcess = () =>
  spawn("node", [paths.projectBuildIndexJs], {
    cwd: paths.projectSrc,
    stdio: "inherit"
  });

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
      colors: true
    })
  );

  if (childProcess) {
    // If the child process is already running, kill it so we can restart the
    // server on the same port
    childProcess.kill();
    if (!childProcess.killed) {
      console.error("Server in child process could not be killed");

      process.exit(1);
    }
  }

  // Create the server in a child process
  childProcess = startChildProcess();
});
