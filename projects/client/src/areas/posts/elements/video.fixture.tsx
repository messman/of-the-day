import * as React from 'react';
import { wrap, usePostControl, useTextParagraph, useValue } from '@/test/decorate';
import { IPostVideo } from 'oftheday-shared';
import { Video } from './video';
import { Block, SimpleContentMaxWidthFull } from '@/core/layout/common';

export default wrap(null, () => {

	const customTitle = useValue('Custom Title', '');
	const customTitleCreator = useValue('Custom Title Creator', '');
	const originalTitle = useValue('Original Title', 'Hilarious! Bing | Bang | Boom ON FX NETWORK');
	const description = useTextParagraph('Description', 'Here is a great video I just saw the other day that shows this /// that /// and the other thing.');
	const isRemoved = useValue('Is Removed', false);
	const hasTags = useValue('Has Tags', true);

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

	const props = usePostControl(null, {
		video: video
	});

	return (
		<SimpleContentMaxWidthFull>
			<Block.Dog16 />
			<Video {...props} />
		</SimpleContentMaxWidthFull>
	);
});