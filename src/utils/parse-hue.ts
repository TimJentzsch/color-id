// Adapted from culori
// See <https://github.com/Evercoder/culori/blob/441e792f1266cba1337b159fd3e439e231c69235/src/util/hue.js>
import type { HueUnit } from './types';

function hueToDeg(val: number, unit: HueUnit) {
	switch (unit) {
		case 'deg':
			return val;
		case 'rad':
			return (val / Math.PI) * 180;
		case 'grad':
			return (val / 10) * 9;
		case 'turn':
			return val * 360;
	}
}

export default hueToDeg;
