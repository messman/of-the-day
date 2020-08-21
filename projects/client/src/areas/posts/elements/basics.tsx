import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { LabelValue, Value, DynamicMargin } from '@/core/layout/common';
import { largerSpacing } from '@/core/style/common';
import { ElementSeparator } from './separators';

export interface BasicsProps {
	post: IPost;
}

export const Basics: React.FC<BasicsProps> = (props) => {
	const { post } = props;
	const { basics } = post;

	const { horizontal, vertical } = largerSpacing;

	return (
		<DynamicMargin margin={horizontal}>
			<Value margin={vertical}>{basics.event}</Value>
			<Value margin={vertical}>{basics.note}</Value>
			<LabelValue margin={vertical} label='Location'>{basics.location}</LabelValue>
			<LabelValue margin={vertical} label='Schedule'>{basics.schedule}</LabelValue>
			<ElementSeparator />
		</DynamicMargin>
	);
};

