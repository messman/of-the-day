import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { Flex, FlexColumn, FlexRow } from '@messman/react-common';
import { borderRadiusStyle } from '@/core/style/common';
import { MenuBarItems } from './menu-bar-items';
import { animated, useSpring } from 'react-spring';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { FontSize, Heading2 } from '@/core/symbol/text';
import { spacing } from '@/core/layout/common';
import { FontWeight } from '@/core/style/theme';

export const upperMenuBarHeight = 50;
export const stickyMenuBarColorHeight = 8;
export const totalUpperStickyMenuBarHeight = upperMenuBarHeight + stickyMenuBarColorHeight;

// Used so that we have enough space to render our title.
const upperMenuCenterWidth = '500px';


export interface UpperMenuBarProps {
	isMobileWidth: boolean;
	onPathClick: () => void;
}

export const UpperMenuBar: React.FC<UpperMenuBarProps> = (props) => {
	const { isMobileWidth, onPathClick } = props;
	if (isMobileWidth) {
		return (
			<FakeStickyMenuBarColor />
		);
	}

	// Add in the upper menu bar content (links, etc)
	// Note that in the upper menu bar, height of the container is set explicitly. We don't need padding.
	return (
		<>
			<UpperMenuBarCenter flex='none' justifyContent='center' alignItems='center'>
				<UpperMenuBarContainer flex='none'>
					<MenuBarItems isUpper={true} onPathClick={onPathClick} />
				</UpperMenuBarContainer>
			</UpperMenuBarCenter>
			<FakeStickyMenuBarColor />
			<FakeUpperMenuBar />
		</>
	);
};

const FakeStickyMenuBarColor = tStyled.div`
	height: ${stickyMenuBarColorHeight}px;
`;

const FakeUpperMenuBar = tStyled.div`
	height: ${upperMenuBarHeight}px;
`;

const UpperMenuBarCenter = tStyled(FlexColumn)`
	position: relative;
	height: 0;
	overflow: visible;
	z-index: 1;
`;

const UpperMenuBarContainer = tStyled(FlexRow)`
	position: relative;
	background-color: ${p => p.theme.color.bgComponent1};
	width: ${upperMenuCenterWidth};
	height: ${upperMenuBarHeight}px;
	${borderRadiusStyle}
	border: 1px solid ${p => p.theme.color.bgComponent3};
	box-shadow: 0 3px 6px 0 ${p => p.theme.color.bgComponentShadow1};
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

	const springProps = useSpring({ top: isShowing ? '0px' : `-${totalUpperStickyMenuBarHeight}px` });

	const topLeftTitle = isDesktopWidth ? (
		<UpperMenuStickyTitleClickContainer onClick={onScrollToTop}>
			<SpacedBrandIcon type={iconTypes.brand} height={FontSize.heading2} fillColor={c => c.textHeading1} />
			<SpacedTitle>Of The Day</SpacedTitle>
		</UpperMenuStickyTitleClickContainer>
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
	height: ${stickyMenuBarColorHeight}px;
	background: ${p => p.theme.color.accentGradient};
	cursor: pointer;
`;

const UpperStickyMenuBarCenter = tStyled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	height: ${upperMenuBarHeight}px;
	width: 100%;
	background-color: ${p => p.theme.color.bg1};
	border-bottom: 1px solid ${p => p.theme.color.bgComponent3};
`;

const UpperStickyMenuBarContainer = tStyled(FlexRow)`
	width: ${upperMenuCenterWidth};
`;

const UpperMenuStickyTitleClickContainer = tStyled.div`
	height: 100%;
	margin-left: ${spacing.medium.value};
	display: inline-flex;
	flex-direction: row;
	justify-content: left;
	align-items: center;
	cursor: pointer;
	font-weight: ${FontWeight.bold};
`;

const SpacedTitle = tStyled(Heading2)`
	display: inline-block;
`;

const SpacedBrandIcon = tStyled(Icon)`
	margin: ${spacing.small.right};
`;