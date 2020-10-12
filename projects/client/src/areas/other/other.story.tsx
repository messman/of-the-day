import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockArchive, MockAbout, MockPosts } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { Other } from './other';
import { routes } from '@/services/nav/routing';

export default { title: 'Areas/Other/Other' };

export const OtherLayout = decorate('Other', routes.other.path, () => {
	return (
		<Layout
			Posts={MockPosts}
			Other={Other}
			Archive={MockArchive}
			About={MockAbout}
		/>
	);
});