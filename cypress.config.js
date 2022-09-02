const path = require("path");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://taiwanebook.ncl.edu.tw",
    setupNodeEvents(on) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        const extensionFolder = path.resolve("./chrome");
        launchOptions.extensions.push(extensionFolder);
        return launchOptions;
      });
    },
  },
});
