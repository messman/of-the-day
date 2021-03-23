import * as React from 'react';
import { TagList } from './tag';
import { iconTypes } from '@/core/symbol/icon';
import { PostElementCard, PostElementProps } from '../card/card';
import { ElementActions } from '../element-action-overlay';
import { IPostElementType } from 'oftheday-shared';

/** "Personal" info, like location, event, etc. */
export const Personal: React.FC<PostElementProps> = (props) => {
	const { isOfSameElement, isForArchive, post } = props;
	const { event, note, dayTypes, location, previousDayThoughts, schedule } = post.personal!;

	return (
		<div>
			<PostElementCard
				title='Me'
				icon={iconTypes.activity}
				isOfSameElement={isOfSameElement}
				isForArchive={isForArchive}
				post={post}
				actionsRender={
					<ElementActions elementType={IPostElementType.personal} />
				}
			>
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