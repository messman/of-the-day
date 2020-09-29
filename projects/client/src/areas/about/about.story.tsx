import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockArchive, MockPosts, MockOther } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { About } from './about';
import { routes } from '@/services/nav/routing';

export default { title: 'Areas/About' };

export const AboutLayout = decorate('About', routes.about.path, () => {
	return (
		<Layout
			Posts={MockPosts}
			Other={MockOther}
			Archive={MockArchive}
			About={About}
		/>
	);
});