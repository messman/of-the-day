import * as React from 'react';
import { decorate, usePostControl } from '@/test/decorate';
import { text, boolean } from '@storybook/addon-knobs';
import { MusicQuote, Quote } from './quote';
import { Block, SimpleContentMaxWidth } from '@/core/layout/common';
import { IPostQuote } from 'oftheday-shared';

export default { title: 'Areas/Posts/Elements/Quotes' };

export const TestMusicQuote = decorate('Music Quote', null, () => {

	const lyric = text('lyric', 'Cause it feels so empty without me');

	return (
		<SimpleContentMaxWidth>
			<Block.Dog16 />
			<MusicQuote lyric={lyric} />
			<Block.Dog16 />
		</SimpleContentMaxWidth>
	);
});

export const TestSingleQuote = decorate('Single Quote', null, () => {
	const a = text('a', 'Get to steppin!');
	const aVoice = text('aVoice', 'Mike Boogie');
	const sourceText = text('source', 'Big Brother');
	const useSourceLink = boolean('use source link', true);
	const sourceLink = useSourceLink ? 'https://google.com' : '';

	const { post, isForArchive, hideTitle } = usePostControl(null, {
		quote: wrapPartialQuote({
			a: a,
			aVoice: aVoice,
			sourceText: sourceText,
			sourceLink: sourceLink
		})
	});

	return (
		<SimpleContentMaxWidth>
			<Block.Dog16 />
			<Quote hideTitle={hideTitle} isForArchive={isForArchive} post={post} />
		</SimpleContentMaxWidth>
	);
});

export const TestAnonymousVoicesQuote = decorate('Anonymous Voices Quote', null, () => {
	const a = text('a', 'Get to steppin! This is the first part.');
	const b = text('b', 'I hear ya! This is the second part.');
	const sourceText = text('source', 'Big Brother');
	const useSourceLink = boolean('use source link', true);
	const sourceLink = useSourceLink ? 'https://google.com' : '';

	const { post, isForArchive, hideTitle } = usePostControl(null, {
		quote: wrapPartialQuote({
			a: a,
			b: b,
			sourceText: sourceText,
			sourceLink: sourceLink
		})
	});

	return (
		<SimpleContentMaxWidth>
			<Block.Dog16 />
			<Quote hideTitle={hideTitle} isForArchive={isForArchive} post={post} />
		</SimpleContentMaxWidth>
	);
});

export const TestVoicesQuote = decorate('Voices Quote', null, () => {
	const a = text('a', 'Get to steppin! This is the first part.');
	const aVoice = text('aVoice', 'My sister');
	const b = text('b', 'I hear ya! This is the second part.');
	const bVoice = text('bVoice', 'My friend');
	const sourceText = text('source', 'Big Brother');
	const useSourceLink = boolean('use source link', true);
	const sourceLink = useSourceLink ? 'https://google.com' : '';

	const { post, isForArchive, hideTitle } = usePostControl(null, {
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
		<SimpleContentMaxWidth>
			<Block.Dog16 />
			<Quote hideTitle={hideTitle} isForArchive={isForArchive} post={post} />
		</SimpleContentMaxWidth>
	);
});

export const TestLongVoicesQuote = decorate('Long Voices Quote', null, () => {
	const a = text('a', 'Get to steppin! This is the first part. You can see as I continue typing in here, everything should still look good. How is it?');
	const aVoice = text('aVoice', 'Jeremy, as he hands me a glass of cool water that I plan to take a sip of immediately');
	const b = text('b', 'Looks good to me! I can also continue to type in here and it ends up looking just fine. Nothing too crazy. Line break logic is difficult.');
	const bVoice = text('bVoice', 'Me, trying my best to throw the glass of water out the window because I did not really want it');
	const sourceText = text('source', 'Big Brother');
	const useSourceLink = boolean('use source link', true);
	const sourceLink = useSourceLink ? 'https://google.com' : '';

	const { post, isForArchive, hideTitle } = usePostControl(null, {
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
		<SimpleContentMaxWidth>
			<Block.Dog16 />
			<Quote hideTitle={hideTitle} isForArchive={isForArchive} post={post} />
		</SimpleContentMaxWidth>
	);
});

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