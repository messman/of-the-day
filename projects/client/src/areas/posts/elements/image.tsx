import * as React from 'react';
import { IPostElementType } from 'oftheday-shared';
import { Block, Padding } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { iconTypes } from '@/core/symbol/icon';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { EmbeddedContentReveal } from './elements-common';
import { TagList, useTags } from './tag';
import { ElementActions } from '../element-action-overlay';
import { PostElementCard, PostElementProps } from '../card/card';

/**
 * Image card. Shows, you know, an image.
 */
export const Image: React.FC<PostElementProps> = (props) => {
	const { isForArchive, hideTitle, post } = props;
	const { link, description, sourceText, sourceLink, isNSFW, isTop } = post.image!;

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
		<PostElementCard elementTitleName='Image' icon={iconTypes.image} isForArchive={isForArchive} hideTitle={hideTitle} post={post}>
			<Padding.Dog16>
				<TagList tags={tagsStrings} />
				{descriptionRender}
				{sourceTextRender}
				{elementActionsRender}
			</Padding.Dog16>
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
	max-width: ${LayoutBreakpointRem.d40}rem;
	max-height: 80vh;
`;