import * as React from 'react';
import { About, AboutProps } from '@/areas/about/about';
import { Posts, PostsProps } from '@/areas/posts/posts';
import { Other, OtherProps } from '@/areas/other/other';
import { Archive, ArchiveProps } from '@/areas/archive/archive';
import { LowerMenuBar, UpperMenuBar, upperMenuBarHeightPixels } from './menu-bar/menu-bar';
import { Switch, Route } from 'react-router-dom';
import { routes } from '@/services/nav/routing';
import { tStyled } from '@/core/style/styled';
import { FlexColumn, useStateDOM, useWindowLayout } from '@messman/react-common';
import { Header } from './header/header';
import { LayoutBreakpoint } from '@/services/layout/window-layout';

export const ApplicationLayout: React.FC = () => {
	return (
		<Layout
			Posts={Posts}
			Other={Other}
			Archive={Archive}
			About={About}
		/>
	);
};

// Each component is passed as a component instead of an element so it's rendered further down the tree.
interface LayoutProps {
	Posts: React.FC<PostsProps>;
	Other: React.FC<OtherProps>;
	Archive: React.FC<ArchiveProps>;
	About: React.FC<AboutProps>;
}

export const Layout: React.FC<LayoutProps> = (props) => {
	const { Posts, Other, Archive, About } = props;

	const windowLayout = useWindowLayout();
	const isAnyMobileWidth = windowLayout.widthBreakpoint <= LayoutBreakpoint.mobileLarge;

	/*
		Bit of a hack here. 
		We are storing a DOM element that would normally just be a ref. 
		Why?:
		- Child components need to know when this ref is set (including when it updates).
		- Child components need the actual DOM element. 
		I could use an incrementing number and a ref, but this, although hacky, is more clear.
		We aren't really using the element as DOM - we are using it as data.
	*/
	const [scrollContainerRef, scrollContainerElement] = useStateDOM();

	return (
		<LayoutContainer>
			<ScrollContainer ref={scrollContainerRef}>
				<Header />
				<UpperMenuBar isMobileWidth={isAnyMobileWidth} rootElement={scrollContainerElement} />
				<Switch>
					<Route exact path={routes.posts.path}>
						<Posts rootElement={scrollContainerElement} isUpper={true} offsetPixels={upperMenuBarHeightPixels.total} />
					</Route>
					<Route path={routes.other.path}>
						<Other />
					</Route>
					<Route path={routes.archive.path}>
						<Archive />
					</Route>
					<Route path={routes.about.path}>
						<About />
					</Route>
				</Switch>
			</ScrollContainer>
			<LowerMenuBar isMobileWidth={isAnyMobileWidth} />
		</LayoutContainer>
	);
};

const ScrollContainer = tStyled.div`
	overflow-y: auto;
`;

const LayoutContainer = tStyled(FlexColumn)`
	height: 100vh;
	/* Used to prevent MenuBar scrolling. */
	overflow: hidden;
`;