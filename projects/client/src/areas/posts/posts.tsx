import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { usePostsList } from './post';
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

	const postsRender = usePostsList(posts, false, null);

	if (isStarted || error) {
		return <DataLoad promise={postPromise} />;
	}

	if (posts.length === 0) {
		return (
			<ParagraphCenter>
				Looks like Andrew hasn't shared anything recently. What a slacker.
			</ParagraphCenter>
		);
	}

	return (
		<SimpleContentMaxWidth>
			{postsRender}
		</SimpleContentMaxWidth>
	);
};

