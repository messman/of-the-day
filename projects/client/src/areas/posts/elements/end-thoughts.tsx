import * as React from 'react';
import { IPostEndThoughts } from 'oftheday-shared';
import { largerSpacing } from '@/core/style/common';
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
			<DynamicMargin margin={largerSpacing.horizontal} >
				<LabelValue margin={largerSpacing.vertical} label='End-of-day thoughts'>
					{value}
				</LabelValue>
				<ElementSeparator />
			</DynamicMargin>
		</ElementRoot>
	);
};