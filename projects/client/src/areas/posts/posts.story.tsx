import * as React from 'react';
import { decorate } from '@/test/storybook/decorate';
import { MockOther, MockArchive, MockAccount, MockAbout } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { Posts } from './posts';

export default { title: 'areas/posts' };

export const PostsLayout = decorate(() => {
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