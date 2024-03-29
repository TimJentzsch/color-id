// Adapted from culori
// See <https://github.com/Evercoder/culori/blob/441e792f1266cba1337b159fd3e439e231c69235/src/util/regex.js>

// <number>
export const num = '([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)';

// <number> or 'none'
export const num_none = `(?:${num}|none)`;

// <percentage>
export const per = `${num}%`;

// <percent> or 'none'
export const per_none = `(?:${num}%|none)`;

// <number-percentage> (<alpha-value>)
export const num_per = `(?:${num}%|${num})`;

// <number-percentage> (<alpha-value>) or 'none'
export const num_per_none = `(?:${num}%|${num}|none)`;

// <hue>
export const hue = `(?:${num}(deg|grad|rad|turn)|${num})`;

// <hue> or 'none'
export const hue_none = `(?:${num}(deg|grad|rad|turn)|${num}|none)`;

export const c = `\\s*,\\s*`; // comma
export const so = '\\s*'; // space, optional
export const s = `\\s+`; // space

export const rx_num_per_none = new RegExp('^' + num_per_none + '$');
