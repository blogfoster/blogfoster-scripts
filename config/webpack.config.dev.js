const { projectBuild, projectIndexJs, selfNodeModules } = require("./paths");

module.exports = {
  bail: true,
  entry: [require.resolve("../util/console-group-polyfill"), projectIndexJs],
  output: {
    filename: "index.js",
    path: projectBuild
  },
  devtool: "source-map",
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("babel-preset-env")],
            plugins: [require.resolve("babel-plugin-sitrep")]
          }
        }
      }
    ]
  },
  resolve: {
    modules: ["node_modules", selfNodeModules]
  }
};
