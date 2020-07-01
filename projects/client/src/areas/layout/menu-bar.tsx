import * as React from 'react';
import { FlexRow } from '@/core/layout/flex';
import { styled } from '@/core/style/styled';
import { LayoutBreakpoint, useLayoutInfo } from '@/services/layout/layout-info';
import { routes } from '@/services/nav/routing';
import { Text } from '@/core/symbol/text';
import { edgePaddingValue } from '@/core/style/common';
import { useHistory, useLocation, matchPath } from 'react-router-dom';

export interface MenuBarProps {
	isDisabled?: boolean;
}

const MenuBarContainer = styled(FlexRow)`
	border-top: 1px solid ${p => p.theme.color.backgroundC};
	background-color: ${p => p.theme.color.backgroundB};
	padding: calc(${edgePaddingValue} / 2) 0;
`;

export const MenuBar: React.FC<MenuBarProps> = (props) => {

	const layoutInfo = useLayoutInfo();
	const history = useHistory();
	const location = useLocation();

	const isCompact = layoutInfo.widthBreakpoint === LayoutBreakpoint.compact;

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

	if (isCompact) {
		return (
			<MenuBarContainer flex='none' justifyContent='space-evenly'>
				{menuBarItems}
			</MenuBarContainer>
		);
	}
	else {
		return (
			<MenuBarContainer flex='none' justifyContent='space-around'>
				{menuBarItems}
			</MenuBarContainer>
		);
	}
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
	padding: calc(${edgePaddingValue} / 4);

	border: 0 solid transparent;
	border-color: ${p => p.isActive ? (p.isDisabled ? p.theme.color.disabled : p.theme.color.textAndIcon) : 'transparent'};
	border-bottom-width: 1px;
`;

const ItemButton = styled.button<MenuBarItemProps>`
	background-color: transparent;
	cursor: ${p => p.isDisabled ? 'not-allowed' : 'pointer'};
	color: ${p => p.isDisabled ? p.theme.color.disabled : p.theme.color.textAndIcon};

	padding: calc(${edgePaddingValue} / 3);
	border: none;
`;