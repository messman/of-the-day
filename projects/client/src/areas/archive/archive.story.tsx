import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockAbout, MockPosts, MockOther } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { Archive } from './archive';
import { routes } from '@/services/nav/routing';

export default { title: 'Areas/Archive' };

export const ArchiveLayout = decorate('Archive', routes.archive.path, () => {
	return (
		<Layout
			Posts={MockPosts}
			Other={MockOther}
			Archive={Archive}
			About={MockAbout}
		/>
	);
});