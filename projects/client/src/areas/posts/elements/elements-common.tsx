import { IPost, IPostElementType } from 'oftheday-shared';
import * as React from 'react';

export interface PostsElementProps {
	post: IPost;
}

export interface PostsElementFC extends React.FC<PostsElementProps> {
	element: IPostElementType;
	shouldRender: (post: IPost) => boolean;
	renderOrNull: (post: IPost) => JSX.Element | null;
}

export function createPostsElement(Component: React.FC<PostsElementProps>, element: IPostElementType, shouldRender: (post: IPost) => boolean): PostsElementFC {
	const elementFC = Component as PostsElementFC;
	elementFC.element = element;
	elementFC.shouldRender = shouldRender;
	elementFC.renderOrNull = (post) => {
		return shouldRender(post) ? <Component post={post} /> : null;
	};
	return elementFC;
}