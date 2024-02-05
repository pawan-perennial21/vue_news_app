const { config } = require("@vue/test-utils");

// Set up Vue Test Utils to use Mocha
config.global.stubs.transition = false;
