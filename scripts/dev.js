const { spawn } = require("child_process");
const webpack = require("webpack");
const paths = require("../config/paths");
const webpackConfig = require(paths.selfWebpackConfigDev);

const compiler = webpack(webpackConfig);
const watchOptions = {};
let serverProcess;

const createServerProcess = () =>
  spawn("node", [paths.projectBuildIndexJs], {
    env: process.env,
    cwd: paths.projectSrc,
    stdio: "inherit"
  });

compiler.watch(watchOptions, (err, stats) => {
  // handle webpack configuration errors
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }

    process.exit(1);
  }

  const info = stats.toJson();

  // handle compilation errors
  if (stats.hasErrors()) {
    console.error(info.errors);

    process.exit(1);
  }

  // print any warnings before anything else
  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log(
    stats.toString({
      colors: true
    })
  );

  if (serverProcess) {
    // If the child process is already running, kill it so we can restart the
    // server on the same port
    serverProcess.kill();
    if (!serverProcess.killed) {
      console.error("Server in child process could not be killed");

      process.exit(1);
    }
  }

  // Create the server in a child process
  serverProcess = createServerProcess();
});
