const { projectBuild, projectIndexJs } = require("../util/paths");

module.exports = {
  target: "node",
  entry: projectIndexJs,
  output: {
    filename: "index.js",
    path: projectBuild
  }
};
