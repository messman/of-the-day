// Handles the rendering of a quote.

import * as React from 'react';
import { IPostElementType, IPostQuote, isValidPostElement } from 'oftheday-shared';
import { InnerQuote, InnerSingleQuote } from './quote-inner';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement } from '../elements-common';

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
		source: null!,
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
	return (
		<Card title='Quote' icon={iconTypes.quote}>
			<InnerQuote quote={props.value} />
		</Card>
	);
}, IPostElementType.quote, isValidPostElement.quote);