import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { spacing } from '@/core/layout/common';
import { TagList } from './tag';
import { iconTypes } from '@/core/symbol/icon';
import { TextCard } from '@/core/card/card-presets';
import { CardFlow } from '@/core/card/card-flow';

export interface BasicsProps {
	post: IPost;
}

export const Basics: React.FC<BasicsProps> = (props) => {
	const { post } = props;

	// Pull out logic check so that the CardFlow counts the right number of children.
	// Could have also passed a specific number prop.
	const notes = shouldRenderNotes(post) ? <Notes post={post} /> : null;

	return (
		<CardFlow useAutoVerticalMargin={true}>
			{notes}
			<Schedule post={post} />
			<Location post={post} />
		</CardFlow>
	);
};

function shouldRenderNotes(post: IPost) {
	const { basics } = post;
	const { event, note } = basics;
	return event || note;
}

const Notes: React.FC<BasicsProps> = (props) => {
	const { post } = props;

	if (!shouldRenderNotes(post)) {
		return null;
	}

	const { basics } = post;
	const { event, note } = basics;

	return (
		<TextCard title='Notes' icon={iconTypes.note} heading={event} text={note} />
	);
};

const scheduleDefaultText = 'It looks like Andrew neglected to fill out a schedule for this day. How typical. You can presume he is going to be on the computer all day.';

const Schedule: React.FC<BasicsProps> = (props) => {
	const { post } = props;
	const { basics } = post;
	const { schedule, dayTypes } = basics;

	const defaultText = (!schedule && (!dayTypes || !dayTypes.length)) ? scheduleDefaultText : '';

	return (
		<TextCard title='Schedule' icon={iconTypes.calendar} text={schedule} defaultText={defaultText}>
			<TagList margin={spacing.medium.top} tags={dayTypes} />
		</TextCard>
	);
};

const locationDefaultText = 'Where in the world is Andrew? He didn\'t take the time to add his location. Typical.';

const Location: React.FC<BasicsProps> = (props) => {
	const { post } = props;
	const { basics } = post;
	const { location } = basics;

	return (
		<TextCard title='Location' icon={iconTypes.compassLarge} heading={location} defaultText={locationDefaultText} />
	);
};

