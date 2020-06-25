// Handles code from the page URL.

const queryString = window.location.search;
const params = new URLSearchParams(queryString);

/** Returns true if the param is used with a value of "1". */
export function hasParam(param: string): boolean {
	return params.get(param) === "1";
}