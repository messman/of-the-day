import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { Subtitle } from '@/core/symbol/text';
import { decorate } from '@/test/decorate';
import { LayoutOrientation, useWindowLayout } from '@messman/react-common';
import { LayoutBreakpoint, isInvalidLayout } from './window-layout';

export default { title: 'Services/Layout/Window Layout' };

export const TestWindowLayout = decorate('Window Layout', () => {

	const windowLayout = useWindowLayout();
	let invalidSubtitle: JSX.Element | null = null;
	if (isInvalidLayout(windowLayout)) {
		invalidSubtitle = <InvalidSubtitle>Invalid Layout</InvalidSubtitle>;
	}

	return (
		<>
			<Subtitle>{LayoutOrientation[windowLayout.orientation]}</Subtitle>
			<Subtitle>width - {LayoutBreakpoint[windowLayout.widthBreakpoint]} ({windowLayout.widthBreakpoint})</Subtitle>
			<Subtitle>height - {LayoutBreakpoint[windowLayout.heightBreakpoint]} ({windowLayout.heightBreakpoint})</Subtitle>
			{invalidSubtitle}
		</>
	);
});


const InvalidSubtitle = tStyled(Subtitle)`
	color: ${p => p.theme.color.warning};
`;