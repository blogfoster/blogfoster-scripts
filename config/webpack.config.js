const { projectBuild, projectIndexJs } = require("../util/describe-project");

module.exports = {
  entry: projectIndexJs,
  output: {
    filename: "index.js",
    path: projectBuild
  }
};
