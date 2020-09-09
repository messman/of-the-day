import * as React from 'react';
import { IPostEndThoughts } from 'oftheday-shared';
import { ApplicationMaxWidth, TextContentMaxWidth } from '@/core/layout/common';
import { ElementRoot } from '../post';
import { styled } from '@/core/style/styled';
import { Subtitle, Text } from '@/core/symbol/text';
import { spacing } from '@/core/style/common';

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
					<Text margin={spacing.medium.top}>
						{value}
					</Text>
				</CenteredContent>
			</ApplicationMaxWidth>
		</ElementRoot>
	);
};

const CenteredContent = styled(TextContentMaxWidth)`
	text-align: center;
	margin-left: auto;
	margin-right: auto;
`;