import * as React from 'react';
import { IPostImage, IPostElementType, isValidPostElement } from 'oftheday-shared';
import { Spacing, spacing } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { iconTypes } from '@/core/symbol/icon';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { createPostsElement, PostArchiveLinks, PostCard, ShowEmbeddedContent } from './elements-common';
import { TagList, useTags } from './tag';
import { CardPadding } from '@/core/card/card';

export const Image = createPostsElement<IPostImage>((props) => {
	const { isForArchive, archivePost } = props;
	const { link, description, sourceText, sourceLink, isNSFW, isTop } = props.value;

	const tagsStrings = useTags(isTop, isNSFW);

	let sourceRender: JSX.Element | string | null = null;
	if (sourceText) {
		if (sourceLink) {
			sourceRender = <OutLink href={sourceLink}>{sourceText}</OutLink>;
		}
		else {
			sourceRender = sourceText;
		}
	}

	// TODO - add accessibility for image.

	return (
		<PostCard title='Image' icon={iconTypes.image} isForArchive={isForArchive} archivePost={archivePost}>
			<CardPadding>
				<TagList margin={spacing.small.vertical} tags={tagsStrings} />
				<RegularText show={description} margin={spacing.small.top}>{description}</RegularText>
				<RegularText show={sourceRender} margin={spacing.nudge.top}>From {sourceRender}</RegularText>
			</CardPadding>
			<Spacing margin={spacing.large.top}>
				<ShowEmbeddedContent isForArchive={isForArchive}>
					<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
						<ConstrainedImage src={link} />
					</a>
				</ShowEmbeddedContent>
			</Spacing>
			<PostArchiveLinks isForArchive={isForArchive} isTop={isTop} />
		</PostCard>
	);
}, IPostElementType.image, isValidPostElement.image);

const ConstrainedImage = tStyled.img`
	width: 100%;
	max-width: ${LayoutBreakpoint.tablet}px;
	max-height: 80vh;
`;