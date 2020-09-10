import { useWindowLayout, WindowLayout } from '@messman/react-common';

// Customized breakpoints based on design.
export enum LayoutBreakpoint {
	mobile = 0,
	tablet = 500,
	desktop = 900,
	wide = 1400,
}
export const lowerBreakpoints: number[] = [LayoutBreakpoint.mobile, LayoutBreakpoint.tablet, LayoutBreakpoint.desktop, LayoutBreakpoint.wide];

export function isInvalidLayout(windowLayout: WindowLayout): boolean {
	// If height is too small, it's invalid.
	return windowLayout.heightBreakpoint < LayoutBreakpoint.tablet;
}

export function useIsMobileWidth(): boolean {
	const windowLayout = useWindowLayout();
	return windowLayout.widthBreakpoint === LayoutBreakpoint.mobile;
}