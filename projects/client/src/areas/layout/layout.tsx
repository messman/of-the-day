import * as React from 'react';
import { About, AboutProps } from '@/areas/about/about';
import { Posts, PostsProps } from '@/areas/posts/posts';
import { Other, OtherProps } from '@/areas/other/other';
import { Archive, ArchiveProps } from '@/areas/archive/archive';
import { Account, AccountProps } from '@/areas/account/account';
import { LayoutBreakpoint, useLayoutInfo } from '@/services/layout/layout-info';

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
		<div>
			{isCompact ? 'Compact' : 'Not Compact'}
			<Posts />
			<Other />
			<Archive />
			<Account />
			<About />
		</div>
	);
};