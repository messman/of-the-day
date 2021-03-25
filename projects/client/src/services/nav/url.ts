// Handles code from the page URL.

import { useHistory } from 'react-router';

const queryString = window.location.search;
const params = new URLSearchParams(queryString);

/** Returns true if the param is used with a value of "1". */
export function hasParam(param: string): boolean {
	return params.get(param) === "1";
}

export interface NavigateWithParams {
	(path: string, replace?: boolean): void;
}

export function useHistoryWithParams(): NavigateWithParams {
	const history = useHistory();

	return function (path, replace) {
		const searchParams = window.location.search;
		const newPath = path + searchParams;
		console.log('history', newPath, { path, searchParams });
		if (replace) {
			history.replace(newPath);
		}
		else {
			history.push(newPath);
		}
	};
}