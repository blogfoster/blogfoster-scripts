const { existsSync } = require("fs");
const { dotenv, projectBuildIndexJs } = require("../util/paths");

if (!existsSync(projectBuildIndexJs)) {
  console.error('Bundle doesn\'t exist. Did you forget to run "build"?');
  console.error();

  process.exit(1);
}

require("dotenv").config({ path: dotenv });
require(projectBuildIndexJs);
