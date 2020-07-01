import * as React from 'react';
import { About, AboutProps } from '@/areas/about/about';
import { Posts, PostsProps } from '@/areas/posts/posts';
import { Other, OtherProps } from '@/areas/other/other';
import { Archive, ArchiveProps } from '@/areas/archive/archive';
import { Account, AccountProps } from '@/areas/account/account';
import { LayoutBreakpoint, useLayoutInfo } from '@/services/layout/layout-info';
import { MenuBar } from './menu-bar';
import { FlexColumn } from '@/core/layout/flex';
import { Switch, Route } from 'react-router-dom';
import { routes } from '@/services/nav/routing';

export const ApplicationLayout: React.FC = () => {
	return (
		<Layout
			Posts={Posts}
			Other={Other}
			Archive={Archive}
			Account={Account}
			About={About}
		/>
	);
};

// Each component is passed as a component instead of an element so it's rendered further down the tree.
interface LayoutProps {
	Posts: React.FC<PostsProps>;
	Other: React.FC<OtherProps>;
	Archive: React.FC<ArchiveProps>;
	Account: React.FC<AccountProps>;
	About: React.FC<AboutProps>;
}

export const Layout: React.FC<LayoutProps> = (props) => {
	const { Posts, Other, Archive, Account, About } = props;

	const layoutInfo = useLayoutInfo();
	const isCompact = layoutInfo.widthBreakpoint === LayoutBreakpoint.compact;

	return (
		<FlexColumn>
			{isCompact ? 'Compact' : 'Not Compact'}
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
				<Route path={routes.account.path}>
					<Account />
				</Route>
				<Route path={routes.about.path}>
					<About />
				</Route>
			</Switch>
			<MenuBar />
		</FlexColumn>
	);
};