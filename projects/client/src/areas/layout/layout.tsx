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
import { DynamicMargin } from '@/core/layout/common';
import { spacing } from '@/core/style/common';

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

	if (isCompact) {
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
				<PageTitle isCompact={false} />
				<MenuBar isUpper={true} rootRef={scrollContainerRef} />
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

};
const CompactLayout: React.FC<LayoutProps> = (props) => {

	const { Posts, Other, Archive, About } = props;
	const scrollContainerRef = React.useRef<any>(null);
	return (
		<LayoutContainer>
			<ScrollContainer ref={scrollContainerRef}>
				<Switch>
					<Route exact path={routes.posts.path}>
						<PageTitle isCompact={true} />
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

};

const ScrollContainer = styled(FlexColumn)`
	overflow-y: auto;
`;

const LayoutContainer = styled(FlexColumn)`
	height: 100vh;
	/* Used to prevent MenuBar scrolling. */
	overflow: hidden;
`;

interface PageTitleProps {
	isCompact: boolean;
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
	const { isCompact } = props;

	return (
		<DynamicMargin margin={spacing.grand.value}>
			<PageTitlePadding>
				<Title isBold={isCompact}>Of The Day</Title>
				<Text>A place for daily updates by Andrew.</Text>
			</PageTitlePadding>
		</DynamicMargin>
	);
};

const PageTitlePadding = styled.div`
	padding: 10px;
`;