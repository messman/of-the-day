import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Post } from './post';
import { PostsHeader } from './posts-header';
import { usePostResponse } from '@/services/data/data-context';
import { DataLoad } from '@/services/data/data-load';
import { Spacing, spacing } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';

export interface PostsProps {
	isUpper: boolean;
	overridePosts?: IPost[];
	offsetPixels: number;
	rootElement: HTMLElement | null;
	onScrollTop: () => void;
}

const defaultPosts: IPost[] = [];

export const Posts: React.FC<PostsProps> = (props) => {

	const { overridePosts, rootElement, offsetPixels, isUpper, onScrollTop } = props;

	const postPromise = usePostResponse();
	const { data, error, isStarted } = postPromise;

	const posts = overridePosts || data?.posts || defaultPosts;

	const [activePostIndex, setActivePostIndex] = React.useState(0);
	const activePost = posts[activePostIndex];

	React.useEffect(() => {
		setActivePostIndex(0);
	}, [posts]);

	function onPostChosen(newActivePostIndex: number) {
		setActivePostIndex(newActivePostIndex);
		onScrollTop();
	}

	if (!overridePosts && (isStarted || error)) {
		return <DataLoad promise={postPromise} />;
	}

	if (posts.length === 0) {
		return (
			<Spacing margin={spacing.medium.horizontal}>
				<Spacing margin={spacing.grand.top} textAlign='center'>
					<RegularText>There are no posts.</RegularText>
				</Spacing>
			</Spacing>
		);
	}

	return (
		<>
			<PostsHeader
				rootElement={rootElement}
				offsetPixels={offsetPixels}
				isUpper={isUpper}
				posts={posts}
				activePostIndex={activePostIndex}
				onPostChosen={onPostChosen}
				onScrollTop={onScrollTop}
			/>
			<Post post={activePost} />
		</>
	);
};