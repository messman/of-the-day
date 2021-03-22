import * as React from 'react';
import { tStyled } from '../style/styled';

import { Heading1 } from '../symbol/text';

export interface CardGroupProps {
	title?: string | null;
	isAlternateBackground?: boolean;
	isAutoAlternateBackground?: boolean;
}


export const CardGroup: React.FC<CardGroupProps> = (props) => {

	const { title, isAlternateBackground, isAutoAlternateBackground, children } = props;

	const titleRender = title ? (
		<Heading1>
			{title}
		</Heading1>
	) : null;

	const Background = isAutoAlternateBackground ? AutoAlternatingBackground : (isAlternateBackground ? AlternateBackground : UnchangedBackground);

	return (
		<Background>
			{titleRender}
			{children}
		</Background>
	);
};

const AutoAlternatingBackground = tStyled.div`
	&:nth-child(even) {
		background-color: ${p => p.theme.subtleFill.a0Background};
	}
`;

const AlternateBackground = tStyled.div`
	background-color: ${p => p.theme.subtleFill.a0Background};
`;

const UnchangedBackground = tStyled.div``;