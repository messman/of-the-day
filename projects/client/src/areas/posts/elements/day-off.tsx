import * as React from 'react';
import { spacing } from '@/core/layout/common';
import { Subtitle, RegularText } from '@/core/symbol/text';
import { ElementRoot } from '../post';
import { Center } from '@/core/style/common';

export interface DayOffProps {
	message: string;
}

export const DayOff: React.FC<DayOffProps> = (props) => {
	const { message } = props;

	const messageText = message || 'Andrew has marked this day as a \'day off\'. Check back tomorrow.';

	return (
		<ElementRoot>
			<Center>
				<Subtitle margin={spacing.medium.bottom}>Off Day</Subtitle>
				<RegularText>
					{messageText}
				</RegularText>
			</Center>
		</ElementRoot>
	);
};