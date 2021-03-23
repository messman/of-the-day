import * as React from 'react';
import { decorate, usePostControl } from '@/test/decorate';
import { PostElementCard } from './card';
import { text } from '@storybook/addon-knobs';
import { Paragraph } from '@/core/symbol/text';
import { Block, SimpleContentMaxWidthFull } from '@/core/layout/common';
import { iconTypes } from '@/core/symbol/icon';
import { ElementActions } from '../element-action-overlay';
import { IPostElementType } from 'oftheday-shared';

export default { title: 'Posts/Card' };

export const TestCard = decorate('Card', null, () => {

	const { post, isOfSameElement, isForArchive } = usePostControl(null, {});

	const title = text('Title', 'This is a really long card title to show how it should wrap around the other pieces.');

	return (
		<SimpleContentMaxWidthFull>
			<Block.Dog16 />
			<PostElementCard
				icon={iconTypes.calendar}
				title={title}
				post={post}
				isOfSameElement={isOfSameElement}
				isForArchive={isForArchive}
				actionsRender={
					<ElementActions elementType={IPostElementType.custom} />
				}
			>
				<Paragraph>Here is some text content for the card.</Paragraph>
			</PostElementCard>
		</SimpleContentMaxWidthFull>
	);
});
