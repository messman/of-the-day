// Handles the rendering of a quote.

import * as React from 'react';
import { IPostElementType, IPostQuote } from 'oftheday-shared';
import { InnerQuote, InnerSingleQuote } from './quote-inner';
import { iconTypes } from '@/core/symbol/icon';
import { TagList, useTags } from '../tag';
import { Block } from '@/core/layout/common';
import { ElementActions } from '../../element-action-overlay';
import { PostElementCard, PostElementProps } from '../../card/card';

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
export const Quote: React.FC<PostElementProps> = (props) => {
	const { isForArchive, isOfSameElement, post } = props;
	const { isNSFW, isTop } = post.quote!;

	const tagsStrings = useTags(isTop, isNSFW);

	return (
		<PostElementCard
			title='Quote'
			icon={iconTypes.quote}
			post={post}
			isForArchive={isForArchive}
			isOfSameElement={isOfSameElement}
			actionsRender={
				<ElementActions
					isViewingArchive={isForArchive}
					elementType={IPostElementType.quote}
					isTop={isTop}
				/>
			}
		>
			<TagList tags={tagsStrings} />
			<Block.Dog16 />
			<InnerQuote quote={post.quote!} />
		</PostElementCard>
	);
};