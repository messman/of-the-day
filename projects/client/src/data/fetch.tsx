// Handles API fetch from server to client.
import * as React from "react";
import * as Common from "@/styles/common";
import { getKey } from "@/tree/app";
import { get, set, remove } from "./localStorage";
import { hasParam } from "./url";

// Unfortunately, our code is hosted in an environment that leaves it open to Cold Starts.
// This means if the app is not used for more than 15 minutes or so, it could take up to 30 seconds or more for the first request to complete.
// Put our max at 30 and hopefully it is solved before then.
export const fetchMinMilliseconds: number = 800;
export const fetchMaxMilliseconds: number = 30000;

/** Makes a GET request from the supplied URL and caches the result. */
export function fetchApi<T>(url: string): Promise<T> {
	const cachedResult = tryFetchFromCache<T>(url);
	if (cachedResult) {
		return new Promise((res) => {
			return res(cachedResult);
		});
	}

	return fetch(url)
		.then((response: Response) => {
			if (!response.ok) {
				throw new Error(`fetch status error (${response.status}): ${response.statusText}`);
			}
			return response.json();
		})
		.then((data) => {
			saveToCache(url, data);
			return data as T;
		})
		.catch((e) => {
			const error = e as Error;
			throw new Error(`fetch exception caught: ${error.message}`);
		});
}

/** Component to show when the page errors out. */
export const FetchErr: React.FC = () => {
	return (
		<Common.BadText>
			Unfortunately, something's gone wrong with this page.
			Please check back later or try a page refresh.
		</Common.BadText>
	);
}

// Our cache expiration is quite small because I don't expect a lot of foul play.
// The bottleneck comes from Google Sheets' limit on requests per hour.
/** Our cache expiration. */
const fetchCacheExpirationMilliseconds = 60 * 1000; // 1 minute
const isCacheBreak = hasParam("cacheBreak");

/** Used to store our data with a time. */
interface CachedData<T> {
	data: T,
	now: number
}

function tryFetchFromCache<T>(cacheKey: string): T {
	if (!cacheKey || isCacheBreak) {
		return null;
	}
	const key = getKey(cacheKey);
	const cachedData = get<CachedData<T>>(key);
	if (cachedData && cachedData.now + fetchCacheExpirationMilliseconds > Date.now()) {
		return cachedData.data;
	}
	return null;
}

function saveToCache<T>(cacheKey: string, value: T): void {
	if (!cacheKey) {
		return null;
	}
	const key = getKey(cacheKey);
	if (isCacheBreak) {
		remove(key);
		return;
	}
	const cachedData: CachedData<T> = {
		data: value,
		now: Date.now()
	};
	set(key, cachedData);
}