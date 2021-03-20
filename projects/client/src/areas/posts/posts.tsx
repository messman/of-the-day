import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Post } from './post';
import { PostsHeader } from './posts-header';
import { usePostResponse } from '@/services/data/data-context';
import { DataLoad } from '@/services/data/data-load';
import { Spacing } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';

export interface PostsProps {
	offsetPixels: number;
	rootElement: HTMLElement | null;
}

const defaultPosts: IPost[] = [];

/**
 * Top-level layout piece. Handles rendering the posts response (the Week section).
 * */
export const Posts: React.FC<PostsProps> = (props) => {

	const { rootElement, offsetPixels } = props;

	const postPromise = usePostResponse();
	const { data, error, isStarted } = postPromise;

	let posts: IPost[] = defaultPosts;
	if (data && data.meta && !data.meta.shutdown.length) {
		posts = data.posts;
	}

	const [activePostIndex, setActivePostIndex] = React.useState(0);
	const activePost = posts[activePostIndex];

	React.useEffect(() => {
		setActivePostIndex(0);
	}, [posts]);

	function onPostChosen(newActivePostIndex: number) {
		setActivePostIndex(newActivePostIndex);
	}

	if (isStarted || error) {
		return <DataLoad promise={postPromise} />;
	}

	if (posts.length === 0) {
		return (
			<CenteredText>There's nothing here.</CenteredText>
		);
	}

	return (
		<>
			<PostsHeader
				rootElement={rootElement}
				offsetPixels={offsetPixels}
				posts={posts}
				activePostIndex={activePostIndex}
				onPostChosen={onPostChosen}
			/>
			<Post post={activePost} />
		</>
	);
};

const CenteredText = tStyled(RegularText)`
	text-align: center;
	margin: ${Spacing.hut56} ${Spacing.dog16};
`;