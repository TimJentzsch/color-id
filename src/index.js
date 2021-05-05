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
      nearestColors: [],
    };
  },
  methods: {
    /** Identifies the given color input string. */
    identifyColor(input) {
      const colors = Object.keys(culori.colorsNamed);
      const getNearestColors = culori.nearest(
        colors,
        culori.differenceCiede2000()
      );

      this.nearestColors = getNearestColors(input, 5).map((name) => {
        return {
          name,
          hex: culori.formatHex(name),
          style: `background-color: ${name};`,
        };
      });
    },

    /** Handles the submission of the identification form. */
    onSubmitColorForm() {
      const colorInput = document.getElementById("color-input");
      if (colorInput) {
        const color = colorInput.value;
        this.identifyColor(color);
      } else {
        console.error("Color input not found!");
      }
      // Make sure that the page isn't reloaded
      return false;
    },
  },
};

const app = Vue.createApp(ColorIDApp);

// Load the Vue app and register event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Load the Vue app
  app.mount("#app");

  // Make sure that the page isn't reloaded when the color form is submitted
  const colorForm = document.getElementById("color-input-form");
  if (colorForm) {
    colorForm.onsubmit = () => {
      return false;
    };
  } else {
    console.error("Color form not found!");
  }
});
