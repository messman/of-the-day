export const CONSTANT = {
	/** Messages used to block the application. */
	alertMessages: [] as string[],

	/** Minimum time to wait for fetch response. */
	fetchMinTimeout: seconds(.5),
	/** Maximum time to wait for fetch response. */
	fetchMaxTimeout: seconds(15),
	/** Time to wait since last successful fetch before restarting the application. */
	appRefreshTimeout: minutes(30),
	/** Time to wait since last successful fetch before fetching again. */
	staleDataTimeout: minutes(15),
};

function seconds(seconds: number): number {
	return seconds * 1000;
}

function minutes(minutes: number): number {
	return seconds(minutes * 60);
}

// Make these public on the window for us to easily check
(window as any)['CONSTANT'] = CONSTANT;