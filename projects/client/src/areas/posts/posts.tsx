import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Post } from './post';
import { largerSpacing } from '@/core/style/common';
import { DynamicMargin } from '@/core/layout/common';

export interface PostsProps {
	overridePosts?: IPost[];
}

export const Posts: React.FC<PostsProps> = (props) => {

	const { overridePosts } = props;

	const posts = overridePosts || [];

	const postsRender = posts.map((post) => {
		return (
			<DynamicMargin margin={largerSpacing.vertical}>

				<Post post={post} />
			</DynamicMargin>
		);
	});

	return (
		<>{postsRender}</>
	);
};