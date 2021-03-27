import * as React from 'react';
import { wrap } from '@/test/decorate';
import { MockAbout, MockPosts } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { Archive } from './archive';
import { routes } from '@/services/nav/routing';

export default wrap(routes.archive.path, () => {
	return (
		<Layout
			Posts={MockPosts}
			Archive={Archive}
			About={MockAbout}
		/>
	);
});