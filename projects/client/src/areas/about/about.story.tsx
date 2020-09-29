import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockArchive, MockPosts, MockOther } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { About } from './about';

export default { title: 'Areas/About' };

export const AboutLayout = decorate('About', () => {
	return (
		<Layout
			Posts={MockPosts}
			Other={MockOther}
			Archive={MockArchive}
			About={About}
		/>
	);
});