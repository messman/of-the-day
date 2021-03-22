import { WindowLayout } from '@messman/react-common';

// Customized breakpoints based on design.
export enum LayoutBreakpointRem {
	a0 = 0,
	/** 20rem = 320px. Absolute minimum we will support. iPhone 5 / SE. */
	b20Min = 20,
	/** 30rem = 480px. Past most mobile phones and into tablets. */
	c30 = 30,
	/** 40rem = 640px. Tablets. */
	d40 = 40,
	/** 50rem = 800px. Tablets. */
	e50 = 50,
	/** 60rem = 960px. Tablets. */
	f60 = 60,
	/** 70rem = 1120px. Tablets. */
	g70 = 70,
	/** 80rem = 1280px. Tablets. */
	h80Max = 80,
}
/** Maximum line length that we accept for paragraphs of text, in rem. */
export const lineBreakpoint = '40rem';

export const lowerBreakpoints: number[] = [
	LayoutBreakpointRem.a0,
	LayoutBreakpointRem.b20Min,
	LayoutBreakpointRem.c30,
	LayoutBreakpointRem.d40,
	LayoutBreakpointRem.e50,
	LayoutBreakpointRem.f60,
	LayoutBreakpointRem.g70,
	LayoutBreakpointRem.h80Max,
];

export function isInvalidLayout(windowLayout: WindowLayout): boolean {
	// If height is too small, it's invalid.
	// Remember that these breakpoints are the lower end of their range.
	return windowLayout.heightBreakpoint < LayoutBreakpointRem.b20Min;
}