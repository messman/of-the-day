import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { Subtitle } from '@/core/symbol/text';
import { decorate } from '@/test/decorate';
import { DefaultLayoutBreakpoint, LayoutOrientation, useWindowLayout } from '@messman/react-common';

export default { title: 'Services/Layout/Window Layout' };

export const TestWindowLayout = decorate('Window Layout', () => {

	const windowLayout = useWindowLayout();
	let invalidSubtitle: JSX.Element | null = null;
	if (windowLayout.heightBreakpoint < DefaultLayoutBreakpoint.regular) {
		invalidSubtitle = <InvalidSubtitle>Invalid Layout</InvalidSubtitle>;
	}

	return (
		<>
			<Subtitle>{LayoutOrientation[windowLayout.orientation]}</Subtitle>
			<Subtitle>width - {DefaultLayoutBreakpoint[windowLayout.widthBreakpoint]} ({windowLayout.widthBreakpoint})</Subtitle>
			<Subtitle>height - {DefaultLayoutBreakpoint[windowLayout.heightBreakpoint]} ({windowLayout.heightBreakpoint})</Subtitle>
			{invalidSubtitle}
		</>
	);
});


const InvalidSubtitle = tStyled(Subtitle)`
	color: ${p => p.theme.color.warning};
`;