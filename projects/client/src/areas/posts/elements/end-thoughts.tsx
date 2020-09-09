import * as React from 'react';
import { IPostEndThoughts } from 'oftheday-shared';
import { spacing } from '@/core/style/common';
import { LabelValue, DynamicMargin, ApplicationMaxWidth } from '@/core/layout/common';
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
			<ApplicationMaxWidth>

				<DynamicMargin margin={spacing.medium.horizontal} >
					<LabelValue margin={spacing.medium.vertical} label='End-of-day thoughts'>
						{value}
					</LabelValue>
				</DynamicMargin>
			</ApplicationMaxWidth>
		</ElementRoot>
	);
};