export const CONSTANT = {
	/** Messages used to block the application. */
	alertMessages: [] as string[],

	/** Minimum time to wait for fetch response. */
	fetchMinTimeout: seconds(.5),
	/** Maximum time to wait for fetch response. */
	fetchMaxTimeout: seconds(15),

	/** Time that a local data promise should take. */
	localDataFetchTime: seconds(2),

	/** Time to wait since last successful fetch before restarting the application. */
	appRefreshTimeout: minutes(85),
	/**
	 * Time to wait since last successful fetch before fetching again.
	 * Caution: should be shorter than app refresh timeout, and longer than videos!
	*/
	staleDataTimeout: minutes(30),
};

function seconds(seconds: number): number {
	return seconds * 1000;
}

function minutes(minutes: number): number {
	return seconds(minutes * 60);
}

// Make these public on the window for us to easily check
(window as any)['CONSTANT'] = CONSTANT;