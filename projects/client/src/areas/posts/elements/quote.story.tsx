import * as React from 'react';
import { decorate } from '@/test/decorate';
import { text, boolean } from '@storybook/addon-knobs';
import { MusicQuote, Quote } from './quote';
import { DynamicMargin } from '@/core/layout/common';
import { spacing } from '@/core/style/common';
import { IPostQuote } from 'oftheday-shared';

export default { title: 'Areas/Posts/Elements/Quotes' };

export const TestMusicQuote = decorate('Music Quote', () => {

	const lyric = text('lyric', 'Cause it feels so empty without me');

	return (
		<DynamicMargin margin={spacing.medium.value}>
			<MusicQuote lyric={lyric} />
		</DynamicMargin>
	);
});

export const TestSingleQuote = decorate('Single Quote', () => {
	const a = text('a', 'Get to steppin!');
	const aVoice = text('aVoice', 'Mike Boogie');
	const source = text('source', 'Big Brother');
	const useSourceLink = boolean('use source link', true);
	const sourceLink = useSourceLink ? 'https://google.com' : '';

	const quote: IPostQuote = {
		a: a,
		aVoice: aVoice,
		b: '',
		bVoice: '',
		source: source,
		sourceLink: sourceLink
	};

	return (
		<DynamicMargin margin={spacing.medium.value}>
			<Quote quote={quote} />
		</DynamicMargin>
	);
});

export const TestAnonymousVoicesQuote = decorate('Anonymous Voices Quote', () => {
	const a = text('a', 'Get to steppin! This is the first part.');
	const b = text('b', 'I hear ya! This is the second part.');
	const source = text('source', 'Big Brother');
	const useSourceLink = boolean('use source link', true);
	const sourceLink = useSourceLink ? 'https://google.com' : '';

	const quote: IPostQuote = {
		a: a,
		aVoice: '',
		b: b,
		bVoice: '',
		source: source,
		sourceLink: sourceLink
	};

	return (
		<DynamicMargin margin={spacing.medium.value}>
			<Quote quote={quote} />
		</DynamicMargin>
	);
});

export const TestVoicesQuote = decorate('Voices Quote', () => {
	const a = text('a', 'Get to steppin! This is the first part.');
	const aVoice = text('aVoice', 'My sister');
	const b = text('b', 'I hear ya! This is the second part.');
	const bVoice = text('bVoice', 'My friend');
	const source = text('source', 'Big Brother');
	const useSourceLink = boolean('use source link', true);
	const sourceLink = useSourceLink ? 'https://google.com' : '';

	const quote: IPostQuote = {
		a: a,
		aVoice: aVoice,
		b: b,
		bVoice: bVoice,
		source: source,
		sourceLink: sourceLink
	};

	return (
		<DynamicMargin margin={spacing.medium.value}>
			<Quote quote={quote} />
		</DynamicMargin>
	);
});

export const TestLongVoicesQuote = decorate('Long Voices Quote', () => {
	const a = text('a', 'Get to steppin! This is the first part. You can see as I continue typing in here, everything should still look good. How is it?');
	const aVoice = text('aVoice', 'Jeremy, as he hands me a glass of cool water that I plan to take a sip of immediately');
	const b = text('b', 'Looks good to me! I can also continue to type in here and it ends up looking just fine. Nothing too crazy. Line break logic is difficult.');
	const bVoice = text('bVoice', 'Me, trying my best to throw the glass of water out the window because I did not really want it');
	const source = text('source', 'Big Brother');
	const useSourceLink = boolean('use source link', true);
	const sourceLink = useSourceLink ? 'https://google.com' : '';

	const quote: IPostQuote = {
		a: a,
		aVoice: aVoice,
		b: b,
		bVoice: bVoice,
		source: source,
		sourceLink: sourceLink
	};

	return (
		<DynamicMargin margin={spacing.medium.value}>
			<Quote quote={quote} />
		</DynamicMargin>
	);
});