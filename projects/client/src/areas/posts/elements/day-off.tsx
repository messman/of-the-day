import * as React from 'react';
import { spacing } from '@/core/layout/common';
import { Subtitle, RegularText } from '@/core/symbol/text';
import { ElementRoot } from '../post';
import { TextAlign } from '@/core/style/common';

export interface DayOffProps {
	message: string;
}

export const DayOff: React.FC<DayOffProps> = (props) => {
	const { message } = props;

	const messageText = message || 'Andrew has marked this day as a \'day off\'. Check back tomorrow.';

	return (
		<ElementRoot>
			<TextAlign align='center'>
				<Subtitle margin={spacing.medium.bottom}>Off Day</Subtitle>
				<RegularText>
					{messageText}
				</RegularText>
			</TextAlign>
		</ElementRoot>
	);
};