import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { PostElementsCountSummary, usePostsList, useValidatedPosts } from './post';
import { usePostResponse } from '@/services/data/data-context';
import { DataLoad } from '@/services/data/data-load';
import { ParagraphCenter } from '@/core/symbol/text';
import { SimpleContentMaxWidth } from '@/core/layout/common';

export interface PostsProps {
}

/**
 * Top-level layout piece. Handles rendering the posts response (the Week section).
 * */
export const Posts: React.FC<PostsProps> = () => {

	const postPromise = usePostResponse();
	const { data, error, isStarted } = postPromise;

	let posts: IPost[] = [];
	if (data && data.meta && !data.meta.shutdown.length) {
		posts = data.posts;
	}

	const { validPosts, elementsCount } = useValidatedPosts(posts, true);
	const postsRender = usePostsList(validPosts, false, null);

	if (isStarted || error) {
		return <DataLoad promise={postPromise} />;
	}

	let render: JSX.Element = null!;
	if (validPosts.length === 0) {
		render = (
			<ParagraphCenter>
				Looks like Andrew hasn't shared anything recently. What a slacker.
			</ParagraphCenter>
		);
	}
	else {
		render = (
			<>
				<PostElementsCountSummary
					elementsCount={elementsCount}
					postsCount={validPosts.length}
				/>
				{postsRender}
			</>
		);
	}

	return (
		<SimpleContentMaxWidth>
			{render}
		</SimpleContentMaxWidth>
	);
};

