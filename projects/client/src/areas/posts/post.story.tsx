import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Post } from './post';
import { Flex } from '@messman/react-common';
import { number } from '@storybook/addon-knobs';
import { postsTestData } from './posts-test';

export default { title: 'Areas/Posts/Post' };

export const Posts = decorate('Post', () => {

	const postIndex = number('Post Index', 0, { min: 0, max: postsTestData.length - 1 });
	const post = postsTestData[postIndex];

	return (
		<Flex>
			<Post
				post={post}
			/>
		</Flex>
	);
});