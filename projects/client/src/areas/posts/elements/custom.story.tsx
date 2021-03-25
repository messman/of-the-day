import * as React from 'react';
import { decorate, usePostControl, useTextParagraph } from '@/test/decorate';
import { text } from '@storybook/addon-knobs';
import { IPostCustom } from 'oftheday-shared';
import { Custom } from './custom';
import { Block, SimpleContentMaxWidthFull } from '@/core/layout/common';

export default { title: 'Areas/Posts/Elements/Custom' };

export const TestCustomText = decorate('Custom Text', null, () => {

	const custom = wrapPartialCustom({
		title: text('Title', 'My Custom Title'),
		value: useTextParagraph('Value', 'Here is the text that becomes the value of the custom section. /// We can write quite a bit in here. This is a pretty useful section overall.'),
		link: '',
		linkText: '',
		hiddenValue: '',
	});
	const props = usePostControl(null, {
		custom: custom
	});

	return (
		<SimpleContentMaxWidthFull>
			<Block.Dog16 />
			<Custom {...props} />
		</SimpleContentMaxWidthFull>
	);
});

export const TestCustomTextLink = decorate('Custom Text & Link', null, () => {

	const custom = wrapPartialCustom({
		title: text('Title', 'My Custom Title'),
		value: useTextParagraph('Value', 'Here is the text that becomes the value of the custom section. /// We can write quite a bit in here. This is a pretty useful section overall.'),
		link: 'https://google.com',
		linkText: text('Link Text', 'Facebook | Hungry Howie menu'),
		hiddenValue: '',
	});
	const props = usePostControl(null, {
		custom: custom
	});

	return (
		<SimpleContentMaxWidthFull>
			<Block.Dog16 />
			<Custom {...props} />
		</SimpleContentMaxWidthFull>
	);
});

export const TestCustomTextHidden = decorate('Custom Text & Hidden', null, () => {

	const custom = wrapPartialCustom({
		title: text('Title', 'My Custom Title'),
		value: useTextParagraph('Value', 'Here is the text that becomes the value of the custom section. /// We can write quite a bit in here. This is a pretty useful section overall.'),
		link: '',
		linkText: '',
		hiddenValue: text('Hidden Value', 'Haha! Here is the hidden content!'),
	});
	const props = usePostControl(null, {
		custom: custom
	});

	return (
		<SimpleContentMaxWidthFull>
			<Block.Dog16 />
			<Custom {...props} />
		</SimpleContentMaxWidthFull>
	);
});

export const TestCustomAll = decorate('Custom All', null, () => {

	const custom = wrapPartialCustom({
		title: text('Title', 'My Custom Title'),
		value: useTextParagraph('Value', 'Here is the text that becomes the value of the custom section. /// We can write quite a bit in here. This is a pretty useful section overall.'),
		link: 'https://google.com',
		linkText: text('Link Text', 'Facebook | Hungry Howie menu'),
		hiddenValue: text('Hidden Value', 'Haha! Here is the hidden content!'),
	});
	const props = usePostControl(null, {
		custom: custom
	});

	return (
		<SimpleContentMaxWidthFull>
			<Block.Dog16 />
			<Custom {...props} />
		</SimpleContentMaxWidthFull>
	);
});

const defaultCustom: IPostCustom = {
	title: '',
	value: [],
	link: '',
	linkText: '',
	hiddenValue: '',
	isTop: true,
	isNSFW: true
};

function wrapPartialCustom(custom: Partial<IPostCustom>): IPostCustom {
	return {
		...defaultCustom,
		...custom
	};
}