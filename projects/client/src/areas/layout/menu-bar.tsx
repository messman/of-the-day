import * as React from 'react';
import { styled } from '@/core/style/styled';
import { routes } from '@/services/nav/routing';
import { Text } from '@/core/symbol/text';
import { smallerSpacingValue, borderRadiusValue, largerSpacingValue } from '@/core/style/common';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { FlexRow } from '@messman/react-common';

export interface MenuBarProps {
	isUpper: boolean;
	isDisabled?: boolean;
}

const MenuBarContainer = styled(FlexRow) <MenuBarProps>`
	border-top: 0 solid ${p => p.theme.color.backgroundC};
	border-top-width: ${p => p.isUpper ? '1px' : '0'};
	background-color: ${p => p.theme.color.backgroundB};
	padding: calc(${smallerSpacingValue} / 2) 0;
	margin-bottom: ${p => p.isUpper ? largerSpacingValue : 0};
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
	padding: calc(${smallerSpacingValue} / 4);

	border: 0 solid transparent;
	border-color: ${p => p.isActive ? (p.isDisabled ? p.theme.color.disabled : p.theme.color.textAndIcon) : 'transparent'};
	border-bottom-width: 1px;
`;

const ItemButton = styled.button<MenuBarItemProps>`
	background-color: transparent;
	cursor: ${p => p.isDisabled ? 'not-allowed' : 'pointer'};
	color: ${p => p.isDisabled ? p.theme.color.disabled : p.theme.color.textAndIcon};

	padding: calc(${smallerSpacingValue} / 3);
	border: none;
`;