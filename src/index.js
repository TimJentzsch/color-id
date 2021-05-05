// Constants
const PROJECT_NAME = "color-id";
const PROJECT_VERSION = "0.0.4";
const PROJECT_AUTHOR = "Tim Jentzsch";
const PROJECT_SOURCE = "https://github.com/TimJentzsch/color-id";

/** Updates the URL query parameter and the history if necessary. */
function updateURL(colorHex, updateHistory) {
  const data = { color: colorHex };
  const queryParam = `?color=${encodeURI(colorHex.replace("#", ""))}`;

  if (updateHistory) {
    history.pushState(data, PROJECT_NAME, queryParam);
  } else {
    history.replaceState(data, PROJECT_NAME, queryParam);
  }
}

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
    // Update color when user moves through history
    window.addEventListener("popstate", (ev) => {
      if (!ev.state || !ev.state.color) {
        return;
      }

      this.colorInput = ev.state.color;
      this.identifyColor(false);
    });

    let color = culori.random();
    let colorInput = culori.formatHex(color);
    let randomedColor = true;

    // Check if a color is already specified (otherwise use random color)
    const queryString = window.location.search;
    const colorParam = new URLSearchParams(queryString).get("color");
    console.debug(`Color: ${colorParam}`)
    if (colorParam) {
      parsedColor = culori.rgb(colorParam);
      if (parsedColor) {
        color = parsedColor;
        colorInput = colorParam;
        randomedColor = false;
      }
    }

    const hex = culori.formatHex(color);

    if (randomedColor) {
      updateURL(hex, false);
    }

    const searchColor = {
      hex,
      style: `background-color: ${hex};`,
    };
    const nearestColors = getNearestColors(color);

    updatePrimaryColor(color);

    return {
      name: PROJECT_NAME,
      version: PROJECT_VERSION,
      author: PROJECT_AUTHOR,
      source: PROJECT_SOURCE,
      colorInput,
      inputPlaceholder: hex,
      searchColor,
      nearestColors,
    };
  },

  methods: {
    /** Identifies the given color input string. */
    identifyColor(updateHistory = true) {
      const rgb = culori.rgb(this.colorInput);
      if (rgb) {
        const hex = culori.formatHex(rgb);
        if (updateHistory) {
          updateURL(this.colorInput, true);
        }
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
