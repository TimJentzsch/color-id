import { redirect } from '@sveltejs/kit';
import { formatHex, random } from 'culori';

export function load() {
	// Pick a random color
	redirect(307, encodeURIComponent(formatHex(random())));
}
