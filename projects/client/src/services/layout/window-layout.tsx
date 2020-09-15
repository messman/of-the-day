import { WindowLayout } from '@messman/react-common';

// Customized breakpoints based on design.
export enum LayoutBreakpoint {
	mobile = 0,
	mobileLarge = 576,
	tablet = 768,
	desktop = 992,
	wide = 1200,
}
/** Maximum line length that we accept for paragraphs of text, in rem. */
export const lineBreakpoint = '32rem';

export const lowerBreakpoints: number[] = [LayoutBreakpoint.mobile, LayoutBreakpoint.mobileLarge, LayoutBreakpoint.tablet, LayoutBreakpoint.desktop, LayoutBreakpoint.wide];

export function isInvalidLayout(windowLayout: WindowLayout): boolean {
	// If height is too small, it's invalid.
	return windowLayout.heightBreakpoint === LayoutBreakpoint.mobile;
}