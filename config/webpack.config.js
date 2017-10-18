const { projectBuild, projectIndexJs } = require("../util/describe-project");

module.exports = {
  target: "node",
  entry: projectIndexJs,
  output: {
    filename: "index.js",
    path: projectBuild
  }
};
