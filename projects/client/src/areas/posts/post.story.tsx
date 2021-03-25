import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Post, PostElementsCountSummary } from './post';
import { boolean, number } from '@storybook/addon-knobs';
import { postsTestData } from '../../test/data';
import { Block, SimpleContentMaxWidthFull, SimpleContentMaxWidthPadded } from '@/core/layout/common';
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
				isShowingEmbeddedByDefault={true}
			/>
			<ElementActionsOverlay onSelectedFilter={() => { }} />
			<Block.Dog16 />
		</SimpleContentMaxWidthFull>
	);
});

export const PostsCountSummary = decorate('Post Elements Count Summary', null, () => {

	const isForArchive = boolean('Is For Archive', false);
	const postsCount = number('Posts Count', 3);
	const elementsCount = number('Elements Count', 5);
	const elementsCountToday = number('Elements Count Today', 5);

	return (
		<SimpleContentMaxWidthPadded>
			<Block.Dog16 />
			<PostElementsCountSummary
				isForArchive={isForArchive}
				postsCount={postsCount}
				elementsCount={elementsCount}
				elementsCountToday={elementsCountToday}
			/>
			<Block.Dog16 />
		</SimpleContentMaxWidthPadded>
	);
});