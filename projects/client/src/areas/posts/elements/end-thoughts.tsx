import * as React from 'react';
import { IPostElementType, IPostEndThoughts, isValidPostElement } from 'oftheday-shared';
import { TextCard } from '@/core/card/card-presets';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement } from './elements-common';

export const EndThoughts = createPostsElement<IPostEndThoughts>((props) => {
	const { value } = props.value!;

	return (
		<TextCard title='End-Of-Day Thoughts' icon={iconTypes.thought} text={value} />
	);
}, IPostElementType.endThoughts, isValidPostElement.endThoughts);