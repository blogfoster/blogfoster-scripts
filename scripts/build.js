const webpack = require("webpack");
const { selfWebpackConfig } = require("../util/describe-project");

const config = require(selfWebpackConfig);
const compiler = webpack(config);

compiler.run((err, stats) => {
  // handle webpack configuration errors
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    console.error();

    process.exit(1);
  }

  const info = stats.toJson();

  // handle compilation errors
  if (stats.hasErrors()) {
    console.error(info.errors);
    console.error();

    process.exit(1);
  }

  // print any warnings before anything else
  if (stats.hasWarnings()) {
    console.warn(info.warnings);
    console.warn();
  }

  console.log(
    stats.toString({
      colors: true
    })
  );
});
