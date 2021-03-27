import * as React from 'react';
import { useValue, wrap } from '@/test/decorate';
import { PromiseOutput } from '@messman/react-common';
import { DataLoad } from './data-load';
import { Margin } from '@/core/layout/common';

export default wrap(null, () => {

	let isLoading = useValue('Is Loading', true);
	const isError = useValue('Is Error', false);

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
		<Margin.Elf24>
			<DataLoad promise={promiseOutput} />
		</Margin.Elf24>
	);
});