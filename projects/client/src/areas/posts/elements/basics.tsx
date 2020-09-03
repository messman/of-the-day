import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { LabelValue, Value, DynamicMargin } from '@/core/layout/common';
import { spacing } from '@/core/style/common';
import { ElementSeparator } from './separators';
import { TagList } from './tag';
import { ElementRoot } from '../post';

export interface BasicsProps {
	post: IPost;
}

export const Basics: React.FC<BasicsProps> = (props) => {
	const { post } = props;
	const { basics } = post;
	const { event, note, location, schedule, dayTypes } = basics;

	const { horizontal, vertical } = spacing.medium;

	return (
		<ElementRoot>
			<DynamicMargin margin={horizontal}>
				<Value margin={vertical}>{event}</Value>
				<Value margin={vertical}>{note}</Value>
				<LabelValue margin={vertical} label='Location'>{location}</LabelValue>
				<LabelValue margin={vertical} label='Schedule'>{schedule}</LabelValue>
				<DynamicMargin margin={vertical}>
					<TagList tags={dayTypes} />
				</DynamicMargin>
				<ElementSeparator />
			</DynamicMargin>
		</ElementRoot>
	);
};

