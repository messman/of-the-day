export const CONSTANT = {

	/** Messages used to block the application. */
	alertMessages: [] as string[],

	/** Minimum time to wait for fetch response. */
	fetchMinTimeout: seconds(.5),
	/** Maximum time to wait for fetch response. */
	fetchMaxTimeout: seconds(36),
	/** Time before max where an update is shown to the user to reassure them. */
	fetchStillWaitingTimeout: seconds(15),
	/** Time to wait since last successful fetch before either fetching again or restarting the application. */
	appRefreshTimeout: minutes(30),

	elementSizeSmallThrottleTimeout: seconds(0),
	elementSizeLargeThrottleTimeout: seconds(0),

	clearDataOnNewFetch: false,
};

function seconds(seconds: number): number {
	return seconds * 1000;
}

function minutes(minutes: number): number {
	return seconds(minutes * 60);
}

// Make these public on the window for us to easily check
(window as any)['CONSTANT'] = CONSTANT;