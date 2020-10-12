import * as React from 'react';
import { decorate } from '@/test/decorate';
import { boolean } from '@storybook/addon-knobs';
import { PromiseOutput } from '@messman/react-common';
import { DataLoad } from './data-load';
import { spacing, Spacing } from '@/core/layout/common';

export default { title: 'Services/Data/Data Load' };

export const TestDataLoad = decorate('Data Load', null, () => {

	let isLoading = boolean('Is Loading', true);
	const isError = boolean('Is Error', false);

	isLoading = isLoading && !isError;

	const promiseOutput: PromiseOutput<any> = {
		isStarted: isLoading,
		clearResults: null!,
		data: null!,
		error: isError ? new Error('Error') : null,
		reset: null!,
		startedAt: -1
	};

	return (
		<Spacing margin={spacing.large.value}>
			<DataLoad promise={promiseOutput} />
		</Spacing>
	);
});