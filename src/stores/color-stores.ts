import { rgbToCmyk } from '$utils/color-conversion';
import { hsl, hsv, parse, rgb } from 'culori';
import { derived, writable } from 'svelte/store';

export const color = writable(parse('red'));

export const rgbColor = derived(color, ($color) => rgb($color));
export const hslColor = derived(color, ($color) => hsl($color));
export const hsvColor = derived(color, ($color) => hsv($color));
export const cmykColor = derived(rgbColor, ($rgbColor) => rgbToCmyk($rgbColor));
