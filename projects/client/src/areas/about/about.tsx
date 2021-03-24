import { Block, SimpleContentMaxWidthPadded, Spacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { borderRadiusStyle, HighlightBar } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { iconTypes, SizedIcon } from '@/core/symbol/icon';
import { Title, Paragraph } from '@/core/symbol/text';
import { useMeta } from '@/services/data/data-context';
import { routes } from '@/services/nav/routing';
import * as React from 'react';
import { matchPath, Route, Switch, useHistory, useLocation } from 'react-router';
import { AboutBasics } from './about-basics';
import { AboutYear } from './about-year';
import { Settings } from './settings';
import { MenuBarItemsContainer, MenuBarItem } from '@/areas/layout/menu-bar/menu-bar-items';
import { FlexRow } from '@messman/react-common';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';

export interface AboutProps {

}

/**
* Top-level layout component for the 'About' page.
*/
export const About: React.FC<AboutProps> = () => {
	const meta = useMeta();

	return (
		<SimpleContentMaxWidthPadded>
			<Settings />
			<Block.Hut56 />
			<AboutMenuBarItems />
			<Switch>
				<Route path={routes.aboutYear.path}>
					<AboutYear meta={meta} />
				</Route>
				<Route>
					<AboutBasics meta={meta} />
				</Route>
			</Switch>
			<Block.Elf24 />
			<Divider />
			<div>
				<Title>Contact</Title>
				<Paragraph>
					I am <OutLink href='https://andrewmessier.com'>Andrew Messier</OutLink>.
				</Paragraph>
				<Paragraph>
					Reach me on <OutLink href='https://linkedin.com/in/andrewgmessier'>LinkedIn</OutLink> or <OutLink href='https://twitter.com/AndrewGMessier'>Twitter</OutLink>.
				</Paragraph>
				<Paragraph>
					See the code or file a bug on <OutLink href='https://github.com/messman/of-the-day'>GitHub</OutLink>.
				</Paragraph>
			</div>
			<IconContainer>
				<SizedIcon type={iconTypes.creator} size={Spacing.hut56} />
			</IconContainer>
		</SimpleContentMaxWidthPadded>
	);
};

const AboutMenuBarItems: React.FC = () => {
	const history = useHistory();
	const location = useLocation();

	let activeIndex = 0;
	const items = ([routes.about, routes.aboutYear]).map((route, i) => {

		const isActive = !!matchPath(location.pathname, {
			path: route.path,
			exact: false
		});
		// Because we specify the base 'about' route first,
		// This will just be overridden by the next routes that match.
		if (isActive) {
			activeIndex = i;
		}

		function onClick() {
			// Note, here we *replace*
			history.replace(route.path);
		}

		return <MenuBarItem
			key={route.name}
			title={route.name}
			isDisabled={false}
			padding={null}
			isActive={isActive}
			onClick={onClick}
		/>;
	});

	return (
		<MenuBarItemsHeight>
			<MenuBarItemsContainer>
				<HighlightBar position='bottom' index={activeIndex} count={2} />
				{items}
			</MenuBarItemsContainer>
		</MenuBarItemsHeight>
	);
};

// The height of this parent is used, because the MenuBarItemsContainer uses explicit height for the navigation.
const MenuBarItemsHeight = tStyled(FlexRow)`
	position: relative;
	height: ${Spacing.guy40};
	max-width: ${LayoutBreakpointRem.c30}rem;
	margin: auto;
	${borderRadiusStyle}
	border: 1px solid ${p => p.theme.outlineDistinct};
	background-color: ${p => p.theme.subtleFill.d3Nav};
	box-shadow: ${p => p.theme.shadow.d3Nav};
	overflow: hidden;
`;

const Divider = tStyled.div`
	height: 1px;
	background-color: ${p => p.theme.outlineDistinct};
`;

const IconContainer = tStyled.div`
	text-align: center;
	margin: ${Spacing.fan32} 0;
`;