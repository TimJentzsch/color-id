// Constants
const PROJECT_NAME = "color-id";
const PROJECT_VERSION = "0.0.1";
const PROJECT_AUTHOR = "Tim Jentzsch";
const PROJECT_SOURCE = "https://github.com/TimJentzsch/color-id";

/** Gets the clostest colors to the input color. */
function getNearestColors(input) {
  const colors = Object.keys(culori.colorsNamed)
    // Exclude duplicate colors
    .filter((name) => !name.includes("gray"));
  const nearest = culori.nearest(colors, culori.differenceCiede2000());

  return nearest(input, 5).map((name) => {
    return {
      name,
      hex: culori.formatHex(name),
      style: `background-color: ${name};`,
    };
  });
}

const ColorIDApp = {
  data() {
    // Start with a random color
    const randomColor = culori.random();
    const hex = culori.formatHex(randomColor);
    const searchColor = {
      hex,
      style: `background-color: ${hex};`,
    };
    const nearestColors = getNearestColors(hex);

    return {
      name: PROJECT_NAME,
      version: PROJECT_VERSION,
      author: PROJECT_AUTHOR,
      source: PROJECT_SOURCE,
      colorInput: hex,
      searchColor,
      nearestColors,
    };
  },

  methods: {
    /** Identifies the given color input string. */
    identifyColor() {
      const rgb = culori.converter("rgb")(this.colorInput);
      if (rgb) {
        const hex = culori.formatHex(rgb);
        this.searchColor = {
          hex,
          style: `background-color: ${hex};`,
        };
        this.nearestColors = getNearestColors(hex);
      }
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
