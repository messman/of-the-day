import * as React from 'react';
import { wrap, usePostControl, useTextParagraph, useValue } from '@/test/decorate';
import { IPostCustom } from 'oftheday-shared';
import { Custom } from './custom';
import { Block, SimpleContentMaxWidthFull } from '@/core/layout/common';

export default {
	'Custom Text': wrap(null, () => {

		const custom = wrapPartialCustom({
			title: useValue('Title', 'My Custom Title'),
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
	}),
	'Custom Text & Link': wrap(null, () => {

		const custom = wrapPartialCustom({
			title: useValue('Title', 'My Custom Title'),
			value: useTextParagraph('Value', 'Here is the text that becomes the value of the custom section. /// We can write quite a bit in here. This is a pretty useful section overall.'),
			link: 'https://google.com',
			linkText: useValue('Link Text', 'Facebook | Hungry Howie menu'),
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
	}),
	'Custom Text & Hidden': wrap(null, () => {

		const custom = wrapPartialCustom({
			title: useValue('Title', 'My Custom Title'),
			value: useTextParagraph('Value', 'Here is the text that becomes the value of the custom section. /// We can write quite a bit in here. This is a pretty useful section overall.'),
			link: '',
			linkText: '',
			hiddenValue: useValue('Hidden Value', 'Haha! Here is the hidden content!'),
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
	}),
	'Custom All': wrap(null, () => {

		const custom = wrapPartialCustom({
			title: useValue('Title', 'My Custom Title'),
			value: useTextParagraph('Value', 'Here is the text that becomes the value of the custom section. /// We can write quite a bit in here. This is a pretty useful section overall.'),
			link: 'https://google.com',
			linkText: useValue('Link Text', 'Facebook | Hungry Howie menu'),
			hiddenValue: useValue('Hidden Value', 'Haha! Here is the hidden content!'),
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
	})
};

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