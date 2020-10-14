import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Card } from './card';
import { spacing, Spacing } from '../layout/common';
import { iconTypes } from '../symbol/icon';
import { boolean, text } from '@storybook/addon-knobs';
import { RegularText } from '../symbol/text';
import { CardGroup } from './card-group';
import { EqualCardFlow } from './card-flow';
import { TextCard } from './card-presets';

export default { title: 'Core/Card' };

export const TestCard = decorate('Card', null, () => {

	const title = text('Card Title', 'Card Title');
	const textContent = text('Text Content', '');

	const textContentRender = textContent ? (
		<RegularText>{textContent}</RegularText>
	) : null;

	const padding = `${spacing.grand.value} ${spacing.medium.value}`;
	return (
		<div>
			<Spacing padding={padding}>
				<Card title={title} icon={iconTypes.calendar}>
					{textContentRender}
				</Card>
			</Spacing>
		</div>
	);
});

export const TestCardSubtitle = decorate('Card Subtitle', null, () => {

	const title = text('Card Title', 'Card Title');
	const subtitle = text('Card Subtitle', 'Card Subtitle');
	const textContent = text('Text Content', '');

	const textContentRender = textContent ? (
		<RegularText>{textContent}</RegularText>
	) : null;

	const padding = `${spacing.grand.value} ${spacing.medium.value}`;
	return (
		<Spacing padding={padding}>
			<Card title={title} subtitle={subtitle} icon={iconTypes.calendar}>
				{textContentRender}
			</Card>
		</Spacing>
	);
});

export const TestCardFlow = decorate('Card Flow', null, () => {

	return (
		<div>
			<EqualCardFlow useAutoVerticalMargin={true}>
				<Card1 />
			</EqualCardFlow>
			<EqualCardFlow useAutoVerticalMargin={true}>
				<Card1 />
				<Card2 />
				<Card3 />
			</EqualCardFlow>
			<EqualCardFlow useAutoVerticalMargin={true}>
				<Card1 />
				<Card3 />
			</EqualCardFlow>
		</div>
	);
});

export const TestCardGroup = decorate('Card Group', null, () => {

	const groupTitle = text('Group Title', 'Group Title');
	const useAlternateBackground = boolean('Use Alternate Background', false);
	const useAutoAlternateBackground = boolean('Use Auto Alternate Background', true);

	return (
		<div>
			<CardGroup title={groupTitle} isAlternateBackground={useAlternateBackground} isAutoAlternateBackground={useAutoAlternateBackground}>
				<EqualCardFlow>
					<Card1 />
				</EqualCardFlow>
			</CardGroup>
			<CardGroup title={groupTitle} isAlternateBackground={useAlternateBackground} isAutoAlternateBackground={useAutoAlternateBackground}>
				<EqualCardFlow>
					<Card1 />
					<Card2 />
					<Card3 />
				</EqualCardFlow>
			</CardGroup>
			<CardGroup title={groupTitle} isAlternateBackground={useAlternateBackground} isAutoAlternateBackground={useAutoAlternateBackground}>
				<EqualCardFlow>
					<Card1 />
					<Card3 />
				</EqualCardFlow>
			</CardGroup>
		</div>
	);
});

export const TestTextCard = decorate('Text Card', null, () => {

	const title = text('Title', 'Title');
	const heading = text('Heading', 'Heading');
	const cardText = text('Text', 'This is some text.');
	const defaultText = text('Default Text', 'Looks like there is nothing here.');

	return (
		<CardGroup title='Text Card'>
			<TextCard title={title} heading={heading} text={cardText} defaultText={defaultText} icon={iconTypes.note} />
		</CardGroup>
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
		<Card title='Card 2' icon={iconTypes.project}>
			<RegularText>
				Here's a little content for Card 2. There's less content here. Not very much at all.
			</RegularText>
		</Card>
	);
};

const Card3: React.FC = () => {
	return (
		<Card title='Card 3' icon={iconTypes.music}>
			<RegularText>
				Here's a medium amount of content for Card 3. There's less content here than on some of the other cards, but there's also more
				here than on other cards.
			</RegularText>
		</Card>
	);
};