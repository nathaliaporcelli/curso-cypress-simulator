const { defineConfig } = require("cypress")
const cypressSplit = require('cypress-split')

module.exports = defineConfig({
  viewportHeight: 1024,
  viewportWidth: 1700,
  defaultCommandTimeout: 6000,
  e2e: {
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      return config
    },
  },
})
