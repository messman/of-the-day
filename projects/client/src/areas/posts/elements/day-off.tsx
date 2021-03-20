import * as React from 'react';
import { Spacing } from '@/core/layout/common';
import { Heading2, RegularText } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';
import { LayoutBreakpointRem, lineBreakpoint } from '@/services/layout/window-layout';

export interface DayOffProps {
	message: string;
}

export const DayOff: React.FC<DayOffProps> = (props) => {
	const { message } = props;

	const messageText = message || 'Andrew has marked this day as a \'day off\' to give himself a break. Check back tomorrow.';

	return (
		<Container>
			<Heading2>Day Off</Heading2>
			<RegularTextMaxWidth>
				{messageText}
			</RegularTextMaxWidth>
		</Container>
	);
};

const Container = tStyled.div`
	max-width: ${LayoutBreakpointRem.d40};
	padding: ${Spacing.guy40} ${Spacing.elf24};
	text-align: center;
`;

const RegularTextMaxWidth = tStyled(RegularText)`
	max-width: ${lineBreakpoint};
	margin: auto;
`;