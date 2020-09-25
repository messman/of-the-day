import { WindowLayout } from '@messman/react-common';

// Customized breakpoints based on design.
export enum LayoutBreakpoint {
	min = 0,
	/** Absolute minimum we will support. iPhone 5 / SE. */
	mobileMin = 320,
	/** Regular mobile screen size for modern iPhones. */
	mobileRegular = 375,
	/** That weird space between mobile and tablet. */
	mobileLarge = 576,
	tablet = 768,
	desktop = 992,
	wide = 1200,
	max = 1500,
}
/** Maximum line length that we accept for paragraphs of text, in rem. */
export const lineBreakpoint = '32rem';

export const lowerBreakpoints: number[] = [LayoutBreakpoint.min, LayoutBreakpoint.mobileMin, LayoutBreakpoint.mobileRegular, LayoutBreakpoint.mobileLarge, LayoutBreakpoint.tablet, LayoutBreakpoint.desktop, LayoutBreakpoint.wide];

export function isInvalidLayout(windowLayout: WindowLayout): boolean {
	// If height is too small, it's invalid.
	return windowLayout.heightBreakpoint <= LayoutBreakpoint.mobileLarge;
}