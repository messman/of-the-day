import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Card } from './card';
import { spacing, Spacing } from '../layout/common';
import { iconTypes } from '../symbol/icon';
import { boolean, text } from '@storybook/addon-knobs';
import { RegularText } from '../symbol/text';
import { CardGroup } from './card-group';

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

export const TestCardGroup = decorate('Card Group', () => {

	const groupTitle = text('Group Title', 'Group Title');
	const useAlternateBackground = boolean('Use Alternate Background', false);
	const useAutoAlternateBackground = boolean('Use Auto Alternate Background', true);

	return (
		<div>
			<CardGroup title={groupTitle} isAlternateBackground={useAlternateBackground} isAutoAlternateBackground={useAutoAlternateBackground}>
				<Card1 />
			</CardGroup>
			<CardGroup title={groupTitle} isAlternateBackground={useAlternateBackground} isAutoAlternateBackground={useAutoAlternateBackground}>
				<Card1 />
				<Card2 />
				<Card3 />
			</CardGroup>
			<CardGroup title={groupTitle} isAlternateBackground={useAlternateBackground} isAutoAlternateBackground={useAutoAlternateBackground}>
				<Card1 />
				<Card3 />
			</CardGroup>
		</div>
	);
});

const Card1: React.FC = () => {
	return (
		<Card title='Card 1' icon={iconTypes.calendar}>
			<RegularText>
				Here's a lot of content for Card 1. This is the content, right here. There's quite a bit of it,
				as you can see. It's going to fill up a fair amount of this card. There's not much the card can do but just expand and expand.
				This is the way it is. And so it goes.
			</RegularText>
		</Card>
	);
};

const Card2: React.FC = () => {
	return (
		<Card title='Card 2' icon={iconTypes.screen}>
			<RegularText>
				Here's a little content for Card 2. There's less content here. Not very much at all.
			</RegularText>
		</Card>
	);
};

const Card3: React.FC = () => {
	return (
		<Card title='Card 3' icon={iconTypes.calendar}>
			<RegularText>
				Here's a medium amount of content for Card 3. There's less content here than on some of the other cards, but there's also more
				here than on other cards.
			</RegularText>
		</Card>
	);
};