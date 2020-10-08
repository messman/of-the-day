import { IPostElementType } from 'oftheday-shared';
import * as React from 'react';

export interface PostsElementProps<T> {
	value: T;
}

export interface PostsElementFC<T> extends React.FC<PostsElementProps<T | undefined>> {
	element: IPostElementType;
	unwrap: (value: T | undefined) => JSX.Element | null;
}

export function createPostsElement<T>(Component: React.FC<PostsElementProps<T>>, element: IPostElementType, validator: (value: T | undefined) => boolean): PostsElementFC<T> {
	function unwrap(value: T | undefined) {
		if (validator(value)) {
			return <Component value={value!} />;
		}
		return null;
	}
	const fc = ((props: PostsElementProps<T | undefined>) => {
		return unwrap(props.value);
	}) as unknown as PostsElementFC<T>;
	fc.element = element;
	fc.unwrap = unwrap;
	return fc;
}