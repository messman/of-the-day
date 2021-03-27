import * as React from 'react';
import { wrap } from '@/test/decorate';
import { MockArchive, MockAbout } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { Posts } from './posts';
import { routes } from '@/services/nav/routing';

export default wrap(routes.posts.path, () => {
	return (
		<Layout
			Posts={Posts}
			Archive={MockArchive}
			About={MockAbout}
		/>
	);
});