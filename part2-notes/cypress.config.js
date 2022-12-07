const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7zkz3m",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
