import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { Flex, FlexColumn, FlexRow, Sticky, useSticky } from '@messman/react-common';
import { borderRadiusStyle } from '@/core/style/common';
import { MenuBarItems } from './menu-bar-items';
import { useSpring, animated } from 'react-spring';
import { spacing } from '@/core/layout/common';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { fontWeights } from '@/core/style/theme';

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

export interface UpperMenuBarProps {
	isMobileWidth: boolean;
	isDesktopWidth: boolean;
	rootElement: HTMLElement | null;
}

export const UpperMenuBar: React.FC<UpperMenuBarProps> = (props) => {

	const { isMobileWidth } = props;

	let upperMenuBarContent: JSX.Element | null = null;
	if (!isMobileWidth) {
		// Add in the upper menu bar content (links, etc)
		upperMenuBarContent = (
			<UpperMenuBarCenter flex='none' justifyContent='center' alignItems='center'>
				<UpperMenuBarContainer {...props} flex='none'>
					<MenuBarItems isUpper={true} />
				</UpperMenuBarContainer>
			</UpperMenuBarCenter>
		);
	}

	// Note that in the upper menu bar, height of the container is set explicitly. We don't need padding.
	return (
		<>
			{upperMenuBarContent}
			<UpperStickyMenuBar {...props} />
		</>
	);
};

const UpperMenuBarCenter = tStyled(FlexColumn)`
	position: relative;
	height: 0;
	overflow: visible;
	z-index: 1;
`;

const UpperMenuBarContainer = tStyled(FlexRow) <UpperMenuBarProps>`
	position: relative;
	background-color: ${p => p.theme.color.backgroundB};
	width: ${upperMenuBarMaxWidth};
	height: ${upperMenuBarContentHeightPixels}px;
	${borderRadiusStyle}
	overflow: hidden;
`;


const UpperStickyMenuBar: React.FC<UpperMenuBarProps> = (props) => {
	const { rootElement, isMobileWidth, isDesktopWidth } = props;

	const stickyOutput = useSticky({
		rootElement: rootElement,
		secondPixels: upperMenuBarHeightPixels.total
	});
	const { isAtFirst, isAtSecond } = stickyOutput;

	const springProps = useSpring({ top: isAtSecond ? '0px' : `-${upperMenuBarHeightPixels.total}px` });

	let variableContent: JSX.Element | null = null;
	if (isAtFirst) {

		const topLeftTitle = isDesktopWidth ? (
			<UpperMenuStickyTitleContainer alignItems='center'>
				<Icon type={iconTypes.brand} height={upperMenuBarTitleHeight} fillColor={c => c.textRegular} />
				<UpperMenuStickyTitle>
					Of The Day
						</UpperMenuStickyTitle>
			</UpperMenuStickyTitleContainer>
		) : null;

		// Create the content for when the bar is sticky.
		const stickyContent = !isMobileWidth ? (
			<UpperStickyMenuBarCenter>
				<Flex>
					{topLeftTitle}
				</Flex>
				<UpperStickyMenuBarContainer flex='none'>
					<MenuBarItems isUpper={true} />
				</UpperStickyMenuBarContainer>
				<Flex />
			</UpperStickyMenuBarCenter>
		) : null;

		variableContent = (
			<UpperStickyMenuBarRelative>
				<UpperStickyMenuBarAbsolute style={springProps}>
					<UpperStickyMenuBarColor />
					{stickyContent}
				</UpperStickyMenuBarAbsolute>
			</UpperStickyMenuBarRelative>
		);
	}

	return (
		<Sticky isSticky={false} output={stickyOutput} zIndex={1} variableContent={variableContent} />
	);
};

/**
 * Container for all the sticky content.
 * No overflow so that absolute transitions won't show above the container.
 * Also no cursor so that clicks can go straight through.
*/
const UpperStickyMenuBarRelative = tStyled.div`
	position: relative;
	width: 100%;
	height: ${upperMenuBarHeightPixels.total}px;
	overflow: hidden;
	pointer-events: none;
`;

/**
 * Div that will get animations applied for opacity and/or position.
 */
const UpperStickyMenuBarAbsolute = tStyled(animated.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	pointer-events: initial;
	z-index: 1;
`;

const UpperStickyMenuBarColor = tStyled.div`
	height: ${upperMenuBarHeightPixels.color}px;
	background-color: ${p => p.theme.color.primary};
`;

const UpperStickyMenuBarCenter = tStyled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	height: ${upperMenuBarContentHeightPixels}px;
	width: 100%;
	background-color: ${p => p.theme.color.backgroundA};
	border-bottom: 1px solid ${p => p.theme.color.backgroundC};
`;

const UpperStickyMenuBarContainer = tStyled(FlexRow) <UpperMenuBarProps>`
	width: ${upperMenuBarMaxWidth};
`;

const UpperMenuStickyTitleContainer = tStyled(FlexRow)`
	height: 100%;
	margin-left: ${spacing.medium.value};
`;

const UpperMenuStickyTitle = tStyled.div`
	display: inline-block;
	font-size: ${upperMenuBarTitleHeight};
	font-weight: ${fontWeights.bold};
	color: ${p => p.theme.color.textRegular};
	padding-left: ${spacing.nudge.value};
`;

export interface LowerMenuBarProps {
	isMobileWidth: boolean;
}

export const LowerMenuBar: React.FC<LowerMenuBarProps> = (props) => {
	const { isMobileWidth } = props;

	if (!isMobileWidth) {
		return null;
	}

	return (
		<LowerMenuBarContainer flex='none'>
			<MenuBarItems isUpper={false} />
		</LowerMenuBarContainer>
	);
};

const LowerMenuBarContainer = tStyled(FlexRow)`
	position: relative;
	background-color: ${p => p.theme.color.backgroundB};
`;