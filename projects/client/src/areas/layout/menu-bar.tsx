import * as React from 'react';
import { tStyled, tCss } from '@/core/style/styled';
import { routes } from '@/services/nav/routing';
import { RegularText } from '@/core/symbol/text';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { FlexRow, Sticky, useSticky } from '@messman/react-common';
import { spacing } from '@/core/layout/common';

/** Use an explicit pixel height for the upper menu bar to be used for sticky. */
export const upperMenuBarHeightPixels = 64;

export interface MenuBarProps {
	isUpper: boolean;
	rootRef?: React.RefObject<any>;
	isDisabled?: boolean;
}

export const MenuBar: React.FC<MenuBarProps> = (props) => {
	const { rootRef } = props;

	const history = useHistory();
	const location = useLocation();

	const stickyOutput = useSticky({
		rootRef: rootRef
	});

	const menuBarItems = Object.keys(routes).map((key) => {
		const route = routes[key as keyof typeof routes];

		const isActive = !!matchPath(location.pathname, {
			path: route.path,
			exact: route === routes.posts // home
		});

		function onClick() {
			history.push(route.path);
		}

		return <MenuBarItem
			key={route.name}
			title={route.name}
			isDisabled={props.isDisabled || false}
			isUpper={props.isUpper}
			isActive={isActive}
			onClick={onClick}
		/>;
	});

	return (
		<Sticky isSticky={true} output={stickyOutput} zIndex={1} >
			<MenuBarContainer {...props} flex='none' justifyContent='center'>
				{menuBarItems}
			</MenuBarContainer>
		</Sticky>
	);
};

const MenuBarContainer = tStyled(FlexRow) <MenuBarProps>`
	position: relative;
	background-color: ${p => p.isUpper ? p.theme.color.backgroundA : p.theme.color.backgroundB};
	${p => p.isUpper && tCss`
		height: ${upperMenuBarHeightPixels}px;
	`}
`;

export interface MenuBarItemProps {
	title: string;
	isUpper: boolean;
	isDisabled: boolean;
	isActive: boolean;
	onClick: () => void;
}

export const MenuBarItem: React.FC<MenuBarItemProps> = (props) => {

	return (
		<ItemButton {...props} disabled={props.isDisabled}>
			<ItemButtonTextPadding {...props}>
				<ItemButtonText {...props}>
					{props.title}
				</ItemButtonText>
			</ItemButtonTextPadding>
		</ItemButton>
	);
};

const ItemButtonTextPadding = tStyled.div<MenuBarItemProps>`
	text-align: center;
	padding: ${spacing.nudge.value};

	border: 0 solid transparent;
	border-color: ${p => p.isActive ? (p.isDisabled ? p.theme.color.textDisabled : p.theme.color.textLink) : 'transparent'};
	border-bottom-width: 2px;
`;

const ItemButton = tStyled.button<MenuBarItemProps>`
	background-color: transparent;
	cursor: ${p => p.isDisabled ? 'not-allowed' : 'pointer'};

	padding: ${spacing.nudge.value};
	margin: ${p => p.isUpper ? spacing.medium.horizontal : 'none'};
	border: none;
`;

const ItemButtonText = tStyled(RegularText) <MenuBarItemProps>`
	color: ${p => p.isDisabled ? p.theme.color.textDisabled : p.theme.color.textRegular};
`;