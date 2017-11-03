const paths = require("./paths");

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
    modules: ["node_modules", paths.selfNodeModules]
  }
};
