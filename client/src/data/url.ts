const queryString = window.location.search;
const params = new URLSearchParams(queryString);

export function hasParam(param: string): boolean {
	return params.get(param) === "1";
}