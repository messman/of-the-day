import * as React from 'react';
import { largerSpacing } from '@/core/style/common';
import { LabelValue } from '@/core/layout/common';

export interface DayOffProps {
	message: string;
}

export const DayOff: React.FC<DayOffProps> = (props) => {
	const { message } = props;

	const messageText = message || 'Andrew is taking the day off from updating this page. Check back later!';

	return (
		<LabelValue margin={largerSpacing.horizontal} label='Off Day'>
			{messageText}
		</LabelValue>
	);
};