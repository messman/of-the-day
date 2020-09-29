import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { Heading2 } from '@/core/symbol/text';
import { decorate } from '@/test/decorate';
import { LayoutOrientation, useWindowLayout } from '@messman/react-common';
import { LayoutBreakpoint, isInvalidLayout } from './window-layout';

export default { title: 'Services/Layout/Window Layout' };

export const TestWindowLayout = decorate('Window Layout', null, () => {

	const windowLayout = useWindowLayout();
	let invalid: JSX.Element | null = null;
	if (isInvalidLayout(windowLayout)) {
		invalid = <Invalid>Invalid Layout</Invalid>;
	}

	return (
		<>
			<Heading2>{LayoutOrientation[windowLayout.orientation]}</Heading2>
			<Heading2>width - {LayoutBreakpoint[windowLayout.widthBreakpoint]} ({windowLayout.widthBreakpoint})</Heading2>
			<Heading2>height - {LayoutBreakpoint[windowLayout.heightBreakpoint]} ({windowLayout.heightBreakpoint})</Heading2>
			{invalid}
		</>
	);
});


const Invalid = tStyled(Heading2)`
	color: ${p => p.theme.color.warning};
`;