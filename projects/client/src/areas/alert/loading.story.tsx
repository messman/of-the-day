import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { decorate } from '@/test/decorate';
import { boolean } from '@storybook/addon-knobs';
import { Loading } from './loading';

export default { title: 'Areas/Alert/Loading' };

export const TestLoading = decorate('Loading', null, () => {

	const isShowing = boolean('Is Showing', true);

	return (
		<Loading isLoading={isShowing} error={null}>
			<RegularText>
				Here is some background text.
			</RegularText>
		</Loading>
	);
});