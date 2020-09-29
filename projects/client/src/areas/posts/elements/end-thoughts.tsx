import * as React from 'react';
import { IPostEndThoughts } from 'oftheday-shared';
import { CardFlow } from '@/core/card/card-flow';
import { TextCard } from '@/core/card/card-presets';
import { iconTypes } from '@/core/symbol/icon';

export interface EndThoughtsProps {
	endThoughts: IPostEndThoughts;
}

export const EndThoughts: React.FC<EndThoughtsProps> = (props) => {
	const { endThoughts } = props;
	const { value } = endThoughts;

	if (!value) {
		return null;
	}

	return (
		<CardFlow useAutoVerticalMargin={true}>
			<TextCard title='End-of-day Thoughts' icon={iconTypes.thought} text={value} />
		</CardFlow>
	);
};