import * as React from 'react';
import { About, AboutProps } from '@/areas/about/about';
import { Posts, PostsProps } from '@/areas/posts/posts';
import { Other, OtherProps } from '@/areas/other/other';
import { Archive, ArchiveProps } from '@/areas/archive/archive';
import { MenuBar } from './menu-bar';
import { Switch, Route } from 'react-router-dom';
import { routes } from '@/services/nav/routing';
import { styled } from '@/core/style/styled';
import { Title, Text } from '@/core/symbol/text';
import { useWindowLayout, DefaultLayoutBreakpoint, FlexColumn } from '@messman/react-common';

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
	const isCompact = windowLayout.widthBreakpoint === DefaultLayoutBreakpoint.compact;

	const { Posts, Other, Archive, About } = props;

	// TODO - you can simplify this logic.
	if (isCompact) {
		return (
			<LayoutContainer>
				<ScrollContainer>
					<Switch>
						<Route exact path={routes.posts.path}>
							<PageTitle />
							<Posts />
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
	}
	else {
		return (
			<LayoutContainer>
				<PageTitle />
				<MenuBar isUpper={true} />
				<ScrollContainer>
					<Switch>
						<Route exact path={routes.posts.path}>
							<Posts />
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
	}
};

const ScrollContainer = styled(FlexColumn)`
	overflow-y: auto;
`;

const LayoutContainer = styled(FlexColumn)`
	height: 100vh;
	/* Used to prevent MenuBar scrolling. */
	overflow: hidden;
`;

const PageTitle: React.FC = () => {
	return (
		<PageTitlePadding>
			<Title isBold={true}>Of The Day</Title>
			<Text>A place for daily updates by Andrew.</Text>
		</PageTitlePadding>
	);
};

const PageTitlePadding = styled.div`
	padding: 10px;
`;