import * as React from 'react';
import { keyframes, tCss, ThemedCSS, tStyled } from '@/core/style/styled';
import { Flex, FlexColumn, FlexRow } from '@messman/react-common';
import { borderRadiusStyle } from '@/core/style/common';
import { MenuBarItems } from './menu-bar-items';
import { IconSize, iconTypes, SizedIcon } from '@/core/symbol/icon';
import { Heading2 } from '@/core/symbol/text';
import { Spacing } from '@/core/layout/common';
import { FontWeight } from '@/core/style/theme';

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
	width: ${upperMenuCenterWidth};
	height: ${upperMenuBarHeight}px;
	${borderRadiusStyle}
	border: 1px solid ${p => p.theme.outlineDistinct};
	background-color: ${p => p.theme.subtleFill.d3Nav};
	box-shadow: ${p => p.theme.shadow.d3Nav};
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

	const animationState = useTransition(isShowing, isShowing ? AnimationState.opened : AnimationState.closed);

	const topLeftTitle = isDesktopWidth ? (
		<UpperMenuStickyTitleClickContainer onClick={onScrollToTop}>
			<SpacedBrandIcon type={iconTypes.brand} size={IconSize.b_large} />
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
		<UpperStickyMenuBarAbsolute animationState={animationState}>
			<UpperStickyMenuBarColor onClick={onScrollToTop} />
			{stickyContent}
		</UpperStickyMenuBarAbsolute>
	);
};

const openingClosingAnimationTime = 1000;
const menuBarOpeningAnimation = keyframes`
	from {
		top: -${totalUpperStickyMenuBarHeight}px;
	}
	to {
		top: 0px;
	}
`;

const menuBarClosingAnimation = keyframes`
	from {
		top: 0px;
	}
	to {
		top: -${totalUpperStickyMenuBarHeight}px;
	}
`;

enum AnimationState {
	closed,
	opening,
	opened,
	closing
}

const animationStateStyles: Record<keyof typeof AnimationState, ThemedCSS> = {
	closed: tCss`
		top: -${totalUpperStickyMenuBarHeight}px;
	`,
	opening: tCss`
		animation: ${menuBarOpeningAnimation} ${openingClosingAnimationTime / 1000}s forwards ease-out;
	`,
	opened: tCss`
		top: 0px;
	`,
	closing: tCss`
		animation: ${menuBarClosingAnimation} ${openingClosingAnimationTime / 1000}s forwards ease-out;
	`
};

// Problem with how this runs: you can't reverse an animation halfway.
// So if the user jiggles quickly between the states, the animation will jump to the beginning again.
function useTransition(currentValue: boolean, defaultAnimationState: AnimationState): AnimationState {
	const isAnimatingRef = React.useRef(false);
	const [state, setState] = React.useState(() => {
		return {
			lastValue: currentValue,
			animationState: defaultAnimationState
		};
	});
	const { lastValue, animationState } = state;

	let newAnimationState = animationState;
	if (currentValue !== lastValue || isAnimatingRef.current) {
		newAnimationState = currentValue ? AnimationState.opening : AnimationState.closing;
	}

	React.useEffect(() => {
		/*
			currentValue
			lastValue
			currentState

			if value is equal, change nothing.

		*/
		let timeoutId = -1;
		if (newAnimationState === AnimationState.opened || newAnimationState === AnimationState.closed) {
			return;
		}
		timeoutId = window.setTimeout(() => {
			isAnimatingRef.current = false;
			setState({
				lastValue: currentValue,
				animationState: currentValue ? AnimationState.opened : AnimationState.closed
			});
		}, openingClosingAnimationTime);
		isAnimatingRef.current = true;

		return () => {
			isAnimatingRef.current = false;
			window.clearTimeout(timeoutId);
		};
	}, [currentValue, newAnimationState]);

	return newAnimationState;
}

/**
 * Div that will get animations applied for opacity and/or position.
 */

interface UpperStickyMenuBarAbsoluteProps {
	animationState: AnimationState;
}

const UpperStickyMenuBarAbsolute = tStyled.div<UpperStickyMenuBarAbsoluteProps>`
	position: absolute;
	width: 100%;
	z-index: 2;
	${p => animationStateStyles[AnimationState[p.animationState] as keyof typeof AnimationState]}
`;

const UpperStickyMenuBarColor = tStyled.div`
	height: ${stickyMenuBarColorHeight}px;
	background: ${p => p.theme.accent.gradient};
	cursor: pointer;
`;

const UpperStickyMenuBarCenter = tStyled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	height: ${upperMenuBarHeight}px;
	width: 100%;
	background-color: ${p => p.theme.subtleFill.d3Nav};
	border-bottom: 1px solid ${p => p.theme.outlineDistinct};
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
	font-weight: ${FontWeight.medium};
`;

const SpacedTitle = tStyled(Heading2)`
	display: inline-block;
`;

const SpacedBrandIcon = tStyled(SizedIcon)`
	margin-right: ${Spacing.dog16};
`;