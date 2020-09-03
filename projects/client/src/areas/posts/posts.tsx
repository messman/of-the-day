import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Post } from './post';
import { spacing } from '@/core/style/common';
import { DynamicMargin } from '@/core/layout/common';

export interface PostsProps {
	overridePosts?: IPost[];
}

export const Posts: React.FC<PostsProps> = (props) => {

	const { overridePosts } = props;

	const posts = overridePosts || [];

	const postsRender = posts.map((post, i) => {
		return (
			<DynamicMargin margin={spacing.medium.vertical}>

				<Post post={post} isCollapsedInitially={i !== 0} />
			</DynamicMargin>
		);
	});

	return (
		<div>{postsRender}</div>
	);
};