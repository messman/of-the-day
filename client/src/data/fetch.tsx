import * as React from "react";
import * as Common from "@/styles/common";
import { getKey } from "@/tree/app";
import { get, set } from "./localStorage";

export const fetchMinMilliseconds: number = 800;
export const fetchMaxMilliseconds: number = 8000;

export function fetchApi<T>(url: string, cacheKey: string): Promise<T> {

	if (cacheKey) {
		const cachedResult = tryFetchFromCache<T>(cacheKey);
		if (cachedResult) {
			return new Promise((res) => {
				return res(cachedResult);
			});
		}
	}

	return fetch(url)
		.then((response: Response) => {
			if (!response.ok) {
				throw new Error(`fetch status error (${response.status}): ${response.statusText}`);
			}
			return response.json();
		})
		.then((data) => {
			if (cacheKey) {
				saveToCache(cacheKey, data);
			}
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

const fetchCacheExpirationMilliseconds = 30 * 60 * 1000; // 30 minutes

interface CachedData<T> {
	data: T,
	now: number
}

export function tryFetchFromCache<T>(cacheKey: string): T {
	const key = getKey(cacheKey);
	const cachedData = get<CachedData<T>>(key);
	if (cachedData && cachedData.now + fetchCacheExpirationMilliseconds > Date.now()) {
		return cachedData.data;
	}
	return null;
}

export function saveToCache<T>(cacheKey: string, value: T): void {
	const key = getKey(cacheKey);
	const cachedData: CachedData<T> = {
		data: value,
		now: Date.now()
	};
	set(key, cachedData);
}