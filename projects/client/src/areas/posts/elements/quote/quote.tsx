// Handles the rendering of a quote.

import * as React from 'react';
import { IPostElementType, IPostQuote, isValidPostElement } from 'oftheday-shared';
import { InnerQuote, InnerSingleQuote } from './quote-inner';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement, PostArchiveLinks, PostCard } from '../elements-common';
import { TagList, useTags } from '../tag';
import { Spacing, spacing } from '@/core/layout/common';
import { CardPadding } from '@/core/card/card';

export interface MusicQuoteProps {
	lyric: string;
}

/** Made specifically for Music by only showing the lyric, with no title or attribution. */
export const MusicQuote: React.FC<MusicQuoteProps> = (props) => {
	const { lyric } = props;

	// Required
	if (!lyric) {
		return null;
	}

	const fakeQuote: IPostQuote = {
		a: lyric,
		aVoice: null!,
		b: null!,
		bVoice: null!,
		sourceText: null!,
		sourceLink: null!,
		isTop: false,
		isNSFW: false
	};

	return (
		<InnerSingleQuote quote={fakeQuote} />
	);
};

/** Displays the quote as a top-level post element section. */
export const Quote = createPostsElement<IPostQuote>((props) => {
	const { isForArchive, archivePost } = props;
	const { isNSFW, isTop } = props.value;

	const tagsStrings = useTags(isTop, isNSFW);

	return (
		<PostCard title='Quote' icon={iconTypes.quote} isForArchive={isForArchive} archivePost={archivePost}>
			<CardPadding>
				<TagList tags={tagsStrings} />
				<Spacing margin={spacing.large.top}>
					<InnerQuote quote={props.value} />
				</Spacing>
				<PostArchiveLinks isForArchive={isForArchive} isTop={isTop} />
			</CardPadding>
		</PostCard>
	);
}, IPostElementType.quote, isValidPostElement.quote);