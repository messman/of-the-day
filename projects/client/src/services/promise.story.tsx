import * as React from 'react';
import { decorate } from '@/test/storybook/decorate';
import { Text } from '@/core/symbol/text';
import { button, boolean, number } from '@storybook/addon-knobs';
import { clampPromise, usePromise, clampPromiseMaximumTimeoutReason } from './promise';

export default { title: 'services' };

export const TestPromise = decorate(() => {

	const useMinimum = boolean('Use Minimum', true);
	const inputMinimum = number('Minimum', 500);
	const minimum = useMinimum ? inputMinimum : null;

	const useMaximum = boolean('Use Maximum', true);
	const inputMaximum = number('Maximum', 5000);
	const maximum = useMaximum ? inputMaximum : null;

	const actual = number('Actual', 3000);

	const clampedPromiseFunc = () => {
		return clampPromise(getTestInfo(actual), minimum, maximum);
	};

	const promiseState = usePromise({
		promiseFunc: clampedPromiseFunc,
		runImmediately: false
	});

	const clear = boolean('Clear', true);

	button('Stop', () => {
		promiseState.stop(clear);
	});

	button('Run', () => {
		promiseState.run(clear);
	});


	const random = promiseState.data?.random.toString() || '';
	const increment = promiseState.data?.increment.toString() || '';
	const error = promiseState.error?.message || '';
	const isErrorFromMaximum = error === clampPromiseMaximumTimeoutReason;

	return (
		<>
			<Text>Is Running: {promiseState.isRunning.toString()}</Text>
			<Text>Random: {random}</Text>
			<Text>Increment: {increment}</Text>
			<Text>Error: {error}</Text>
			<Text>Is From Max: {isErrorFromMaximum.toString()}</Text>
		</>
	);
});

let globalIncrement: number = 0;

interface TestInfo {
	random: number,
	increment: number;
}

async function getTestInfo(timeout: number): Promise<TestInfo> {
	return new Promise((res) => {
		window.setTimeout(() => {
			res({
				random: Math.round(Math.random() * 10),
				increment: globalIncrement++
			});
		}, timeout);
	});
}