import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockOther, MockArchive, MockAbout } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { Posts } from './posts';
import { routes } from '@/services/nav/routing';

export default { title: 'Areas/Posts/Posts' };

export const PostsLayout = decorate('Posts', routes.posts.path, () => {
	return (
		<Layout
			Posts={Posts}
			Other={MockOther}
			Archive={MockArchive}
			About={MockAbout}
		/>
	);
});