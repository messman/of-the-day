import * as React from 'react';
import { styled } from '@/core/style/styled';
import { routes } from '@/services/nav/routing';
import { Text } from '@/core/symbol/text';
import { spacing, borderRadiusValue } from '@/core/style/common';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { FlexRow } from '@messman/react-common';

export interface MenuBarProps {
	isUpper: boolean;
	rootRef?: React.RefObject<any>;
	isDisabled?: boolean;
}

const MenuBarContainer = styled(FlexRow) <MenuBarProps>`
	background-color: ${p => p.theme.color.backgroundB};
	padding: calc(${spacing.small.value} / 2) 0;
	border-radius: ${p => p.isUpper ? borderRadiusValue : 0};
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
			isActive={isActive}
			onClick={onClick}
		/>;
	});

	return (
		<MenuBarContainer {...props} flex='none' justifyContent='space-evenly'>
			{menuBarItems}
		</MenuBarContainer>
	);
};

export interface MenuBarItemProps {
	title: string;
	isDisabled: boolean;
	isActive: boolean;
	onClick: () => void;
}

export const MenuBarItem: React.FC<MenuBarItemProps> = (props) => {

	return (
		<ItemButton {...props} disabled={props.isDisabled}>
			<ItemButtonTextPadding {...props}>

				<Text>
					{props.title}
				</Text>
			</ItemButtonTextPadding>
		</ItemButton>
	);
};

const ItemButtonTextPadding = styled.div<MenuBarItemProps>`
	text-align: center;
	padding: calc(${spacing.small.value} / 4);

	border: 0 solid transparent;
	border-color: ${p => p.isActive ? (p.isDisabled ? p.theme.color.textDisabled : p.theme.color.text) : 'transparent'};
	border-bottom-width: 1px;
`;

const ItemButton = styled.button<MenuBarItemProps>`
	background-color: transparent;
	cursor: ${p => p.isDisabled ? 'not-allowed' : 'pointer'};
	color: ${p => p.isDisabled ? p.theme.color.textDisabled : p.theme.color.text};

	padding: calc(${spacing.small.value} / 3);
	border: none;
`;