import * as React from 'react';
import { ApplicationMaxWidth, Spacing, spacing } from '@/core/layout/common';
import { Heading2, RegularText } from '@/core/symbol/text';

export interface DayOffProps {
	message: string;
}

export const DayOff: React.FC<DayOffProps> = (props) => {
	const { message } = props;

	const messageText = message || 'Andrew has marked this day as a \'day off\' to give himself a break. Check back tomorrow.';

	return (
		<ApplicationMaxWidth>
			<Spacing margin={spacing.large.value} textAlign='center'>
				<Heading2 isMaxLineLength={false} margin={spacing.medium.bottom}>Day Off</Heading2>
				<RegularText margin='auto'>
					{messageText}
				</RegularText>
			</Spacing>
		</ApplicationMaxWidth>
	);
};