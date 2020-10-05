import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { spacing } from '@/core/layout/common';
import { TagList } from './tag';
import { iconTypes } from '@/core/symbol/icon';
import { TextCard } from '@/core/card/card-presets';
import { createPostsElement, PostsElement } from './elements-common';

export interface BasicsProps {
	post: IPost;
}

function shouldRenderNotes(post: IPost): boolean {
	const { basics } = post;
	return !!basics.event || !!basics.note;
}

export const Notes = createPostsElement((props) => {
	const { post } = props;
	if (!shouldRenderNotes(post)) {
		return null;
	}

	const { basics } = post;
	const { event, note } = basics;

	return (
		<TextCard title='Notes' icon={iconTypes.note} heading={event} text={note} />
	);
}, PostsElement.notes, shouldRenderNotes);


function shouldRenderSchedule(post: IPost): boolean {
	const { basics } = post;
	return !!basics.schedule || !!(basics.dayTypes && basics.dayTypes.length);
}

export const Schedule = createPostsElement((props) => {
	const { post } = props;
	if (!shouldRenderSchedule(post)) {
		return null;
	}

	const { basics } = post;
	const { schedule, dayTypes } = basics;

	return (
		<TextCard title='Schedule' icon={iconTypes.calendar} text={schedule}>
			<TagList margin={spacing.medium.top} tags={dayTypes} />
		</TextCard>
	);
}, PostsElement.schedule, shouldRenderSchedule);

function shouldRenderLocation(post: IPost): boolean {
	const { basics } = post;
	return !!basics.location;
}

export const Location = createPostsElement((props) => {
	const { post } = props;
	if (!shouldRenderLocation(post)) {
		return null;
	}

	const { basics } = post;
	const { location } = basics;

	return (
		<TextCard title='Location' icon={iconTypes.compass} heading={location} />
	);
}, PostsElement.location, shouldRenderLocation);