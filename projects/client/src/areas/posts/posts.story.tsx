import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockOther, MockArchive, MockAccount, MockAbout } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { Posts } from './posts';

export default { title: 'Areas/Posts/Posts' };

export const PostsLayout = decorate('Posts', () => {
	return (
		<Layout
			Posts={Posts}
			Other={MockOther}
			Archive={MockArchive}
			Account={MockAccount}
			About={MockAbout}
		/>
	);
});