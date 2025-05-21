const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api.trello.com/1",
    env:{

      API_KEY:"88872f9b0c6eac33d7f93114392c5dde",
      API_TOKEN:"ATTA510585a9c9e5b2ebaa474aff875b6e7c57ce98a81189edc200b28989f9df9421DD003E7A"
    },
    setupNodeEvents(on, config) {
     
    },
  },
});
