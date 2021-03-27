import * as React from 'react';
import { wrap } from '@/test/decorate';
import { MockArchive, MockPosts } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { About } from './about';
import { routes } from '@/services/nav/routing';

export default wrap(routes.about.path, () => {
	return (
		<Layout
			Posts={MockPosts}
			Archive={MockArchive}
			About={About}
		/>
	);
});