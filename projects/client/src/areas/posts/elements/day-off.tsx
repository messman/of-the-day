import * as React from 'react';
import { spacing } from '@/core/layout/common';
import { Heading2, RegularText } from '@/core/symbol/text';
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
			<TextAlign dataAlign='center'>
				<Heading2 margin={spacing.medium.bottom}>Off Day</Heading2>
				<RegularText>
					{messageText}
				</RegularText>
			</TextAlign>
		</ElementRoot>
	);
};