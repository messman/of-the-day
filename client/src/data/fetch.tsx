import * as React from "react";
import * as Common from "@/styles/common";
import { getKey } from "@/tree/app";
import { get, set, remove } from "./localStorage";
import { hasParam } from "./url";

export const fetchMinMilliseconds: number = 800;
export const fetchMaxMilliseconds: number = 8000;

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

export const FetchErr: React.FC = () => {
	return (
		<Common.BadText>
			Unfortunately, something's gone wrong with this page.
			Please check back later.
		</Common.BadText>
	);
}

const fetchCacheExpirationMilliseconds = 60 * 1000; // 1 minute
const isCacheBreak = hasParam("cacheBreak");

interface CachedData<T> {
	data: T,
	now: number
}

export function tryFetchFromCache<T>(cacheKey: string): T {
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

export function saveToCache<T>(cacheKey: string, value: T): void {
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