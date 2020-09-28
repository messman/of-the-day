import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Card } from './card';
import { spacing, Spacing } from '../layout/common';
import { iconTypes } from '../symbol/icon';
import { text } from '@storybook/addon-knobs';
import { RegularText } from '../symbol/text';

export default { title: 'Core/Card' };

export const TestCard = decorate('Card', () => {

	const title = text('Card Title', 'Card Title');
	const textContent = text('Text Content', '');

	const textContentRender = textContent ? (
		<RegularText>{textContent}</RegularText>
	) : null;

	const padding = `${spacing.grand.value} ${spacing.medium.value}`;
	return (
		<div>
			<Spacing padding={padding}>
				<Card title={title} icon={iconTypes.activity}>
					{textContentRender}
				</Card>
			</Spacing>
			<Spacing padding={padding} backgroundColor={c => c.bg2}>
				<Card title={title} icon={iconTypes.activity}>
					{textContentRender}
				</Card>
			</Spacing>
		</div>
	);
});
