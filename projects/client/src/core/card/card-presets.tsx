import * as React from 'react';
import { TopMargin } from '../layout/common';
import { Heading3, RegularText } from '../symbol/text';
import { CardProps, Card, CardPadding } from './card';

export interface TextCardProps extends CardProps {
	heading?: string | null;
	text?: string | null;
}

export const TextCard: React.FC<TextCardProps> = (props) => {
	const { title, icon, heading, text, children } = props;

	const headingRender = heading ? (
		<Heading3>
			{heading}
		</Heading3>
	) : null;

	const textRender = text ? (
		<TopMargin.Medium>
			<RegularText>
				{text}
			</RegularText>
		</TopMargin.Medium>
	) : null;

	return (
		<Card title={title} icon={icon}>
			<CardPadding>
				{headingRender}
				{textRender}
				{children}
			</CardPadding>
		</Card>
	);
};