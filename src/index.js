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

/** Handles the submission of the identification form. */
function onSubmitColorForm() {
  const colorInput = document.getElementById("color-input");
  if (colorInput) {
    const color = colorInput.value;
    console.info(`Identifying color ${color}`);
  } else {
    console.error("Color input not found!");
  }
  // Make sure that the page isn't reloaded
  return false;
}

// Load the Vue app and register event listeners
document.addEventListener("DOMContentLoaded", () => {
  app.mount("#app");

  const colorForm = document.getElementById("color-input-form");
  if (colorForm) {
    colorForm.onsubmit = onSubmitColorForm;
  } else {
    console.error("Color form not found!");
  }
});
