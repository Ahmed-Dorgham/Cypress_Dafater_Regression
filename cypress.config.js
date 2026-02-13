const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Point to your new e2e folder
    specPattern: "cypress/e2e/**/*.cy.js",

    supportFile: false,  // optional if you don't use a support file
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
