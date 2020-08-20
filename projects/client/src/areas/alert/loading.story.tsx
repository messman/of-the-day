import * as React from 'react';
import { Text } from '@/core/symbol/text';
import { decorate } from '@/test/decorate';
import { boolean } from '@storybook/addon-knobs';
import { Loading } from './loading';

export default { title: 'Areas/Alert/Loading' };

export const TestLoading = decorate('Loading', () => {

	const isShowing = boolean('Is Showing', true);

	return (
		<Loading isLoading={isShowing} error={null}>
			<Text>
				Here is some background text.
			</Text>
		</Loading>
	);
});