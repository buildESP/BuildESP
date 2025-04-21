const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '3doe1i',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
