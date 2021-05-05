// Constants
const PROJECT_NAME = "color-id";
const PROJECT_VERSION = "0.0.1";
const PROJECT_AUTHOR = "Tim Jentzsch";
const PROJECT_SOURCE = "https://github.com/TimJentzsch/color-id";

const ColorIDApp = {
  data() {
    return {
      name: PROJECT_NAME,
      version: PROJECT_VERSION,
      author: PROJECT_AUTHOR,
      source: PROJECT_SOURCE,
    };
  },
};

const app = Vue.createApp(ColorIDApp);

document.addEventListener("DOMContentLoaded", () => {
  app.mount("#app");
});
