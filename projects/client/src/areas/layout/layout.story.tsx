import * as React from 'react';
import { decorate } from '@/test/storybook/decorate';
import { MockPosts, MockOther, MockArchive, MockAccount, MockAbout } from './layout-mock';
import { Layout } from './layout';

export default { title: 'areas/layout' };

export const TestLayout = decorate(() => {
	return (
		<Layout
			Posts={MockPosts}
			Other={MockOther}
			Archive={MockArchive}
			Account={MockAccount}
			About={MockAbout}
		/>
	);
});