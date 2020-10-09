import { IPost, IPostElementType } from 'oftheday-shared';
import * as React from 'react';

export interface PostsElementProps<T> {
	value: T;
	isForArchive?: boolean;
	archivePost?: IPost;
}

export interface PostsElementFC<T> extends React.FC<PostsElementProps<T | undefined>> {
	element: IPostElementType;
}

export function createPostsElement<T>(Component: React.FC<PostsElementProps<T>>, element: IPostElementType, validator: (value: T | undefined) => boolean): PostsElementFC<T> {
	const fc = ((props: PostsElementProps<T | undefined>) => {
		if (validator(props.value)) {
			return <Component value={props.value!} isForArchive={props.isForArchive} archivePost={props.archivePost} />;
		}
		return null;
	}) as unknown as PostsElementFC<T>;
	fc.element = element;
	return fc;
}