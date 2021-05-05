// Constants
const PROJECT_NAME = "color-id";
const PROJECT_VERSION = "0.0.3";
const PROJECT_AUTHOR = "Tim Jentzsch";
const PROJECT_SOURCE = "https://github.com/TimJentzsch/color-id";

/** Updates the primary color for the whole page. */
function updatePrimaryColor(input) {
  const hsl = culori.hsl(input);
  if (!hsl) {
    return;
  }
  // Ensure that the contrast is high enough
  if (hsl.l < 0.8) {
    hsl.l = 0.8;
  }
  const hex = culori.formatHex(hsl);
  // Update the CSS variable
  document.documentElement.style.setProperty("--primary", hex);
}

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
    const nearestColors = getNearestColors(randomColor);

    updatePrimaryColor(randomColor);

    return {
      name: PROJECT_NAME,
      version: PROJECT_VERSION,
      author: PROJECT_AUTHOR,
      source: PROJECT_SOURCE,
      colorInput: hex,
      inputPlaceholder: hex,
      searchColor,
      nearestColors,
    };
  },

  methods: {
    /** Identifies the given color input string. */
    identifyColor() {
      const rgb = culori.rgb(this.colorInput);
      if (rgb) {
        const hex = culori.formatHex(rgb);
        this.searchColor = {
          hex,
          style: `background-color: ${hex};`,
        };
        this.nearestColors = getNearestColors(rgb);
        updatePrimaryColor(rgb);
      }
    },

    /** Selects a new random color. */
    randomColor() {
      const randomColor = culori.random();
      const hex = culori.formatHex(randomColor);
      this.colorInput = hex;
      this.identifyColor();
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

  const colorInput = document.getElementById("color-input");
  if (colorInput) {
    // Select all color input when focusing
    colorInput.addEventListener("focus", () => {
      colorInput.select();
    });
    // Autofocus color input
    colorInput.focus();
  } else {
    console.error("Color input not found!");
  }
});
