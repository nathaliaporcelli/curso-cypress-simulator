const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight:1024,
  viewportWidth:1700,
  e2e: {
    defaultCommandTimeout: 10000,
    fixturesFolder:false,
    },
});
