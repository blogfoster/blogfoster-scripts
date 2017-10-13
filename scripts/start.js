const paths = require('../config/paths')

require('dotenv').config({ path: paths.dotenv })

require(paths.appIndexJs)
