import * as React from 'react';
import { decorate } from '@/test/decorate';
import { text, boolean } from '@storybook/addon-knobs';
import { IPostVideo } from 'oftheday-shared';
import { Video } from './video';

export default { title: 'Areas/Posts/Elements/Videos' };

export const TestVideo = decorate('Video', null, () => {

	const title = text('Title', 'Bing Bang Boom');
	const originalTitle = text('Original Title', 'Hilarious! Bing | Bang | Boom ON FX NETWORK');
	const description = text('Description', 'Here is a great video I just saw the other day that shows this that and the other thing.');
	const isRemoved = boolean('Is Removed', false);
	const hasTags = boolean('Has Tags', true);

	const video: IPostVideo = {
		title: title,
		originalTitle: originalTitle,
		description: description,
		isTop: hasTags,
		isNSFW: false,
		tags: hasTags ? ['Educational', 'Music'] : [],
		isRemoved: isRemoved,
		link: 'https://youtu.be/sFkLbj789OQ'
	};

	return (
		<Video value={video} />
	);
});