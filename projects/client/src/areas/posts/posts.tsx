import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { PostElementsCountSummary, usePostsList, useValidatedPosts } from './post';
import { usePostResponse } from '@/services/data/data-context';
import { DataLoad } from '@/services/data/data-load';
import { ParagraphCenter } from '@/core/symbol/text';
import { Block, SimpleContentMaxWidthFull, Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';

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

	const { validPosts, elementsCount, elementsCountToday } = useValidatedPosts(posts, true);
	const postsRender = usePostsList(validPosts, false, null, true);

	if (isStarted || error) {
		return <DataLoad promise={postPromise} />;
	}

	const endingStatementRender = validPosts.length ? (
		<SidePadding>
			<Block.Elf24 />
			<ParagraphCenter>
				That's all! See the archives for more.
			</ParagraphCenter>
		</SidePadding>
	) : null;

	return (
		<SimpleContentMaxWidthFull>
			<SidePadding>
				<PostElementsCountSummary
					postsCount={validPosts.length}
					elementsCount={elementsCount}
					elementsCountToday={elementsCountToday}
					isForArchive={false}
				/>
			</SidePadding>
			{postsRender}
			{endingStatementRender}
		</SimpleContentMaxWidthFull>
	);
};

const SidePadding = tStyled.div`
	padding: 0 ${Spacing.dog16};
`;

