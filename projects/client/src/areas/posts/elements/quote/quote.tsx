// Handles the rendering of a quote.

import * as React from 'react';
import { IPost, IPostQuote } from 'oftheday-shared';
import { InnerQuote, InnerSingleQuote } from './quote-inner';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement, PostsElement } from '../elements-common';

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
		sourceLink: null!
	};

	return (
		<InnerSingleQuote quote={fakeQuote} />
	);
};


function shouldRenderQuote(post: IPost): boolean {
	return !!post.quote.a;
}

/** Displays the quote as a top-level post element section. */
export const Quote = createPostsElement((props) => {
	const { post } = props;

	if (!shouldRenderQuote(post)) {
		return null;
	}

	const { quote } = post;

	return (
		<Card title='Quote' icon={iconTypes.quote}>
			<InnerQuote quote={quote} />
		</Card>
	);
}, PostsElement.quote, shouldRenderQuote);