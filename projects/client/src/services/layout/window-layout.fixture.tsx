import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { Heading2 } from '@/core/symbol/text';
import { wrap } from '@/test/decorate';
import { LayoutOrientation, useWindowMediaLayout } from '@messman/react-common';
import { LayoutBreakpointRem, isInvalidLayout } from './window-layout';

export default wrap(null, () => {

	const windowLayout = useWindowMediaLayout();
	let invalid: JSX.Element | null = null;
	if (isInvalidLayout(windowLayout)) {
		invalid = <Invalid>Invalid Layout</Invalid>;
	}

	return (
		<>
			<Heading2>{LayoutOrientation[windowLayout.orientation]}</Heading2>
			<Heading2>width - {LayoutBreakpointRem[windowLayout.widthBreakpoint]} ({windowLayout.widthBreakpoint}rem)</Heading2>
			<Heading2>height - {LayoutBreakpointRem[windowLayout.heightBreakpoint]} ({windowLayout.heightBreakpoint}rem)</Heading2>
			{invalid}
		</>
	);
});


const Invalid = tStyled(Heading2)`
	color: ${p => p.theme.system.warning};
`;