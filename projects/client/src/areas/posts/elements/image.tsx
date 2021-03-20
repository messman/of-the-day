import * as React from 'react';
import { IPostImage, IPostElementType, isValidPostElement } from 'oftheday-shared';
import { Block } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { iconTypes } from '@/core/symbol/icon';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { createPostsElement, PostCard, EmbeddedContentReveal } from './elements-common';
import { TagList, useTags } from './tag';
import { CardPadding } from '@/core/card/card';
import { ElementActions } from '../element-action-overlay';

/**
 * Image card. Shows, you know, an image.
 */
export const Image = createPostsElement<IPostImage>((props) => {
	const { isForArchive, hideTitle, archivePost } = props;
	const { link, description, sourceText, sourceLink, isNSFW, isTop } = props.value;

	const tagsStrings = useTags(isTop, isNSFW);

	const descriptionRender = description ? (
		<>
			<Block.Bat08 />
			<RegularText>{description}</RegularText>
		</>
	) : null;

	let sourceTextRender: JSX.Element | string | null = null;
	if (sourceText) {
		if (sourceLink) {
			sourceTextRender = <OutLink href={sourceLink}>{sourceText}</OutLink>;
		}
		else {
			sourceTextRender = sourceText;
		}

		sourceTextRender = (
			<>
				<Block.Ant04 />
				<RegularText>From {sourceTextRender}</RegularText>
			</>
		);
	}

	const elementActionsRender = (!isForArchive) ? (
		<>
			<Block.Elf24 />
			<ElementActions isViewingArchive={isForArchive} elementType={IPostElementType.image} isTop={isTop} />
		</>
	) : null;


	// TODO - add accessibility for image.

	return (
		<PostCard title='Image' icon={iconTypes.image} isForArchive={isForArchive} hideTitle={hideTitle} archivePost={archivePost}>
			<CardPadding>
				<TagList tags={tagsStrings} />
				{descriptionRender}
				{sourceTextRender}
				{elementActionsRender}
			</CardPadding>
			<Block.Elf24 />
			<EmbeddedContentReveal isRevealedOnMount={!isForArchive}>
				<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
					<ConstrainedImage src={link} />
				</a>
			</EmbeddedContentReveal>
		</PostCard>
	);
}, IPostElementType.image, isValidPostElement.image);

const ConstrainedImage = tStyled.img`
	width: 100%;
	max-width: ${LayoutBreakpointRem.d40}rem;
	max-height: 80vh;
`;