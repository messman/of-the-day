import * as React from 'react';
import { IPostBasics, IPostElementType, isValidPostElement } from 'oftheday-shared';
import { spacing } from '@/core/layout/common';
import { TagList } from './tag';
import { iconTypes } from '@/core/symbol/icon';
import { TextCard } from '@/core/card/card-presets';
import { createPostsElement } from './elements-common';

export const Notes = createPostsElement<IPostBasics>((props) => {
	const { event, note } = props.value;

	return (
		<TextCard title='Notes' icon={iconTypes.note} heading={event} text={note} />
	);
}, IPostElementType.notes, isValidPostElement.note);

export const Schedule = createPostsElement<IPostBasics>((props) => {
	const { schedule, dayTypes } = props.value;

	return (
		<TextCard title='Schedule' icon={iconTypes.calendar} text={schedule}>
			<TagList margin={spacing.medium.top} tags={dayTypes} />
		</TextCard>
	);
}, IPostElementType.schedule, isValidPostElement.schedule);

export const Location = createPostsElement<IPostBasics>((props) => {
	const { location } = props.value!;

	return (
		<TextCard title='Location' icon={iconTypes.compass} heading={location} />
	);
}, IPostElementType.location, isValidPostElement.location);