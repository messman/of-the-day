import { useState, useRef } from "react";

export interface PromiseInput<T> {
	promiseFunc: () => Promise<T>,
	runImmediately: boolean,
	minMilliseconds: number
}
export interface PromiseState<T> {
	isLoading: boolean,
	data: T,
	error: Error
}

export interface PromiseOutput<T> extends PromiseState<T> {
	run: (clear: boolean) => void,
	stop: (clear: boolean) => void
}

/** Wraps a promise call with a minimum timeout for smooth user experience. */
export function usePromise<T>(input: PromiseInput<T>): PromiseOutput<T> {
	const [state, setState] = useState<PromiseState<T>>({
		isLoading: input.runImmediately,
		data: null,
		error: null
	});

	// Hold our current promise as a way to guard against older promises that complete for newer promises.
	const currentPromise = useRef<Promise<T>>(null);

	function runPromise(): void {
		const startTime = Date.now();
		function wrapFinish(success: T, error: Error): void {
			// If this is from an old promise, disregard.
			if (currentPromise.current !== promise) {
				return;
			}

			// Apply our minimum time.
			const timeRemaining = Math.max(0, (input.minMilliseconds || 0) - (Date.now() - startTime));
			setTimeout(() => {
				setState({
					isLoading: false,
					data: success,
					error: error
				});
			}, timeRemaining);
		}

		const promise = input.promiseFunc();
		currentPromise.current = promise;
		promise
			.then((resp) => {
				wrapFinish(resp, null);
			})
			.catch((err: Error) => {
				wrapFinish(null, err);
			});
	}

	function updateState(isLoading: boolean, clear: boolean): void {
		// If we are clearing, clear the data and error.
		// Else, just set the loading state.
		if (clear) {
			currentPromise.current = null;
			setState(p => {
				if (p.isLoading === isLoading && !p.data && !p.error) {
					return p;
				}
				return {
					data: null,
					error: null,
					isLoading: isLoading
				}
			});
		}
		else {
			setState(p => {
				if (p.isLoading === isLoading) {
					return p;
				}
				return {
					...p,
					isLoading: isLoading
				}
			});
		}
	}

	// Run the first time if told to do so.
	const runFirstTime = useRef(input.runImmediately);
	if (runFirstTime.current) {
		runFirstTime.current = false;
		runPromise();
	}

	// Runs, which might override an existing promise.
	function run(clear: boolean): void {
		runPromise();
		updateState(true, clear);
	}

	// Stops.
	function stop(clear: boolean): void {
		updateState(false, clear);
	}

	return {
		...state,
		run,
		stop
	};
}

/** Times out a promise. */
export function promiseMaximum<T>(promise: Promise<T>, maxMilliseconds: number): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		let didTimeOut = false;
		const timeoutId = setTimeout(() => {
			didTimeOut = true;
			reject(new Error("timed out at maximum"));
		}, maxMilliseconds);
		promise.then(
			(res) => {
				if (!didTimeOut) {
					clearTimeout(timeoutId);
					resolve(res);
				}
			},
			(err) => {
				if (!didTimeOut) {
					clearTimeout(timeoutId);
					reject(err);
				}
			}
		);
	})
}