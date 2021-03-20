import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockPosts, MockArchive, MockAbout } from './layout-mock';
import { About } from '@/areas/about/about';
import { Posts } from '@/areas/posts/posts';
import { Archive } from '@/areas/archive/archive';
import { Layout } from './layout';

export default { title: 'Areas/Layout/Layout' };

export const TestMockLayout = decorate('Mock Layout', null, () => {
	return (
		<Layout
			Posts={MockPosts}
			Archive={MockArchive}
			About={MockAbout}
		/>
	);
});

export const TestRealLayout = decorate('Real Layout', null, () => {
	return (
		<Layout
			Posts={Posts}
			Archive={Archive}
			About={About}
		/>
	);
});