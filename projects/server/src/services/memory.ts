export interface MemoryCacheInput {
	isCaching: boolean;
	expiration: number;
}

export interface MemoryCache<T> {
	cacheItem: MemoryCacheItem<T> | null;
	cacheExpiration: number;
	stats: MemoryCacheStats;
	isCaching: boolean;
	setIsCaching: (isCaching: boolean) => void;
	setCacheItemValue: (item: T | null) => void;
	getCacheTimeRemaining: () => number;
	registerHit: () => MemoryCacheHit<T>;
}

export interface MemoryCacheHit<T> {
	cacheItemValue: T | null;
	timeRemainingInCache: number;
}

export interface MemoryCacheItem<T> {
	value: T;
	cachedAt: number;
}

export interface MemoryCacheStats {
	totalCacheBreaks: number;
	recentCacheHits: number;
	totalCacheHits: number;
	totalHits: number;
}

export function createMemoryCache<T>(input: MemoryCacheInput): MemoryCache<T> {

	const state: MemoryCache<T> = {
		cacheItem: null,
		cacheExpiration: input.expiration,
		stats: {
			totalCacheBreaks: 0,
			recentCacheHits: 0,
			totalCacheHits: 0,
			totalHits: 0
		},
		isCaching: input.isCaching,
		setIsCaching: setIsCaching,
		setCacheItemValue: setCacheItemValue,
		getCacheTimeRemaining: getCacheTimeRemaining,
		registerHit: registerHit
	};

	function setIsCaching(newIsCaching: boolean): void {
		if (!newIsCaching) {
			setCacheItemValue(null);
		}
		state.isCaching = newIsCaching;
	}

	function setCacheItemValue(newItem: T | null): void {
		if (!state.isCaching) {
			return;
		}
		if (newItem) {
			state.cacheItem = {
				value: newItem!,
				cachedAt: Date.now()
			};
		}
		else {
			state.cacheItem = null;
		}
	}

	function getCacheItem(): MemoryCacheItem<T> | null {
		if (!state.isCaching || !state.cacheItem) {
			return null;
		}
		if (getCacheTimeRemaining() === 0) {
			state.cacheItem = null;
		}
		return state.cacheItem;
	}

	function getCacheTimeRemaining() {
		if (!state.isCaching || !state.cacheItem) {
			return 0;
		}
		return Math.max(0, (state.cacheItem.cachedAt + state.cacheExpiration) - Date.now());
	}

	function registerHit(): MemoryCacheHit<T> {
		const { stats, isCaching } = state;

		let cacheItemValue: T | null = null;

		stats.totalHits++;
		if (isCaching) {
			// Check in cache.
			const cacheItem = getCacheItem();
			if (cacheItem) {
				cacheItemValue = cacheItem.value;
				stats.recentCacheHits++;
				stats.totalCacheHits++;
			}
			else {
				stats.totalCacheBreaks++;
				stats.recentCacheHits = 0;
			}
		}
		return {
			cacheItemValue: cacheItemValue,
			timeRemainingInCache: getCacheTimeRemaining()
		};
	}

	return state;
}