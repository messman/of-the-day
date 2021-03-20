import * as React from 'react';
import { Block } from '../layout/common';
import { Heading3, RegularText } from '../symbol/text';
import { CardProps, Card, CardPadding, SubtleCard } from './card';

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
		<>
			<Block.Dog16 />
			<RegularText>
				{text}
			</RegularText>
		</>
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

export const SubtleTextCard: React.FC<TextCardProps> = (props) => {
	const { title, icon, heading, text, children } = props;

	const headingRender = heading ? (
		<Heading3>
			{heading}
		</Heading3>
	) : null;

	const textRender = text ? (
		<>
			<Block.Bat08 />
			<RegularText>
				{text}
			</RegularText>
		</>
	) : null;

	return (
		<SubtleCard title={title} icon={icon}>
			<CardPadding>
				{headingRender}
				{textRender}
				{children}
			</CardPadding>
		</SubtleCard>
	);
};