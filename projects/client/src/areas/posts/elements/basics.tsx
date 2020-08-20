import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { LabelValue, Value, postValueMargin } from '@/core/layout/common';

export interface BasicsProps {
	post: IPost;
}

export const Basics: React.FC<BasicsProps> = (props) => {
	const { post } = props;
	const { basics } = post;

	return (
		<>
			<Value margin={postValueMargin}>{basics.event}</Value>
			<Value margin={postValueMargin}>{basics.note}</Value>
			<LabelValue margin={postValueMargin} label='Location'>{basics.location}</LabelValue>
			<LabelValue margin={postValueMargin} label='Schedule'>{basics.schedule}</LabelValue>
		</>
	);
};

