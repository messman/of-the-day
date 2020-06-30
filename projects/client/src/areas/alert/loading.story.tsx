import * as React from 'react';
import { Text } from '@/core/symbol/text';
import { decorate } from '@/test/storybook/decorate';
import { boolean } from '@storybook/addon-knobs';
import { Loading } from './loading';

export default { title: 'areas/alert' };

export const TestLoading = decorate(() => {

	const isShowing = boolean('Is Showing', true);

	return (
		<Loading isLoading={isShowing} error={null}>
			<Text>
				Here is some background text.
			</Text>
		</Loading>
	);
});