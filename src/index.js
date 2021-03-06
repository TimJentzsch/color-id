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
  const { r, g, b, alpha } = rgb;
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
  };
}

/** Makes a color suggestion to improve the contrast to the given target. */
function getWcagSuggestion(color, other, contrastTarget) {
  const hsl = culori.hsl(color);
  const otherHsl = culori.hsl(other);

  let change;

  if (otherHsl.l > 0.5) {
    // The color is bright, decrease the lightness
    change = -0.05;
    if (hsl.l > otherHsl.l) {
      hsl.l = otherHsl.l;
    }
  } else {
    // The color is dark, increase the lightness
    change = 0.05;
    if (hsl.l < otherHsl.l) {
      hsl.l = otherHsl.l;
    }
  }

  while (hsl.l <= 1 && hsl.l >= 0) {
    const contrast = culori.wcagContrast(hsl, otherHsl);

    if (contrast >= contrastTarget) {
      break;
    }

    hsl.l += change;
  }

  // Make sure to not exceed the lightness
  hsl.l = Math.min(1, Math.max(0, hsl.l));
  const hex = culori.formatHex(hsl);
  return {
    hex,
    style: `background-color: ${hex};`,
  };
}

/** Get the object representing a WCAG standard. */
function getWcagStandard(name, contrastTarget, color, other) {
  const contrast = culori.wcagContrast(color, other);
  const passed = contrast >= contrastTarget;
  const improvement = passed
    ? undefined
    : getWcagSuggestion(color, other, contrastTarget);

  return {
    name,
    passed,
    improvement,
  };
}

/** Get all contrast information with another color. */
function getWcagObj(color, other) {
  const hex = culori.formatHex(color);
  const otherColor = culori.rgb(other);
  const otherHex = culori.formatHex(otherColor);
  const otherStyle = `background-color: ${otherHex};`;

  const asTextStyle = `color: ${hex}; background-color: ${otherHex};`;
  const asBgStyle = `color: ${otherHex}; background-color: ${hex};`;

  // See https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast
  const contrast = culori.wcagContrast(color, otherColor);
  const standards = [
    getWcagStandard("WCAG AA (large text)", 3.0, color, otherColor),
    getWcagStandard("WCAG AA", 4.5, color, otherColor),
    getWcagStandard("WCAG AAA (large text)", 4.5, color, otherColor),
    getWcagStandard("WCAG AAA", 7.0, color, otherColor),
  ];

  const suggestion =
    culori.wcagContrast(color, "white") > culori.wcagContrast(color, "black")
      ? "light"
      : "dark";

  return {
    otherHex,
    otherStyle,
    contrast: contrast.toFixed(2),
    asTextStyle,
    asBgStyle,
    standards,
    suggestion,
  };
}

/** Gets the representation of the color needed to display it. */
function getColorRepresentation(color) {
  const hex = culori.formatHex(color);
  const style = `background-color: ${hex};`;

  const namedColor = NAMED_COLORS.find((namedColor) => {
    return namedColor.hex === hex;
  });
  const name = namedColor ? namedColor.name : null;

  const rgb = culori.rgb(color);
  const rgbStr = `rgb(${Math.round(rgb.r * 255)}, ${Math.round(
    rgb.g * 255
  )}, ${Math.round(rgb.b * 255)})`;
  const rgbStyle = {
    r: `width: ${rgb.r * 100}%`,
    g: `width: ${rgb.g * 100}%`,
    b: `width: ${rgb.b * 100}%`,
  };

  const hsl = culori.hsl(color);
  // Black and white don't have a unique hue, just set it to 0
  const h = hsl.h !== undefined ? hsl.h : 0;
  const hslStr = `hsl(${Math.round(h)}, ${Math.round(
    hsl.s * 100
  )}%, ${Math.round(hsl.l * 100)}%)`;
  const hslStyle = {
    h: `width: ${h / 3.6}%`,
    s: `width: ${hsl.s * 100}%`,
    l: `width: ${hsl.l * 100}%`,
  };

  const hsv = culori.hsv(color);
  const hsvStr = `hsv(${Math.round(h)}, ${Math.round(
    hsv.s * 100
  )}%, ${Math.round(hsv.v * 100)}%)`;
  const hsvStyle = {
    h: `width: ${h / 3.6}%`,
    s: `width: ${hsv.s * 100}%`,
    v: `width: ${hsv.v * 100}%`,
  };

  const cmyk = rgbToCmyk(rgb);
  const cmykStr = `cmyk(${Math.round(cmyk.c * 100)}%, ${Math.round(
    cmyk.m * 100
  )}%, ${Math.round(cmyk.y * 100)}%, ${Math.round(cmyk.k * 100)}%)`;
  const cmykStyle = {
    c: `width: ${cmyk.c * 100}%`,
    m: `width: ${cmyk.m * 100}%`,
    y: `width: ${cmyk.y * 100}%`,
    k: `width: ${cmyk.k * 100}%`,
  };

  return {
    hex,
    style,
    name,
    rgb,
    rgbStr,
    rgbStyle,
    hsl,
    hslStr,
    hslStyle,
    hsv,
    hsvStr,
    hsvStyle,
    cmyk,
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

  // Used in the dark theme
  const lightColor = {
    ...hsl,
    l: hsl.l < 0.8 ? 0.8 : hsl.l,
  };
  // Used in the light theme
  const darkColor = {
    ...hsl,
    l: hsl.l > 0.4 ? 0.4 : hsl.l,
  };

  const lightHex = culori.formatHex(lightColor);
  const darkHex = culori.formatHex(darkColor);
  // Update the CSS variables
  document.documentElement.style.setProperty("--primary-light", lightHex);
  document.documentElement.style.setProperty("--primary-dark", darkHex);
}

/** Gets the clostest colors to the input color. */
function getNearestColors(input) {
  const colors = NAMED_COLORS.map((color) => color.name);
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

    const wcagInput = "#232323";
    const wcagOther = wcagInput;
    const wcag = getWcagObj(rgb, wcagOther);

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
      wcagInput,
      wcagOther,
      wcag,
    };
  },

  methods: {
    /** Identifies the given color input string. */
    identifyColor(updateHistory = true) {
      const color = culori.parse(this.colorInput);
      if (color) {
        if (updateHistory) {
          updateURL(this.colorInput, true);
        }
        this.searchColor = getColorRepresentation(color);
        this.nearestColors = getNearestColors(color);
        this.wcag = getWcagObj(color, this.wcagOther);
        updatePrimaryColor(color);
      }
    },

    /** Selects a new random color. */
    randomColor() {
      const randomColor = culori.random();
      const hex = culori.formatHex(randomColor);
      this.colorInput = hex;
      this.identifyColor();
    },

    /** Sets the other color for WCAG contrast calculations. */
    setWcagColor() {
      const wcagOther = culori.parse(this.wcagInput);
      if (!wcagOther) {
        console.warn(`Invalid color: ${JSON.stringify(this.wcagInput)}`);
        return;
      }
      this.wcagOther = wcagOther;
      this.wcag = getWcagObj(this.searchColor.rgb, wcagOther);
    },

    /** Automatically set the other WCAG color. */
    wcagAuto() {
      if (this.wcag.suggestion === "dark") {
        this.wcagInput = "#000000";
      } else {
        this.wcagInput = "#ffffff";
      }

      this.setWcagColor();
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

  // Make sure that the page isn't reloaded when the WCAG form is submitted
  const wcagForm = document.getElementById("wcag-input-form");
  if (wcagForm) {
    wcagForm.onsubmit = () => {
      return false;
    };
  } else {
    console.error("WCAG form not found!");
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
