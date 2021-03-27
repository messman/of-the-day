import * as React from 'react';
import { wrap, usePostControl, useValue } from '@/test/decorate';
import { PostElementCard } from './card';
import { Paragraph } from '@/core/symbol/text';
import { Block, SimpleContentMaxWidthFull } from '@/core/layout/common';
import { iconTypes } from '@/core/symbol/icon';
import { ElementActions, ElementActionsOverlay } from '../element-action-overlay';
import { IPostElementType } from 'oftheday-shared';

export default wrap(null, () => {

	const { post, isOfSameElement, isForArchive } = usePostControl(null, {});

	const title = useValue('Title', 'This is a really long card title to show how it should wrap around the other pieces.');

	return (
		<SimpleContentMaxWidthFull>
			<Block.Dog16 />
			<PostElementCard
				icon={iconTypes.calendar}
				title={title}
				post={post}
				isOfSameElement={isOfSameElement}
				isForArchive={isForArchive}
				isShowingEmbeddedByDefault={true}
				actionsRender={
					<ElementActions elementType={IPostElementType.custom} />
				}
			>
				<Paragraph>Here is some text content for the card.</Paragraph>
			</PostElementCard>
			<ElementActionsOverlay onSelectedFilter={() => { }} />
		</SimpleContentMaxWidthFull>
	);
});
