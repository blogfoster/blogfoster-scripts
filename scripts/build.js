const webpack = require("webpack");
const { selfWebpackConfig } = require("../config/paths");

const config = require(selfWebpackConfig);
const compiler = webpack(config);

compiler.run((err, stats) => {
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
});
