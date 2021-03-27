import * as React from 'react';
import { useValue, wrap } from '@/test/decorate';
import { Post, PostElementsCountSummary } from './post';
import { postsTestData } from '../../test/data';
import { Block, SimpleContentMaxWidthFull, SimpleContentMaxWidthPadded } from '@/core/layout/common';
import { ElementActionsOverlay } from './element-action-overlay';

export default {
	'Posts': wrap(null, () => {

		const postIndex = useValue(`Post Index (0 to ${postsTestData.posts.length - 1})`, 0);
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
	}),
	'Post Elements Count Summary': wrap(null, () => {

		const isForArchive = useValue('Is For Archive', false);
		const postsCount = useValue('Posts Count', 3);
		const elementsCount = useValue('Elements Count', 5);
		const elementsCountToday = useValue('Elements Count Today', 5);

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
	})
};