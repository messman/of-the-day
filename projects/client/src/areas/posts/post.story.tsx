import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Post } from './post';
import { number } from '@storybook/addon-knobs';
import { postsTestData } from '../../test/data';
import { Block, SimpleContentMaxWidthFull } from '@/core/layout/common';
import { ElementActionsOverlay } from './element-action-overlay';

export default { title: 'Areas/Posts/Post' };

export const Posts = decorate('Post', null, () => {

	const postIndex = number('Post Index', 0, { min: 0, max: postsTestData.posts.length - 1 });
	const post = postsTestData.posts[postIndex];

	return (
		<SimpleContentMaxWidthFull>
			<Block.Dog16 />
			<Post
				post={post}
				isOfSameElement={false}
				isForArchive={false}
			/>
			<ElementActionsOverlay onSelectedFilter={() => { }} />
			<Block.Dog16 />
		</SimpleContentMaxWidthFull>
	);
});