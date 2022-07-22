/** Capitalize the first letter of the text and make the rest lower case. */
export function capitalize(text: string): string {
	if (text.length === 0) {
		return text;
	}

	return text[0].toLocaleUpperCase().concat(text.slice(1).toLocaleLowerCase());
}
