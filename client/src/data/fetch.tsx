import * as React from "react";
import * as Common from "@/styles/common";

export const fetchMinMilliseconds: number = 800;
export const fetchMaxMilliseconds: number = 8000;

export function fetchApi<T>(url: string): Promise<T> {
	return fetch(url)
		.then((response: Response) => {
			if (!response.ok) {
				throw new Error(`fetch status error (${response.status}): ${response.statusText}`);
			}
			return response.json();
		})
		.then((data) => {
			return data as T;
		})
		.catch((e) => {
			const error = e as Error;
			throw new Error(`fetch exception caught: ${error.message}`);
		});
}

export const FetchErr: React.FC = () => {
	return (
		<Common.BadText>
			Unfortunately, something's gone wrong with this page.
			Please check back later.
		</Common.BadText>
	);
}