const { projectBuild, projectIndexJs, projectSrc } = require("../util/paths");

module.exports = {
  context: projectSrc,
  entry: projectIndexJs,
  output: {
    filename: "index.js",
    path: projectBuild
  },
  devtool: "source-map",
  target: "node"
};
