import * as React from 'react';
import { IPostEndThoughts } from 'oftheday-shared';
import { spacing } from '@/core/style/common';
import { LabelValue, DynamicMargin } from '@/core/layout/common';
import { ElementSeparator } from './separators';
import { ElementRoot } from '../post';

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
		<ElementRoot>
			<DynamicMargin margin={spacing.medium.horizontal} >
				<LabelValue margin={spacing.medium.vertical} label='End-of-day thoughts'>
					{value}
				</LabelValue>
				<ElementSeparator />
			</DynamicMargin>
		</ElementRoot>
	);
};