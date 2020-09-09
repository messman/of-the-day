import { useWindowLayout, DefaultLayoutBreakpoint } from '@messman/react-common';

export function useIsCompactWidth(): boolean {
	const windowLayout = useWindowLayout();
	return windowLayout.widthBreakpoint < DefaultLayoutBreakpoint.regular;
}