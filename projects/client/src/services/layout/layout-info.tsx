import * as React from 'react';
import { useWindowDimensions, WindowDimensions } from './window-dimensions';

export enum LayoutBreakpoint {
	compact = 0,
	regular = 500,
	wide = 1200
}
export const defaultLowerBreakpoints: number[] = [LayoutBreakpoint.compact, LayoutBreakpoint.regular, LayoutBreakpoint.wide];

export enum LayoutMode {
	landscape,
	portrait,
	square
}

export interface LayoutInfo {
	widthBreakpoint: number,
	heightBreakpoint: number,
	mode: LayoutMode;
}

export function isInvalidLayoutForApplication(layout: LayoutInfo): boolean {
	return layout.heightBreakpoint < LayoutBreakpoint.regular;
}

function getLayout(dimensions: WindowDimensions, lowerBreakpoints: number[]): LayoutInfo {

	const lowest = lowerBreakpoints[0];
	let newWidthBreakpoint = lowest;
	let newHeightBreakpoint = lowest;
	// Loop through breakpoints from largest to smallest looking for the largest match
	for (let i = lowerBreakpoints.length - 1; i >= 0; i--) {
		const breakpoint = lowerBreakpoints[i];
		if (newWidthBreakpoint === lowest && dimensions.width > breakpoint) {
			newWidthBreakpoint = breakpoint;
		}
		if (newHeightBreakpoint === lowest && dimensions.height > breakpoint) {
			newHeightBreakpoint = breakpoint;
		}
	}

	const newMode = dimensions.width > dimensions.height ? LayoutMode.landscape : (dimensions.height > dimensions.width ? LayoutMode.portrait : LayoutMode.square);

	return {
		widthBreakpoint: newWidthBreakpoint,
		heightBreakpoint: newHeightBreakpoint,
		mode: newMode
	};
}

const LayoutInfoContext = React.createContext<LayoutInfo>(null!);
export const useLayoutInfo = () => React.useContext(LayoutInfoContext);

export interface LayoutInfoProviderProps {
	lowerBreakpoints: number[];
}

export const LayoutInfoProvider: React.FC<LayoutInfoProviderProps> = (props) => {

	const dimensions = useWindowDimensions();
	const [layout, setLayout] = React.useState<LayoutInfo>(() => {
		return getLayout(dimensions, props.lowerBreakpoints);
	});

	React.useEffect(() => {
		const newLayout = getLayout(dimensions, props.lowerBreakpoints);
		if (newLayout.widthBreakpoint !== layout.widthBreakpoint || newLayout.heightBreakpoint !== layout.heightBreakpoint || newLayout.mode !== layout.mode) {
			setLayout(newLayout);
		}
	}, [dimensions.width, dimensions.height]);

	return (
		<LayoutInfoContext.Provider value={layout}>
			{props.children}
		</LayoutInfoContext.Provider>
	);
};