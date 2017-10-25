const { projectBuild, projectIndexJs } = require("../util/paths");

module.exports = {
  entry: projectIndexJs,
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
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: [require("babel-plugin-sitrep")]
          }
        }
      }
    ]
  }
};
