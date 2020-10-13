import * as React from 'react';
import { spacing } from '../layout/common';
import { Heading3, RegularText } from '../symbol/text';
import { CardProps, Card, CardPadding } from './card';

export interface TextCardProps extends CardProps {
	heading?: string | null;
	text?: string | null;
	defaultText?: string | null;
}

export const TextCard: React.FC<TextCardProps> = (props) => {
	const { title, icon, heading, text, defaultText, children } = props;

	const spacingBetween = heading && (text || defaultText) ? spacing.medium.bottom : '0';

	const headingRender = heading ? (
		<Heading3 padding={spacingBetween}>
			{heading}
		</Heading3>
	) : null;

	const textRender = text ? (
		<RegularText>
			{text}
		</RegularText>
	) : null;

	const defaultTextRender = (defaultText && !heading && !text) ? (
		<RegularText color={c => c.textInactive}>
			({defaultText})
		</RegularText>
	) : null;

	const finalTextRender = textRender || defaultTextRender;

	return (
		<Card title={title} icon={icon}>
			<CardPadding>
				{headingRender}
				{finalTextRender}
				{children}
			</CardPadding>
		</Card>
	);
};