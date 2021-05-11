// Constants
const PROJECT_NAME = "color-id";
const PROJECT_VERSION = "0.1.0";
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

/** Converts an RGB color to a CYMK color. */
function rgbToCmyk(rgb) {
  const {r, g, b, alpha} = rgb;
  const k = 1 - Math.max(r, g, b);
  const invK = 1 - k;
  const c = k === 1 ? 0 : (invK - r) / invK;
  const m = k === 1 ? 0 : (invK - g) / invK;
  const y = k === 1 ? 0 : (invK - b) / invK;

  return {
    mode: "cmyk",
    c,
    m,
    y,
    k,
    alpha,
  }
}

/** Gets the representation of the color needed to display it. */
function getColorRepresentation(color) {
  const hex = culori.formatHex(color);
  const style = `background-color: ${hex};`;

  const rgb = culori.rgb(color);
  const rgbStr = `rgb(${Math.round(rgb.r * 255)}, ${Math.round(rgb.g * 255)}, ${Math.round(rgb.b * 255)})`;
  const rgbStyle = {
    r: `width: ${rgb.r * 100}%`,
    g: `width: ${rgb.g * 100}%`,
    b: `width: ${rgb.b * 100}%`,
  };

  const hsl = culori.hsl(color);
  // Black and white don't have a unique hue, just set it to 0
  const h = hsl.h  !== undefined ? hsl.h : 0;
  const hslStr = `hsl(${Math.round(h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
  const hslStyle = {
    h: `width: ${h / 3.6}%`,
    s: `width: ${hsl.s * 100}%`,
    l: `width: ${hsl.l * 100}%`,
  }

  const hsv = culori.hsv(color);
  const hsvStr = `hsv(${Math.round(h)}, ${Math.round(hsv.s * 100)}%, ${Math.round(hsv.v * 100)}%)`;
  const hsvStyle = {
    h: `width: ${h / 3.6}%`,
    s: `width: ${hsv.s * 100}%`,
    v: `width: ${hsv.v * 100}%`,
  }

  const cmyk = rgbToCmyk(rgb);
  const cmykStr = `cmyk(${Math.round(cmyk.c * 100)}%, ${Math.round(cmyk.m * 100)}%, ${Math.round(cmyk.y * 100)}%, ${Math.round(cmyk.k * 100)}%)`;
  const cmykStyle = {
    c: `width: ${cmyk.c * 100}%`,
    m: `width: ${cmyk.m * 100}%`,
    y: `width: ${cmyk.y * 100}%`,
    k: `width: ${cmyk.k * 100}%`,
  }

  return {
    hex,
    style,
    rgbStr,
    rgbStyle,
    hslStr,
    hslStyle,
    hsvStr,
    hsvStyle,
    cmykStr,
    cmykStyle,
  };
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

    let rgb = culori.random();
    let colorInput = culori.formatHex(rgb);
    let randomedColor = true;

    // Check if a color is already specified (otherwise use random color)
    const queryString = window.location.search;
    const colorParam = new URLSearchParams(queryString).get("color");
    if (colorParam) {
      parsedColor = culori.rgb(colorParam);
      if (parsedColor) {
        rgb = parsedColor;
        colorInput = colorParam;
        randomedColor = false;
      }
    }

    const hex = culori.formatHex(rgb);

    if (randomedColor) {
      updateURL(hex, false);
    }

    const searchColor = getColorRepresentation(rgb);
    const nearestColors = getNearestColors(rgb);

    updatePrimaryColor(rgb);

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
        this.searchColor = getColorRepresentation(rgb);
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
