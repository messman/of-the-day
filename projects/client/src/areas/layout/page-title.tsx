import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { FlexRow, useWindowLayout } from '@messman/react-common';
import { spacing, Spacing } from '@/core/layout/common';
import { ThemePickColor } from '@/core/style/theme';
import { tStyled } from '@/core/style/styled';
import { PageTitleScrollAnimation } from './page-title-animations';
import { TextAlign } from '@/core/style/common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';

const backgroundColor: ThemePickColor = c => c.backgroundA;

export const PageTitle: React.FC = () => {

	const { widthBreakpoint } = useWindowLayout();

	// Default to desktop.
	let paddingTop = spacing.grand.value;
	let paddingBottom = spacing.grand.value;
	if (widthBreakpoint <= LayoutBreakpoint.tablet) {
		paddingTop = spacing.large.value;
		paddingBottom = spacing.medium.value;
	}
	const padding = `${paddingTop} 0 ${paddingBottom} 0`;

	return (
		<Parent>
			<HeaderImg />
			<HeaderImgOverlay />
			<Spacing padding={padding}>
				<FlexRow justifyContent='center'>
					<TextAlign dataAlign='center'>
						<PageTitleScrollAnimation />
						<RegularText margin={spacing.small.top} color={backgroundColor}>daily sharing from Andrew</RegularText>
					</TextAlign>
				</FlexRow>
			</Spacing>
		</Parent>
	);
};

const Parent = tStyled.div`
	position: relative;
	background-color: ${p => p.theme.color.headerSpecialBackground};
`;

const headerImgDataUrl = require('@/static/images/header-background.png').default as string;

export const HeaderImg = tStyled.div`
	position: absolute;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	background-image: url(${headerImgDataUrl});
	background-position: center;
`;

export const HeaderImgOverlay = tStyled.div`
	position: absolute;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
 	background-image: radial-gradient(circle farthest-side at center, ${p => p.theme.color.headerSpecialBackground} 5%, transparent 50%);
`;