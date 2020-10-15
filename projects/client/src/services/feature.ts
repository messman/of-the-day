
/**
	Used to fix https://github.com/pmndrs/react-spring/issues/664,
	where react-spring won't work if Firefox has the fingerprinting protection setting turned on.
*/
export const isUsingFirefoxFingerprintProtection: boolean = (() => {

	const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	if (!isFirefox) {
		return false;
	}
	if (performance.mark && performance.getEntries) {
		performance.mark('dummy_check');
		const entries = performance.getEntries();
		const isUsingFingerprintProtection = !!entries && entries.length === 0;
		if (isUsingFingerprintProtection) {
			console.log('Firefox + Fingerprinting Protection = No React-Spring Animations :(');
		}
		return isUsingFingerprintProtection;
	}
	return false;
})();
