import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Post } from './post';
import { PostsHeader, PostDayHeader } from './posts-header';

export interface PostsProps {
	overridePosts?: IPost[];
	rootRef: React.RefObject<any>;
	offsetPixels: number;
	isUpper: boolean;
}

const defaultPosts: IPost[] = [];

export const Posts: React.FC<PostsProps> = (props) => {

	const { overridePosts, rootRef, offsetPixels, isUpper } = props;

	const posts = overridePosts || defaultPosts;

	const [activePostIndex, setActivePostIndex] = React.useState(0);

	React.useEffect(() => {
		setActivePostIndex(0);
	}, [posts]);

	const postsRender = posts.map((post, i) => {

		const headerKey = `header_${post.dateText}`;
		const postDayHeader = i === 0 ? null : <PostDayHeader key={headerKey} post={post} />;

		return (
			<>
				{postDayHeader}
				<Post key={post.dateText} post={post} />
			</>
		);
	});

	function onPostChosen(newActivePostIndex: number) {
		setActivePostIndex(newActivePostIndex);
	}

	return (
		<>
			<PostsHeader rootRef={rootRef} offsetPixels={offsetPixels} isUpper={isUpper} posts={posts} activePostIndex={activePostIndex} onPostChosen={onPostChosen} />
			<div>{postsRender}</div>
		</>
	);
};