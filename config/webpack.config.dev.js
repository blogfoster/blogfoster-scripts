const paths = require("./paths");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  bail: true,
  output: {
    filename: "index.js",
    path: paths.projectBuild
  },
  entry: [
    // Include the console-group-polyfill because we want to support
    // "babel-plugin-sitrep" for older Node versions.
    require.resolve("../util/console-group-polyfill"),
    // Make sure to load the project's .env file for the bundle.
    require.resolve("../util/support-dotenv"),
    // Make sure to support source-maps for the bundle.
    require.resolve("../util/support-source-maps"),
    paths.projectIndexJs
  ],
  devtool: "source-map",
  // Don't touch node core modules like "fs", "path", etc.
  target: "node",
  // Don't touch module specific globals
  node: {
    __dirname: false,
    __filename: false
  },
  // Don't bundle modules located in `node_modules`
  // TODO: Check if both `node_modules` folders are ignored
  externals: [nodeExternals()],
  // When webpack is resolving modules, let it first look up modules in the
  // projects "node_modules" folder and only after that search in our own.
  resolve: {
    modules: ["node_modules", paths.selfNodeModules]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("babel-preset-env")],
            plugins: [
              require.resolve("babel-plugin-sitrep"),
              // TODO: Get rid of "transform-class-properties" when there's a
              // plugin for the class fields proposal.
              //
              // https://github.com/babel/proposals/issues/12
              require.resolve("babel-plugin-transform-class-properties")
            ]
          }
        }
      }
    ]
  }
};
