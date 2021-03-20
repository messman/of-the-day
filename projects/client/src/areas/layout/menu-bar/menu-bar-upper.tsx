import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { Flex, FlexColumn, FlexRow } from '@messman/react-common';
import { borderRadiusStyle } from '@/core/style/common';
import { MenuBarItems } from './menu-bar-items';
import { animated, useSpring } from 'react-spring';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { FontSize, Heading2 } from '@/core/symbol/text';
import { Spacing } from '@/core/layout/common';
import { FontWeight } from '@/core/style/theme';
import { isUsingFirefoxFingerprintProtection } from '@/services/feature';

export const upperMenuBarHeight = 50;
export const stickyMenuBarColorHeight = 8;
export const totalUpperStickyMenuBarHeight = upperMenuBarHeight + stickyMenuBarColorHeight;

// Used so that we have enough space to render our title.
const upperMenuCenterWidth = '360px';


export interface UpperMenuBarProps {
	isMobileWidth: boolean;
	onPathClick: () => void;
}

/**
 * The upper menu bar that shows between the header and the layout content.
 * Only shows on larger screens - but we show 'fake' content underneath 
 * to act as a margin and leave space for the the top 'sticky' menu bar appears,
 * so that the sticky menu bar doesn't cover up any real content.
 */
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

/**
 * The menu bar that only appears on large screens, after the user has scrolled past the always-showing upper menu bar.
 * 'sticky' because it is fixed to the top of the screen. Animates in from above. 
 */
export const UpperStickyMenuBar: React.FC<UpperStickyMenuBarProps> = (props) => {
	const { isShowing, isMobileWidth, isDesktopWidth, onScrollToTop, onPathClick } = props;

	// If firefox with the fingerprinting protection (which disables some JS APIs), we can't animate.
	const springProps = useSpring({ top: isShowing ? '0px' : `-${totalUpperStickyMenuBarHeight}px`, immediate: isUsingFirefoxFingerprintProtection });

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
	margin-left: ${Spacing.dog16};
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
	margin-right: ${Spacing.dog16};
`;