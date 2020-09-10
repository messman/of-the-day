import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockOther, MockArchive, MockAbout } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { Posts, PostsProps } from './posts';
import { postsTestData } from './posts-test';

export default { title: 'Areas/Posts/Posts' };

export const PostsLayout = decorate('Posts', () => {
	return (
		<Layout
			Posts={TestPosts}
			Other={MockOther}
			Archive={MockArchive}
			About={MockAbout}
		/>
	);
});

const TestPosts: React.FC<PostsProps> = (props) => {
	return <Posts overridePosts={postsTestData} {...props} />;
};