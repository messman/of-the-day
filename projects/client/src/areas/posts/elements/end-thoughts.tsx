import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { TextCard } from '@/core/card/card-presets';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement, PostsElement } from './elements-common';

export interface EndThoughtsProps {
	post: IPost;
}

function shouldRenderEndThoughts(post: IPost): boolean {
	const { endThoughts } = post;
	return !!endThoughts.value;
}

export const EndThoughts = createPostsElement((props) => {
	const { post } = props;

	if (!shouldRenderEndThoughts(post)) {
		return null;
	}

	const { endThoughts } = post;
	const { value } = endThoughts;

	return (
		<TextCard title='End-Of-Day Thoughts' icon={iconTypes.thought} text={value} />
	);
}, PostsElement.endThoughts, shouldRenderEndThoughts);