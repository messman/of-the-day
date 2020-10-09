import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Post } from './post';
import { PostsHeader } from './posts-header';
import { tStyled } from '@/core/style/styled';

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
	const posts = overridePosts || defaultPosts;

	const [activePostIndex, setActivePostIndex] = React.useState(0);
	const activePost = posts[activePostIndex];

	React.useEffect(() => {
		setActivePostIndex(0);
	}, [posts]);

	function onPostChosen(newActivePostIndex: number) {
		setActivePostIndex(newActivePostIndex);
		onScrollTop();
	}

	return (
		<PostsRoot>
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
		</PostsRoot>
	);
};

const PostsRoot = tStyled.div``;