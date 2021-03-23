import * as React from 'react';
import { TagList } from './tag';
import { iconTypes } from '@/core/symbol/icon';
import { CardTitleDistinct, PostElementCard, PostElementProps } from '../card/card';

/** "Personal" info, like location, event, etc. */
export const Personal: React.FC<PostElementProps> = (props) => {
	const { hideTitle, isForArchive, post } = props;
	const { event, note, dayTypes, location, previousDayThoughts, schedule } = post.personal!;

	return (
		<div>
			<PostElementCard icon={iconTypes.note} hideTitle={hideTitle} isForArchive={isForArchive} post={post}>
				<CardTitleDistinct>Personal</CardTitleDistinct>
				<p>Event: {event}</p>
				<p>Notes: {note.join(' / ')}</p>
				<p>Schedule: {schedule}</p>
				<TagList tags={dayTypes} />
				<p>Location: {location}</p>
				<p>Thoughts: {previousDayThoughts.join(' / ')}</p>
			</PostElementCard>
		</div>
	);
};