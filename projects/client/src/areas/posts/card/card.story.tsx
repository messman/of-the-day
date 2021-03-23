import * as React from 'react';
import { decorate, usePostControl } from '@/test/decorate';
import { PostElementCard } from './card';
import { text } from '@storybook/addon-knobs';
import { Paragraph } from '@/core/symbol/text';
import { Block, SimpleContentMaxWidth } from '@/core/layout/common';
import { iconTypes } from '@/core/symbol/icon';

export default { title: 'Posts/Card' };

export const TestCard = decorate('Card', null, () => {

	const { post, isForArchive, hideTitle } = usePostControl(null, {});

	const title = text('Card Title', 'Card Title');
	const textContent = text('Text Content', '');

	const textContentRender = textContent ? (
		<Paragraph>{textContent}</Paragraph>
	) : null;

	return (
		<SimpleContentMaxWidth>
			<Block.Dog16 />
			<PostElementCard elementTitleName={title} icon={iconTypes.calendar} isForArchive={isForArchive} hideTitle={hideTitle} post={post}>
				{textContentRender}
			</PostElementCard>
		</SimpleContentMaxWidth>
	);
});

// export const TestTextCard = decorate('Text Card', null, () => {

// 	const title = text('Title', 'Title');
// 	const heading = text('Heading', 'Heading');
// 	const cardText = text('Text', 'This is some text.');

// 	return (
// 		<SimpleContentMaxWidth>
// 			<Block.Dog16 />
// 			<TextCard title={title} heading={heading} text={cardText} icon={iconTypes.note} />
// 		</SimpleContentMaxWidth>
// 	);
// });

// const Card1: React.FC = () => {
// 	return (
// 		<Card title='Card 1' icon={iconTypes.calendar}>
// 			<RegularText>
// 				Here's a lot of content for Card 1. This is the content, right here. There's quite a bit of it,
// 				as you can see. It's going to fill up a fair amount of this card. There's not much the card can do but just expand and expand.
// 				This is the way it is. And so it goes.
// 			</RegularText>
// 		</Card>
// 	);
// };

// const Card2: React.FC = () => {
// 	return (
// 		<Card title='Card 2' icon={iconTypes.project}>
// 			<RegularText>
// 				Here's a little content for Card 2. There's less content here. Not very much at all.
// 			</RegularText>
// 		</Card>
// 	);
// };

// const Card3: React.FC = () => {
// 	return (
// 		<Card title='Card 3' icon={iconTypes.music}>
// 			<RegularText>
// 				Here's a medium amount of content for Card 3. There's less content here than on some of the other cards, but there's also more
// 				here than on other cards.
// 			</RegularText>
// 		</Card>
// 	);
// };