import * as React from 'react';
import { wrap, usePostControl, useValue } from '@/test/decorate';
import { MusicQuote, Quote } from './quote';
import { Block, SimpleContentMaxWidthFull } from '@/core/layout/common';
import { IPostQuote } from 'oftheday-shared';

export default {
	'Music Quote': wrap(null, () => {
		const lyric = useValue('lyric', 'Cause it feels so empty without me');

		return (
			<SimpleContentMaxWidthFull>
				<Block.Dog16 />
				<MusicQuote lyric={lyric} />
				<Block.Dog16 />
			</SimpleContentMaxWidthFull>
		);
	}),

	'Single Quote': wrap(null, () => {
		const a = useValue('a', 'Get to steppin!');
		const aVoice = useValue('aVoice', 'Mike Boogie');
		const sourceText = useValue('source', 'Big Brother');
		const useSourceLink = useValue('use source link', true);
		const sourceLink = useSourceLink ? 'https://google.com' : '';

		const props = usePostControl(null, {
			quote: wrapPartialQuote({
				a: a,
				aVoice: aVoice,
				sourceText: sourceText,
				sourceLink: sourceLink
			})
		});

		return (
			<SimpleContentMaxWidthFull>
				<Block.Dog16 />
				<Quote {...props} />
			</SimpleContentMaxWidthFull>
		);
	}),

	'Anonymous Voices Quote': wrap(null, () => {
		const a = useValue('a', 'Get to steppin! This is the first part.');
		const b = useValue('b', 'I hear ya! This is the second part.');
		const sourceText = useValue('source', 'Big Brother');
		const useSourceLink = useValue('use source link', true);
		const sourceLink = useSourceLink ? 'https://google.com' : '';

		const props = usePostControl(null, {
			quote: wrapPartialQuote({
				a: a,
				b: b,
				sourceText: sourceText,
				sourceLink: sourceLink
			})
		});

		return (
			<SimpleContentMaxWidthFull>
				<Block.Dog16 />
				<Quote {...props} />
			</SimpleContentMaxWidthFull>
		);
	}),

	'Voices Quote': wrap(null, () => {
		const a = useValue('a', 'Get to steppin! This is the first part.');
		const aVoice = useValue('aVoice', 'My sister');
		const b = useValue('b', 'I hear ya! This is the second part.');
		const bVoice = useValue('bVoice', 'My friend');
		const sourceText = useValue('source', 'Big Brother');
		const useSourceLink = useValue('use source link', true);
		const sourceLink = useSourceLink ? 'https://google.com' : '';

		const props = usePostControl(null, {
			quote: wrapPartialQuote({
				a: a,
				aVoice: aVoice,
				b: b,
				bVoice: bVoice,
				sourceText: sourceText,
				sourceLink: sourceLink
			})
		});

		return (
			<SimpleContentMaxWidthFull>
				<Block.Dog16 />
				<Quote {...props} />
			</SimpleContentMaxWidthFull>
		);
	}),

	'Long Voices Quote': wrap(null, () => {
		const a = useValue('a', 'Get to steppin! This is the first part. You can see as I continue typing in here, everything should still look good. How is it?');
		const aVoice = useValue('aVoice', 'Jeremy, as he hands me a glass of cool water that I plan to take a sip of immediately');
		const b = useValue('b', 'Looks good to me! I can also continue to type in here and it ends up looking just fine. Nothing too crazy. Line break logic is difficult.');
		const bVoice = useValue('bVoice', 'Me, trying my best to throw the glass of water out the window because I did not really want it');
		const sourceText = useValue('source', 'Big Brother');
		const useSourceLink = useValue('use source link', true);
		const sourceLink = useSourceLink ? 'https://google.com' : '';

		const props = usePostControl(null, {
			quote: wrapPartialQuote({
				a: a,
				aVoice: aVoice,
				b: b,
				bVoice: bVoice,
				sourceText: sourceText,
				sourceLink: sourceLink
			})
		});

		return (
			<SimpleContentMaxWidthFull>
				<Block.Dog16 />
				<Quote {...props} />
			</SimpleContentMaxWidthFull>
		);
	})
};

const defaultQuote: IPostQuote = {
	a: '',
	aVoice: '',
	b: '',
	bVoice: '',
	sourceText: '',
	sourceLink: '',
	isTop: true,
	isNSFW: true
};

function wrapPartialQuote(quote: Partial<IPostQuote>): IPostQuote {
	return {
		...defaultQuote,
		...quote
	};
}