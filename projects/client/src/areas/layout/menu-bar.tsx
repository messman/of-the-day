import * as React from 'react';
import { styled } from '@/core/style/styled';
import { routes } from '@/services/nav/routing';
import { Subtitle } from '@/core/symbol/text';
import { spacing } from '@/core/style/common';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { FlexRow, DefaultLayoutBreakpoint } from '@messman/react-common';

export interface MenuBarProps {
	isUpper: boolean;
	rootRef?: React.RefObject<any>;
	isDisabled?: boolean;
}

const MenuBarContainer = styled.div<MenuBarProps>`
	background-color: ${p => p.isUpper ? p.theme.color.primaryA : p.theme.color.backgroundB};
	padding: calc(${spacing.small.value} / 2) 0;
`;

export const MenuBar: React.FC<MenuBarProps> = (props) => {

	const history = useHistory();
	const location = useLocation();

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
		<MenuBarContainer {...props} >
			<MaxWidth>
				<FlexRow flex='none' justifyContent='space-around'>
					{menuBarItems}
				</FlexRow>
			</MaxWidth>
		</MenuBarContainer>
	);
};

const MaxWidth = styled.div`
	max-width: ${DefaultLayoutBreakpoint.regular}px;
	margin: ${spacing.medium.value} auto;
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

const ItemButtonTextPadding = styled.div<MenuBarItemProps>`
	text-align: center;
	padding: ${spacing.nudge.value};

	border: 0 solid transparent;
	border-color: ${p => p.isActive ? (p.isDisabled ? p.theme.color.textDisabled : p.theme.color.textLink) : 'transparent'};
	border-bottom-width: 2px;
`;

const ItemButton = styled.button<MenuBarItemProps>`
	background-color: transparent;
	cursor: ${p => p.isDisabled ? 'not-allowed' : 'pointer'};

	padding: ${spacing.nudge.value};
	border: none;
	z-index: 30;
`;

const ItemButtonText = styled(Subtitle) <MenuBarItemProps>`
	color: ${p => p.isDisabled ? p.theme.color.textDisabled : (p.isUpper ? p.theme.color.backgroundA : p.theme.color.text)};
`;