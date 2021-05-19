const PROJECT_NAME = "color-id";
const PROJECT_VERSION = "0.2.2";
const PROJECT_AUTHOR = "Tim Jentzsch";
const PROJECT_SOURCE = "https://github.com/TimJentzsch/color-id";

const NAMED_COLORS = Object.keys(culori.colorsNamed)
  // Exclude duplicate colors
  .filter((name) => !name.includes("gray"))
  // Calculate color hex
  .map((name) => {
    const hex = culori.formatHex(name);
    return {
      name,
      hex,
    };
  });
