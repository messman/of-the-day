import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Post } from './post';
import { number } from '@storybook/addon-knobs';
import { postsTestData } from '../../test/data';
import { Block, SimpleContentMaxWidth } from '@/core/layout/common';

export default { title: 'Areas/Posts/Post' };

export const Posts = decorate('Post', null, () => {

	const postIndex = number('Post Index', 0, { min: 0, max: postsTestData.posts.length - 1 });
	const post = postsTestData.posts[postIndex];

	return (
		<SimpleContentMaxWidth>
			<Block.Dog16 />
			<Post
				post={post}
				hideTitles={false}
				isForArchive={false}
			/>
			<Block.Dog16 />
		</SimpleContentMaxWidth>
	);
});