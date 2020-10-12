import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockOther, MockArchive, MockAbout } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { Posts, PostsProps } from './posts';
import { postsTestData } from './posts-test';
import { routes } from '@/services/nav/routing';
import { IPost } from 'oftheday-shared';

export default { title: 'Areas/Posts/Posts' };

export const PostsLayout = decorate('Posts', routes.posts.path, () => {
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

	let overridePosts: IPost[] | undefined = postsTestData;
	// Comment / uncomment below for testing with real data.
	overridePosts = undefined;

	return <Posts overridePosts={overridePosts} {...props} />;
};