const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api.trello.com/1",
    env:{
      API_KEY:"xxx",
      API_TOKEN:"xxx"
    },
    setupNodeEvents(on, config) {
     
    },
  },
});
