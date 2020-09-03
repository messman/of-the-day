import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockPosts, MockOther, MockArchive, MockAbout } from './layout-mock';
import { About } from '@/areas/about/about';
import { Posts } from '@/areas/posts/posts';
import { Other } from '@/areas/other/other';
import { Archive } from '@/areas/archive/archive';
import { Layout } from './layout';

export default { title: 'Areas/Layout/Layout' };

export const TestMockLayout = decorate('Mock Layout', () => {
	return (
		<Layout
			Posts={MockPosts}
			Other={MockOther}
			Archive={MockArchive}
			About={MockAbout}
		/>
	);
});

export const TestRealLayout = decorate('Real Layout', () => {
	return (
		<Layout
			Posts={Posts}
			Other={Other}
			Archive={Archive}
			About={About}
		/>
	);
});