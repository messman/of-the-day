import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Post } from './post';
import { PostsHeader, PostDayHeader } from './posts-header';
import { spacing, Spacing } from '@/core/layout/common';

export interface PostsProps {
	overridePosts?: IPost[];
	rootElement: HTMLElement | null;
	offsetPixels: number;
	isUpper: boolean;
}

const defaultPosts: IPost[] = [];

export const Posts: React.FC<PostsProps> = (props) => {

	const { overridePosts, rootElement, offsetPixels, isUpper } = props;

	const posts = overridePosts || defaultPosts;

	const [activePostIndex, setActivePostIndex] = React.useState(0);

	React.useEffect(() => {
		setActivePostIndex(0);
	}, [posts]);

	const postsRender: JSX.Element[] = [];
	posts.forEach((post, i) => {
		const headerKey = `header_${post.dateText}`;
		if (i !== 0) {
			postsRender.push(<PostDayHeader key={headerKey} post={post} />);
		}
		postsRender.push(<Post key={post.dateText} post={post} />);
	});

	function onPostChosen(newActivePostIndex: number) {
		setActivePostIndex(newActivePostIndex);
	}

	return (
		<Spacing margin={spacing.large.top}>
			<PostsHeader rootElement={rootElement} offsetPixels={offsetPixels} isUpper={isUpper} posts={posts} activePostIndex={activePostIndex} onPostChosen={onPostChosen} />
			<div>{postsRender}</div>
		</Spacing>
	);
};