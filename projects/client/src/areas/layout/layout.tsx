import * as React from 'react';
import { About, AboutProps } from '@/areas/about/about';
import { Posts, PostsProps } from '@/areas/posts/posts';
import { Other, OtherProps } from '@/areas/other/other';
import { Archive, ArchiveProps } from '@/areas/archive/archive';
import { MenuBar, upperMenuBarHeightPixels } from './menu-bar';
import { Switch, Route } from 'react-router-dom';
import { routes } from '@/services/nav/routing';
import { tStyled } from '@/core/style/styled';
import { FlexColumn, useWindowLayout } from '@messman/react-common';
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

	const windowLayout = useWindowLayout();
	const isAnyMobileWidth = windowLayout.widthBreakpoint <= LayoutBreakpoint.mobileLarge;

	if (isAnyMobileWidth) {
		return <CompactLayout {...props} />;
	}
	else {
		return <RegularLayout {...props} />;
	}
};


const RegularLayout: React.FC<LayoutProps> = (props) => {

	const { Posts, Other, Archive, About } = props;
	const scrollContainerRef = React.useRef<any>(null);

	return (
		<LayoutContainer>
			<ScrollContainer ref={scrollContainerRef}>
				<Header />
				<MenuBar isUpper={true} rootRef={scrollContainerRef} />
				<Switch>
					<Route exact path={routes.posts.path}>
						<Posts rootRef={scrollContainerRef} isUpper={true} offsetPixels={upperMenuBarHeightPixels} />
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
		</LayoutContainer>
	);

};
const CompactLayout: React.FC<LayoutProps> = (props) => {

	const { Posts, Other, Archive, About } = props;
	const scrollContainerRef = React.useRef<any>(null);
	return (
		<LayoutContainer>
			<ScrollContainer ref={scrollContainerRef}>
				<Switch>
					<Route exact path={routes.posts.path}>
						<Header />
						<Posts rootRef={scrollContainerRef} isUpper={false} offsetPixels={0} />
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
			<MenuBar isUpper={false} />
		</LayoutContainer>
	);

};

const ScrollContainer = tStyled(FlexColumn)`
	overflow-y: auto;
`;

const LayoutContainer = tStyled(FlexColumn)`
	height: 100vh;
	/* Used to prevent MenuBar scrolling. */
	overflow: hidden;
`;

