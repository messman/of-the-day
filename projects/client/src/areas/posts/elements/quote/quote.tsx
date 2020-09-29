// Handles the rendering of a quote.

import * as React from 'react';
import { IPostQuote } from 'oftheday-shared';
import { InnerQuote, InnerSingleQuote } from './quote-inner';
import { CardFlow } from '@/core/card/card-flow';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';

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


export interface QuoteProps {
	quote: IPostQuote;
}

/** Displays the quote as a top-level post element section. */
export const Quote: React.FC<QuoteProps> = (props) => {
	const { quote } = props;
	const { a } = quote;
	if (!a) {
		return null;
	}

	return (
		<CardFlow>
			<Card title='Quote' icon={iconTypes.quote}>
				<InnerQuote quote={quote} />
			</Card>
		</CardFlow>
	);
};

