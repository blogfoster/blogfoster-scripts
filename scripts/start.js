const { existsSync } = require("fs");
const paths = require("../config/paths");

if (!existsSync(paths.projectBuildIndexJs)) {
  console.error('Build doesn\'t exist. Did you forget to run "build"?');

  process.exit(1);
}

// make sure .env file is loaded into `process.env`
require("dotenv").config({ path: paths.dotenv });
// make sure to support source-maps
require("source-map-support").install();

require(paths.projectBuildIndexJs);
