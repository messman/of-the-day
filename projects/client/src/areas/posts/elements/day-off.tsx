import * as React from 'react';
import { spacing, Spacing } from '@/core/layout/common';
import { Subtitle, RegularText } from '@/core/symbol/text';

export interface DayOffProps {
	message: string;
}

export const DayOff: React.FC<DayOffProps> = (props) => {
	const { message } = props;

	const messageText = message || 'Andrew is taking the day off from updating this page. Check back later!';

	return (
		<Spacing margin={spacing.medium.horizontal}>
			<Subtitle>Off Day</Subtitle>
			<RegularText>
				{messageText}
			</RegularText>
		</Spacing>
	);
};