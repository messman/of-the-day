import * as React from 'react';
import { decorate, usePostControl, useTextParagraph } from '@/test/decorate';
import { text, boolean } from '@storybook/addon-knobs';
import { IPostVideo } from 'oftheday-shared';
import { Video } from './video';
import { Block, SimpleContentMaxWidthFull } from '@/core/layout/common';

export default { title: 'Areas/Posts/Elements/Videos' };

export const TestVideo = decorate('Video', null, () => {

	const customTitle = text('Custom Title', '');
	const customTitleCreator = text('Custom Title Creator', '');
	const originalTitle = text('Original Title', 'Hilarious! Bing | Bang | Boom ON FX NETWORK');
	const description = useTextParagraph('Description', 'Here is a great video I just saw the other day that shows this /// that /// and the other thing.');
	const isRemoved = boolean('Is Removed', false);
	const hasTags = boolean('Has Tags', true);

	const video: IPostVideo = {
		customTitle: customTitle,
		customTitleCreator: customTitleCreator,
		originalTitle: originalTitle,
		description: description,
		isTop: hasTags,
		isNSFW: false,
		tags: hasTags ? ['Educational', 'Music'] : [],
		isRemoved: isRemoved,
		link: 'https://youtu.be/sFkLbj789OQ'
	};

	const { post, isForArchive, isOfSameElement } = usePostControl(null, {
		video: video
	});

	return (
		<SimpleContentMaxWidthFull>
			<Block.Dog16 />
			<Video isForArchive={isForArchive} isOfSameElement={isOfSameElement} post={post} />
		</SimpleContentMaxWidthFull>
	);
});