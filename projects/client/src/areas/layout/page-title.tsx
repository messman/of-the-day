import * as React from 'react';
import { GrandTitle, Subtitle } from '@/core/symbol/text';
import { FlexRow, Flex } from '@messman/react-common';
import { spacing, Center } from '@/core/style/common';
import { ApplicationMaxWidth } from '@/core/layout/common';
import { ThemePickColor } from '@/core/style/theme';
import { styled } from '@/core/style/styled';
import { PageTitleScrollAnimation } from './page-title-animations';

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
						<Center>
							<FlexRow>
								<SideContainer flex='none' justifyContent='flex-end'>
									<PageTitleScrollAnimation />
								</SideContainer>
								<Flex>
									<GrandTitle dataColor={backgroundColor} isBold={true}>
										Of The Day
									</GrandTitle>
								</Flex>
							</FlexRow>
							<Subtitle margin={spacing.small.top} dataColor={backgroundColor}>daily sharing from Andrew</Subtitle>
						</Center>
						<Flex />
					</FlexRow>
				</ApplicationMaxWidth>
			</PageTitleBackground>
		</Parent>
	);
};

const Parent = styled.div`
	position: relative;
	background-color: ${p => p.theme.color.primaryA};
`;

const PageTitleBackground = styled.div`
	position: relative;
	padding-top: ${spacing.grand.value};
	padding-bottom: ${spacing.large.value};
`;

const SideContainer = styled(FlexRow)`
	width: 0;
	overflow: visible;
`;

const headerImgDataUrl = require('@/static/images/header-background.png').default as string;

export const HeaderImg = styled.div`
	position: absolute;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	background-image: url(${headerImgDataUrl});
	background-position: center;
`;

export const HeaderImgOverlay = styled.div`
	position: absolute;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
 	background-image: radial-gradient(circle farthest-side at center, rgba(98,190,193,0.85) 5%, rgba(98,190,193,0.19) 30%);
`;