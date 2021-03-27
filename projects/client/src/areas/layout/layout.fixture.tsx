import * as React from 'react';
import { wrap } from '@/test/decorate';
import { MockPosts, MockArchive, MockAbout } from './layout-mock';
import { About } from '@/areas/about/about';
import { Posts } from '@/areas/posts/posts';
import { Archive } from '@/areas/archive/archive';
import { Layout } from './layout';

export default {
	'Mock Layout': wrap(null, () => {
		return (
			<Layout
				Posts={MockPosts}
				Archive={MockArchive}
				About={MockAbout}
			/>
		);
	}),

	'Real Layout': wrap(null, () => {
		return (
			<Layout
				Posts={Posts}
				Archive={Archive}
				About={About}
			/>
		);
	})
};