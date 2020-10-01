import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { Flex, FlexColumn, FlexRow } from '@messman/react-common';
import { borderRadiusStyle } from '@/core/style/common';
import { MenuBarItems } from './menu-bar-items';
import { useSpring, animated } from 'react-spring';
import { spacing } from '@/core/layout/common';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { FreeText } from '@/core/symbol/text';
import { FontWeight } from '@/core/style/theme';

/** Use an explicit pixel height for the upper menu bar to be used for sticky. */
const upperMenuBarContentHeightPixels = 50;
const upperMenuBarColorHeightPixels = 8;
export const upperMenuBarHeightPixels = {
	content: upperMenuBarContentHeightPixels,
	color: upperMenuBarColorHeightPixels,
	total: upperMenuBarContentHeightPixels + upperMenuBarColorHeightPixels
};

const upperMenuBarTitleHeight = '25px';
const upperMenuBarMaxWidth = '500px';

export interface UpperLowerMenuBarProps {
	isMobileWidth: boolean;
	onPathClick: () => void;
}

export const UpperMenuBar: React.FC<UpperLowerMenuBarProps> = (props) => {
	const { isMobileWidth, onPathClick } = props;
	if (isMobileWidth) {
		return null;
	}

	// Add in the upper menu bar content (links, etc)
	// Note that in the upper menu bar, height of the container is set explicitly. We don't need padding.
	return (
		<UpperMenuBarCenter flex='none' justifyContent='center' alignItems='center'>
			<UpperMenuBarContainer flex='none'>
				<MenuBarItems isUpper={true} onPathClick={onPathClick} />
			</UpperMenuBarContainer>
		</UpperMenuBarCenter>
	);
};

const UpperMenuBarCenter = tStyled(FlexColumn)`
	position: relative;
	height: 0;
	overflow: visible;
	z-index: 1;
	margin-bottom: calc(${upperMenuBarHeightPixels.content}px / 2);
`;

const UpperMenuBarContainer = tStyled(FlexRow)`
	position: relative;
	background-color: ${p => p.theme.color.bgComponent2};
	width: ${upperMenuBarMaxWidth};
	height: ${upperMenuBarContentHeightPixels}px;
	${borderRadiusStyle}
	border: 1px solid ${p => p.theme.color.bgComponent3};
	box-shadow: 0 2px 6px 0 ${p => p.theme.color.bgComponentShadow1};
	overflow: hidden;
`;

export interface UpperStickyMenuBarProps {
	isMobileWidth: boolean;
	isDesktopWidth: boolean;
	isShowing: boolean;
	onScrollToTop: () => void;
	onPathClick: () => void;
}

export const UpperStickyMenuBar: React.FC<UpperStickyMenuBarProps> = (props) => {
	const { isShowing, isMobileWidth, isDesktopWidth, onScrollToTop, onPathClick } = props;

	const springProps = useSpring({ top: isShowing ? '0px' : `-${upperMenuBarHeightPixels.total}px` });

	const topLeftTitle = isDesktopWidth ? (
		<UpperMenuStickyTitleContainer alignItems='center'>
			<UpperMenuStickyTitleClickContainer onClick={onScrollToTop}>
				<FreeText isInline={true} fontSize={upperMenuBarTitleHeight} fontWeight={FontWeight.bold} color={c => c.textRegular}>
					<SpacedIcon type={iconTypes.brand} height={upperMenuBarTitleHeight} fillColor={c => c.textRegular} />
					Of The Day
				</FreeText>
			</UpperMenuStickyTitleClickContainer>
		</UpperMenuStickyTitleContainer>
	) : null;

	// Create the content for when the bar is sticky.
	const stickyContent = !isMobileWidth ? (
		<UpperStickyMenuBarCenter>
			<Flex>
				{topLeftTitle}
			</Flex>
			<UpperStickyMenuBarContainer flex='none'>
				<MenuBarItems isUpper={true} onPathClick={onPathClick} />
			</UpperStickyMenuBarContainer>
			<Flex />
		</UpperStickyMenuBarCenter>
	) : null;

	return (
		<UpperStickyMenuBarAbsolute style={springProps}>
			<UpperStickyMenuBarColor onClick={onScrollToTop} />
			{stickyContent}
		</UpperStickyMenuBarAbsolute>
	);
};

/**
 * Div that will get animations applied for opacity and/or position.
 */
const UpperStickyMenuBarAbsolute = tStyled(animated.div)`
	position: absolute;
	width: 100%;
	z-index: 2;
`;

const UpperStickyMenuBarColor = tStyled.div`
	height: ${upperMenuBarHeightPixels.color}px;
	background: ${p => p.theme.color.accentGradient};
	cursor: pointer;
`;

const UpperStickyMenuBarCenter = tStyled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	height: ${upperMenuBarContentHeightPixels}px;
	width: 100%;
	background-color: ${p => p.theme.color.bg1};
	border-bottom: 1px solid ${p => p.theme.color.bgComponent3};
`;

const UpperStickyMenuBarContainer = tStyled(FlexRow)`
	width: ${upperMenuBarMaxWidth};
`;

const UpperMenuStickyTitleContainer = tStyled(FlexRow)`
	height: 100%;
	margin-left: ${spacing.medium.value};
`;

const UpperMenuStickyTitleClickContainer = tStyled.div`
	cursor: pointer;
`;

const SpacedIcon = tStyled(Icon)`
	margin: ${spacing.nudge.right};
`;

export const LowerMenuBar: React.FC<UpperLowerMenuBarProps> = (props) => {
	const { isMobileWidth, onPathClick } = props;

	if (!isMobileWidth) {
		return null;
	}

	return (
		<LowerMenuBarContainer flex='none'>
			<MenuBarItems isUpper={false} onPathClick={onPathClick} />
		</LowerMenuBarContainer>
	);
};

const LowerMenuBarContainer = tStyled(FlexRow)`
	position: relative;
	background-color: ${p => p.theme.color.bg2};
`;