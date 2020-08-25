import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockPosts, MockOther, MockArchive, MockAbout } from './layout-mock';
import { Layout } from './layout';

export default { title: 'Areas/Layout/Layout' };

export const TestLayout = decorate('Layout', () => {
	return (
		<Layout
			Posts={MockPosts}
			Other={MockOther}
			Archive={MockArchive}
			About={MockAbout}
		/>
	);
});