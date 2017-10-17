const { dotenv, projectIndexJs } = require("../util/describe-project");

require("dotenv").config({ path: dotenv });

// TODO: make sure file exists
require(projectIndexJs);
