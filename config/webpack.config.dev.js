const paths = require("./paths");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  bail: true,
  entry: [
    require.resolve("../util/console-group-polyfill"),
    paths.projectIndexJs
  ],
  output: {
    filename: "index.js",
    path: paths.projectBuild
  },
  devtool: "source-map",
  // Don't touch node core modules like "fs", "path", etc.
  target: "node",
  // Don't bundle modules located in `node_modules`
  externals: [nodeExternals()],
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
              // https://github.com/babel/proposals/issues/12]
              require.resolve("babel-plugin-transform-class-properties")
            ]
          }
        }
      }
    ]
  },
  resolve: {
    modules: ["node_modules", paths.selfNodeModules]
  }
};
