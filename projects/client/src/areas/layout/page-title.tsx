import * as React from 'react';
import { GrandTitle, Subtitle } from '@/core/symbol/text';
import { FlexRow, Flex } from '@messman/react-common';
import { spacing, Center } from '@/core/style/common';
import { ApplicationMaxWidth } from '@/core/layout/common';
import { ThemePickColor } from '@/core/style/theme';
import { iconTypes } from '@/core/symbol/icon';
import { styled } from '@/core/style/styled';
import { PageTitleScrollAnimation, IconScrollAnimation, IconAnimationDefinitions } from './page-title-animations';

export interface PageTitleProps {
	isCompact: boolean;
}

const backgroundColor: ThemePickColor = c => c.backgroundA;

const leftIconsInitialDelayFactor = 0;
const leftIcons: IconAnimationDefinitions = {
	calendar: [iconTypes.calendar, [-10, 10]],
	video: [iconTypes.video, [-10, 10]],
	thought: [iconTypes.thought, [-7, -3, 3]]
};

const rightIconsInitialDelayFactor = .5;
const rightIcons: IconAnimationDefinitions = {
	music: [iconTypes.music, [-10, -7, 7, 10]],
	quote: [iconTypes.quote, [-20, -15, 15, 20]],
	image: [iconTypes.image, [-13, -8, 8, 13]]
};

export const PageTitle: React.FC<PageTitleProps> = () => {
	return (
		<PageTitleBackground>
			<ApplicationMaxWidth>
				<FlexRow justifyContent='space-between' alignItems='center'>
					<IconScrollAnimation icons={leftIcons} delayFactor={leftIconsInitialDelayFactor} />
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
						<Subtitle margin={spacing.medium.top} dataColor={backgroundColor}>Daily sharing from Andrew.</Subtitle>
					</Center>
					<IconScrollAnimation icons={rightIcons} delayFactor={rightIconsInitialDelayFactor} />
				</FlexRow>
			</ApplicationMaxWidth>
		</PageTitleBackground>
	);
};

const PageTitleBackground = styled.div`
	padding-top: ${spacing.grand.value};
	padding-bottom: ${spacing.large.value};
	background: ${p => p.theme.color.primaryA};
`;

const SideContainer = styled(FlexRow)`
	width: 0;
	overflow: visible;
`;