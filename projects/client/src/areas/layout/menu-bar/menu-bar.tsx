import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { FlexColumn, FlexRow, Sticky, useSticky } from '@messman/react-common';
import { borderRadiusStyle } from '@/core/style/common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { MenuBarItems } from './menu-bar-items';
import { useSpring, animated } from 'react-spring';

/** Use an explicit pixel height for the upper menu bar to be used for sticky. */
export const upperMenuBarHeightPixels = 50;

export interface MenuBarProps {
	isUpper: boolean;
	rootRef?: React.RefObject<any>;
}

export const MenuBar: React.FC<MenuBarProps> = (props) => {
	if (props.isUpper) {
		return <UpperMenuBar {...props} />;
	}
	return <LowerMenuBar {...props} />;
};

const UpperMenuBar: React.FC<MenuBarProps> = (props) => {

	// Note that in the upper menu bar, height of the container is set explicitly. We don't need padding.
	return (
		<>
			<UpperMenuBarCenter flex='none' justifyContent='center' alignItems='center'>
				<UpperMenuBarContainer {...props} flex='none'>
					<MenuBarItems isUpper={true} />
				</UpperMenuBarContainer>
			</UpperMenuBarCenter>
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

const UpperMenuBarContainer = tStyled(FlexRow) <MenuBarProps>`
	position: relative;
	background-color: ${p => p.theme.color.backgroundB};
	width: ${LayoutBreakpoint.mobileLarge}px;
	height: ${upperMenuBarHeightPixels}px;
	${borderRadiusStyle}
	overflow: hidden;
`;

const UpperStickyMenuBar: React.FC<MenuBarProps> = (props) => {
	const { rootRef } = props;

	const stickyOutput = useSticky({
		rootRef: rootRef
	});
	const { isAtFirst } = stickyOutput;

	const springProps = useSpring({ opacity: isAtFirst ? 1 : 0, top: isAtFirst ? '0px' : `-${upperMenuBarHeightPixels}px` });

	const variableContent = (
		<UpperStickyMenuBarRelative>
			<UpperStickyMenuBarCenter style={springProps}>
				<UpperStickyMenuBarContainer flex='none'>
					<MenuBarItems isUpper={true} />
				</UpperStickyMenuBarContainer>
			</UpperStickyMenuBarCenter>
		</UpperStickyMenuBarRelative>
	);

	return (
		<Sticky isSticky={true} output={stickyOutput} zIndex={1} variableContent={variableContent} />
	);
};

const UpperStickyMenuBarRelative = tStyled.div`
	position: relative;
`;

const UpperStickyMenuBarCenter = tStyled(animated.div)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	width: 100%;
	z-index: 1;
	background-color: ${p => p.theme.color.backgroundA};
	border-bottom: 1px solid ${p => p.theme.color.backgroundC};
	height: ${upperMenuBarHeightPixels}px;
`;

const UpperStickyMenuBarContainer = tStyled(FlexRow) <MenuBarProps>`
	width: ${LayoutBreakpoint.mobileLarge}px;
`;

const LowerMenuBar: React.FC<MenuBarProps> = () => {
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