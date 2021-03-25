import * as React from 'react';
import { IPostElementType } from 'oftheday-shared';
import { Block } from '@/core/layout/common';
import { Paragraph, ParagraphArray } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { iconTypes } from '@/core/symbol/icon';
import { EmbeddedContentReveal } from './elements-common';
import { TagList, useTags } from './tag';
import { ElementActions } from '../element-action-overlay';
import { PostElementCard, PostElementProps } from '../card/card';

/**
 * Image card. Shows, you know, an image.
 */
export const Image: React.FC<PostElementProps> = (props) => {
	const { isForArchive, isOfSameElement, post, isShowingEmbeddedByDefault } = props;
	const { link, description, sourceText, sourceLink, isNSFW, isTop } = post.image!;

	const tagsStrings = useTags(isTop, isNSFW);

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

	// TODO - add accessibility for image.

	return (
		<PostElementCard
			title='Image'
			icon={iconTypes.image}
			isForArchive={isForArchive}
			isOfSameElement={isOfSameElement}
			isShowingEmbeddedByDefault={true}
			post={post}
			actionsRender={
				<ElementActions isForArchive={isForArchive} elementType={IPostElementType.image} isTop={isTop} />
			}
		>
			<TagList tags={tagsStrings} />
			<ParagraphArray value={description} />
			{sourceTextRender}
			<Block.Bat08 />
			<EmbeddedContentReveal
				changeKey={link}
				isOnlyRevealedOnClick={!isShowingEmbeddedByDefault}
				isUnloadedWhenHidden={true}
				useLargerMargin={true}
				useElementForSize={true}
			>
				<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
					<ConstrainedImage src={link} />
				</a>
			</EmbeddedContentReveal>
		</PostElementCard>
	);
};

const ConstrainedImage = tStyled.img`
	width: 100%;
	box-shadow: ${p => p.theme.shadow.c2Button};
`;