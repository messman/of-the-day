import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { routes } from '@/services/nav/routing';
import { fontDeclarations } from '@/core/symbol/text';
import { useLocation, matchPath } from 'react-router-dom';
import { FlexRow } from '@messman/react-common';
import { Spacing } from '@/core/layout/common';
import { formTransitionStyle, HighlightBar } from '@/core/style/common';
import { useHistoryWithParams } from '@/services/nav/url';

export interface MenuBarItemsProps {
	isUpper: boolean;
	onPathClick: () => void;
}

const menuBarRoutes = [routes.posts, routes.archive, routes.about];

export const MenuBarItems: React.FC<MenuBarItemsProps> = (props) => {
	const { isUpper, onPathClick } = props;
	const navigate = useHistoryWithParams();
	const location = useLocation();

	let activeIndex = 0;
	const items = menuBarRoutes.map((route, i) => {

		const isActive = !!matchPath(location.pathname, {
			path: route.path,
			exact: route === routes.posts // home
		});
		if (isActive) {
			activeIndex = i;
		}

		function onClick() {
			navigate(route.path);
			onPathClick();
		}

		return <MenuBarItem
			key={route.name}
			title={route.name}
			isDisabled={false}
			padding={isUpper ? null : Spacing.dog16}
			isActive={isActive}
			onClick={onClick}
		/>;
	});

	return (
		<MenuBarItemsContainer>
			<HighlightBar position={isUpper ? 'bottom' : 'top'} index={activeIndex} count={menuBarRoutes.length} />
			{items}
		</MenuBarItemsContainer>
	);
};

export const MenuBarItemsContainer = tStyled(FlexRow)`
	position: relative;
`;

export interface MenuBarItemProps {
	title: string;
	isDisabled: boolean;
	padding?: string | null;
	isActive: boolean;
	onClick: () => void;
}

export const MenuBarItem: React.FC<MenuBarItemProps> = (props) => {
	const { isDisabled, padding, isActive, title, onClick } = props;

	return (
		<ItemButton onClick={onClick} $padding={padding} isActive={isActive} isDisabled={isDisabled} disabled={isDisabled}>
			<ItemButtonText $padding={padding} isActive={isActive} isDisabled={isDisabled}>
				{title}
			</ItemButtonText>
		</ItemButton>
	);
};

interface MenuBarInnerItemProps {
	$padding?: string | null;
	isDisabled: boolean;
	isActive: boolean;
}

// TODO: figure out the accessibility stuff for these buttons. 
const ItemButton = tStyled.button<MenuBarInnerItemProps>`
	flex: 1;
	background-color: transparent;
	border: none;
	cursor: ${p => p.isDisabled ? 'not-allowed' : 'pointer'};
	padding: ${p => p.$padding || '0'};

	outline: none;
  	box-shadow: none;
`;

const ItemButtonText = tStyled.div<MenuBarInnerItemProps>`
	${fontDeclarations.regular};
	color: ${p => p.theme.textDistinct};
	${formTransitionStyle}
`;