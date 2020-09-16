import * as React from 'react';
import { GrandTitle, RegularText } from '@/core/symbol/text';
import { FlexRow, Flex } from '@messman/react-common';
import { ApplicationMaxWidth, spacing } from '@/core/layout/common';
import { ThemePickColor } from '@/core/style/theme';
import { tStyled } from '@/core/style/styled';
import { PageTitleScrollAnimation } from './page-title-animations';
import { TextAlign } from '@/core/style/common';

export interface PageTitleProps {
	isCompact: boolean;
}

const backgroundColor: ThemePickColor = c => c.backgroundA;

export const PageTitle: React.FC<PageTitleProps> = () => {
	return (
		<Parent>
			<HeaderImg />
			<HeaderImgOverlay />
			<PageTitleBackground>
				<ApplicationMaxWidth>
					<FlexRow justifyContent='space-between' alignItems='center'>
						<Flex />
						<TextAlign dataAlign='center'>
							<FlexRow>
								<SideContainer flex='none' justifyContent='flex-end'>
									<PageTitleScrollAnimation />
								</SideContainer>
								<Flex>
									<GrandTitle color={backgroundColor}>
										Of The Day
									</GrandTitle>
								</Flex>
							</FlexRow>
							<RegularText margin={spacing.small.top} color={backgroundColor}>daily sharing from Andrew</RegularText>
						</TextAlign>
						<Flex />
					</FlexRow>
				</ApplicationMaxWidth>
			</PageTitleBackground>
		</Parent>
	);
};

const Parent = tStyled.div`
	position: relative;
	background-color: ${p => p.theme.color.headerSpecialBackground};
`;

const PageTitleBackground = tStyled.div`
	position: relative;
	padding: ${spacing.grand.vertical};
`;

const SideContainer = tStyled(FlexRow)`
	width: 0;
	overflow: visible;
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
 	background-image: radial-gradient(circle farthest-side at center, rgba(98,190,193,0.85) 5%, rgba(98,190,193,0.19) 30%);
`;