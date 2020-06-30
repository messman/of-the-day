import * as React from 'react';
import { decorate } from '@/test/storybook/decorate';
import { Subtitle } from '@/core/symbol/text';
import { styled } from '@/core/style/styled';
import { useLayoutInfo, LayoutBreakpoint, LayoutMode, isInvalidLayoutForApplication } from './layout-info';

export default { title: 'services/layout' };

export const TestResponsive = decorate(() => {

	const layoutInfo = useLayoutInfo();
	let invalidSubtitle: JSX.Element | null = null;
	if (isInvalidLayoutForApplication(layoutInfo)) {
		invalidSubtitle = <InvalidSubtitle>Invalid Layout</InvalidSubtitle>;
	}

	return (
		<>
			<Subtitle>{LayoutMode[layoutInfo.mode]}</Subtitle>
			<Subtitle>width - {LayoutBreakpoint[layoutInfo.widthBreakpoint]} ({layoutInfo.widthBreakpoint})</Subtitle>
			<Subtitle>height - {LayoutBreakpoint[layoutInfo.heightBreakpoint]} ({layoutInfo.heightBreakpoint})</Subtitle>
			{invalidSubtitle}
		</>
	);
});


const InvalidSubtitle = styled(Subtitle)`
	color: ${p => p.theme.color.warning};
`;