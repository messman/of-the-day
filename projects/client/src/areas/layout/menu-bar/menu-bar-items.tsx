import * as React from 'react';
import { tCss, tStyled } from '@/core/style/styled';
import { routes } from '@/services/nav/routing';
import { RegularText } from '@/core/symbol/text';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { FlexRow } from '@messman/react-common';
import { spacing } from '@/core/layout/common';

export interface MenuBarItemsProps {
	isUpper: boolean;
	onPathClick: () => void;
}

export const MenuBarItems: React.FC<MenuBarItemsProps> = (props) => {
	const { isUpper, onPathClick } = props;
	const history = useHistory();
	const location = useLocation();

	const keys = Object.keys(routes);
	const length = keys.length;
	let activeIndex = 0;
	const items = keys.map((key, i) => {
		const route = routes[key as keyof typeof routes];

		const isActive = !!matchPath(location.pathname, {
			path: route.path,
			exact: route === routes.posts // home
		});
		if (isActive) {
			activeIndex = i;
		}

		function onClick() {
			history.push(route.path);
			onPathClick();
		}

		return <MenuBarItem
			key={route.name}
			title={route.name}
			isDisabled={false}
			isUpper={isUpper}
			isActive={isActive}
			onClick={onClick}
		/>;
	});

	const percentWidth = (1 / length) * 100;
	const percentLeft = percentWidth * activeIndex;

	return (
		<MenuBarItemsContainer>
			<MenuBarActiveLine isUpper={isUpper} percentLeft={percentLeft} percentWidth={percentWidth} />
			{items}
		</MenuBarItemsContainer>
	);
};

const MenuBarItemsContainer = tStyled(FlexRow)`
	position: relative;
`;


const transitionStyle = tCss`
	transition: all .2s linear;
`;

interface MenuBarActiveLineProps {
	isUpper: boolean;
	percentLeft: number;
	percentWidth: number;
}

const MenuBarActiveLine = tStyled.div<MenuBarActiveLineProps>`
	position: absolute;
	left: ${p => p.percentLeft}%;
	width: ${p => p.percentWidth}%;
	${p => p.isUpper ? 'bottom' : 'top'}: 0;
	height: 4px;
	border-radius: 2px;
	background-color: ${p => p.theme.color.accentFillOnBackground};
	${transitionStyle}
	transition-property: left;
`;

interface MenuBarItemProps {
	title: string;
	isDisabled: boolean;
	isUpper: boolean;
	isActive: boolean;
	onClick: () => void;
}

const MenuBarItem: React.FC<MenuBarItemProps> = (props) => {
	const { isDisabled, isUpper, isActive, title, onClick } = props;

	return (
		<ItemButton onClick={onClick} isUpper={isUpper} isActive={isActive} isDisabled={isDisabled} disabled={isDisabled}>
			<ItemButtonText isUpper={isUpper} isActive={isActive} isDisabled={isDisabled}>
				{title}
			</ItemButtonText>
		</ItemButton>
	);
};

interface MenuBarInnerItemProps {
	isUpper: boolean;
	isDisabled: boolean;
	isActive: boolean;
}

// TODO: figure out the accessibility stuff for these buttons. 
const ItemButton = tStyled.button<MenuBarInnerItemProps>`
	flex: 1;
	background-color: transparent;
	border: none;
	cursor: ${p => p.isDisabled ? 'not-allowed' : 'pointer'};
	padding: ${spacing.small.value};
	margin: ${p => p.isUpper ? 'none' : spacing.nudge.value};

	outline: none;
  	box-shadow: none;
`;

const ItemButtonText = tStyled(RegularText) <MenuBarInnerItemProps>`
	color: ${p => p.isActive ? p.theme.color.textRegular : p.theme.color.textInactive};
	${transitionStyle}
	transition-property: color;
`;