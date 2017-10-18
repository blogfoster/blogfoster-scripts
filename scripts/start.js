const { dotenv, projectBuildIndexJs } = require("../util/describe-project");

require("dotenv").config({ path: dotenv });

// TODO: make sure file exists
require(projectBuildIndexJs);
