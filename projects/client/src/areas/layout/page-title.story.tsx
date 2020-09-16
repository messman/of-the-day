import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Flex } from '@messman/react-common';
import { number } from '@storybook/addon-knobs';

export default { title: 'Areas/Layout/Page Title' };

export const TestPageTitle = decorate('Page Title', () => {

	const postIndex = number('Post Index', 0, { min: 0, max: postsTestData.length - 1 });
	const post = postsTestData[postIndex];

	return (
		<Flex>
			<Post
				post={post}
			/>
		</Flex>
	);
});