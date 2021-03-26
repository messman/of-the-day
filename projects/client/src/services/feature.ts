import { LayoutOrientation, useWindowMediaLayout } from '@messman/react-common';
import { LayoutBreakpointRem } from './layout/window-layout';

/**
 * There is a case where 
 * - iOS devices
 * - in portrait mode
 * - with a compact view
 * - installed as a web app
 * 
 * will have the iOS home bar show over top of the lower navigation bar.
 * This function returns true if padding should be added to handle that case.
 */
export function useIsNeedingHomeBarPadding(): boolean {
	const { widthBreakpoint, orientation } = useWindowMediaLayout();
	// If compact portrait
	if (widthBreakpoint < LayoutBreakpointRem.c30 && orientation === LayoutOrientation.portrait) {
		// if full-screen https://stackoverflow.com/a/2739394
		if ((window.navigator as any)['standalone']) {
			// is any iOS browser (includes Chrome, but that's fine
			// because we already have the fullscreen check) https://stackoverflow.com/a/4933551
			if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)) {
				return true;
			}
		}
	}
	return false;
}