import * as React from 'react';
import { IPostElementType } from 'oftheday-shared';
import { Block } from '@/core/layout/common';
import { Paragraph } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { iconTypes } from '@/core/symbol/icon';
import { EmbeddedContentReveal } from './elements-common';
import { TagList, useTags } from './tag';
import { ElementActions } from '../element-action-overlay';
import { CardTitleDistinct, PostElementCard, PostElementProps } from '../card/card';

/**
 * Image card. Shows, you know, an image.
 */
export const Image: React.FC<PostElementProps> = (props) => {
	const { isForArchive, hideTitle, post } = props;
	const { link, description, sourceText, sourceLink, isNSFW, isTop } = post.image!;

	const tagsStrings = useTags(isTop, isNSFW);

	const descriptionRender = description ? (
		<Paragraph>{description}</Paragraph>
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
			<Paragraph>From {sourceTextRender}</Paragraph>
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
		<PostElementCard icon={iconTypes.image} isForArchive={isForArchive} hideTitle={hideTitle} post={post}>
			<CardTitleDistinct>Image</CardTitleDistinct>
			<TagList tags={tagsStrings} />
			{descriptionRender}
			{sourceTextRender}
			{elementActionsRender}
			<Block.Elf24 />
			<EmbeddedContentReveal isRevealedOnMount={!isForArchive}>
				<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
					<ConstrainedImage src={link} />
				</a>
			</EmbeddedContentReveal>
		</PostElementCard>
	);
};

const ConstrainedImage = tStyled.img`
	width: 100%;
	box-shadow: ${p => p.theme.shadow.b1Card};
`;