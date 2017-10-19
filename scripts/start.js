const { existsSync } = require("fs");
const { dotenv, projectBuildIndexJs } = require("../util/paths");

if (!existsSync(projectBuildIndexJs)) {
  console.error('Bundle doesn\'t exist. Did you forget to run "build"?');
  console.error();

  process.exit(1);
}

// make sure .env file is loaded into `process.env`
require("dotenv").config({ path: dotenv });
// make sure to support source-maps
require("source-map-support").install();

require(projectBuildIndexJs);
