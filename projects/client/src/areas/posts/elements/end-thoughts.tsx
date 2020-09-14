import * as React from 'react';
import { IPostEndThoughts } from 'oftheday-shared';
import { spacing, ApplicationMaxWidth, LineMaxWidth } from '@/core/layout/common';
import { ElementRoot } from '../post';
import { tStyled } from '@/core/style/styled';
import { Subtitle, RegularText } from '@/core/symbol/text';

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
				<CenteredContent>
					<Subtitle isBold={true}>End-of-day Thoughts</Subtitle>
					<RegularText margin={spacing.medium.top}>
						{value}
					</RegularText>
				</CenteredContent>
			</ApplicationMaxWidth>
		</ElementRoot>
	);
};

const CenteredContent = tStyled(LineMaxWidth)`
	text-align: center;
	margin-left: auto;
	margin-right: auto;
`;