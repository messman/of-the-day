import * as React from 'react';
import { decorate } from '@/test/decorate';
import { text } from '@storybook/addon-knobs';
import { IPost, IPostCustom } from 'oftheday-shared';
import { Custom } from './custom';

export default { title: 'Areas/Posts/Elements/Custom' };

export const TestCustomText = decorate('Custom Text', null, () => {

	const post = createPostFromCustom({
		title: text('Title', 'My Custom Title'),
		value: text('Value', 'Here is the text that becomes the value of the custom section. We can write quite a bit in here. This is a pretty useful section overall.'),
		link: '',
		linkText: '',
		hiddenValue: '',
		previewLink: false
	});

	return (
		<Custom post={post} />
	);
});

export const TestCustomTextLink = decorate('Custom Text & Link', null, () => {

	const post = createPostFromCustom({
		title: text('Title', 'My Custom Title'),
		value: text('Value', 'Here is the text that becomes the value of the custom section. We can write quite a bit in here. This is a pretty useful section overall.'),
		link: 'https://google.com',
		linkText: text('Link Text', 'Facebook | Hungry Howie menu'),
		hiddenValue: '',
		previewLink: false
	});

	return (
		<Custom post={post} />
	);
});

export const TestCustomTextHidden = decorate('Custom Text & Hidden', null, () => {

	const post = createPostFromCustom({
		title: text('Title', 'My Custom Title'),
		value: text('Value', 'Here is the text that becomes the value of the custom section. We can write quite a bit in here. This is a pretty useful section overall.'),
		link: '',
		linkText: '',
		hiddenValue: text('Hidden Value', 'Haha! Here is the hidden content!'),
		previewLink: false
	});

	return (
		<Custom post={post} />
	);
});

export const TestCustomAll = decorate('Custom All', null, () => {

	const post = createPostFromCustom({
		title: text('Title', 'My Custom Title'),
		value: text('Value', 'Here is the text that becomes the value of the custom section. We can write quite a bit in here. This is a pretty useful section overall.'),
		link: 'https://google.com',
		linkText: text('Link Text', 'Facebook | Hungry Howie menu'),
		hiddenValue: text('Hidden Value', 'Haha! Here is the hidden content!'),
		previewLink: false
	});

	return (
		<Custom post={post} />
	);
});

function createPostFromCustom(custom: IPostCustom): IPost {
	return {
		custom: custom
	} as unknown as IPost;
}