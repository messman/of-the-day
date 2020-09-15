import * as React from 'react';
import { decorate } from '@/test/decorate';
import { text } from '@storybook/addon-knobs';
import { IPostCustom } from 'oftheday-shared';
import { Custom } from './custom';

export default { title: 'Areas/Posts/Elements/Custom' };

export const TestCustomText = decorate('Custom Text', () => {

	const custom: IPostCustom = {
		title: text('Title', 'My Custom Title'),
		value: text('Value', 'Here is the text that becomes the value of the custom section. We can write quite a bit in here. This is a pretty useful section overall.'),
		link: '',
		linkText: '',
		hiddenValue: '',
		previewLink: false
	};

	return (
		<Custom custom={custom} />
	);
});

export const TestCustomTextLink = decorate('Custom Text & Link', () => {

	const custom: IPostCustom = {
		title: text('Title', 'My Custom Title'),
		value: text('Value', 'Here is the text that becomes the value of the custom section. We can write quite a bit in here. This is a pretty useful section overall.'),
		link: 'https://google.com',
		linkText: text('Link Text', 'Facebook | Hungry Howie menu'),
		hiddenValue: '',
		previewLink: false
	};

	return (
		<Custom custom={custom} />
	);
});

export const TestCustomTextHidden = decorate('Custom Text & Hidden', () => {

	const custom: IPostCustom = {
		title: text('Title', 'My Custom Title'),
		value: text('Value', 'Here is the text that becomes the value of the custom section. We can write quite a bit in here. This is a pretty useful section overall.'),
		link: '',
		linkText: '',
		hiddenValue: text('Hidden Value', 'Haha! Here is the hidden content!'),
		previewLink: false
	};

	return (
		<Custom custom={custom} />
	);
});

export const TestCustomAll = decorate('Custom All', () => {

	const custom: IPostCustom = {
		title: text('Title', 'My Custom Title'),
		value: text('Value', 'Here is the text that becomes the value of the custom section. We can write quite a bit in here. This is a pretty useful section overall.'),
		link: 'https://google.com',
		linkText: text('Link Text', 'Facebook | Hungry Howie menu'),
		hiddenValue: text('Hidden Value', 'Haha! Here is the hidden content!'),
		previewLink: false
	};

	return (
		<Custom custom={custom} />
	);
});