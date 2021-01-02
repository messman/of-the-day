import * as React from 'react';
import { IPostBasics, IPostElementType, isValidPostElement } from 'oftheday-shared';
import { spacing } from '@/core/layout/common';
import { TagList } from './tag';
import { iconTypes } from '@/core/symbol/icon';
import { SubtleTextCard } from '@/core/card/card-presets';
import { createPostsElement } from './elements-common';

export const Notes = createPostsElement<IPostBasics>((props) => {
	const { event, note } = props.value;

	return (
		<SubtleTextCard title='Notes' icon={iconTypes.note} heading={event} text={note} />
	);
}, IPostElementType.notes, isValidPostElement.note);

export const Schedule = createPostsElement<IPostBasics>((props) => {
	const { schedule, dayTypes } = props.value;

	return (
		<SubtleTextCard title='Schedule' icon={iconTypes.calendar} text={schedule}>
			<TagList margin={spacing.medium.top} tags={dayTypes} />
		</SubtleTextCard>
	);
}, IPostElementType.schedule, isValidPostElement.schedule);

export const Location = createPostsElement<IPostBasics>((props) => {
	const { location } = props.value!;

	return (
		<SubtleTextCard title='Location' icon={iconTypes.compass} text={location} />
	);
}, IPostElementType.location, isValidPostElement.location);