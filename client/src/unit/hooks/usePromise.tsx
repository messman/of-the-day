import { useState, useRef } from "react";

export interface PromiseState<T> {
	isLoading: boolean,
	success: T,
	error: Error
}

export function usePromise<T>(promiseFunc: () => Promise<T>, minMilliseconds?: number): PromiseState<T> {
	const [state, setState] = useState<PromiseState<T>>({
		isLoading: true,
		success: null,
		error: null
	});

	const isFirstRun = useRef(true);

	if (isFirstRun.current) {
		isFirstRun.current = false;

		const start = Date.now();

		function wrapFinish(success: T, error: Error): void {
			const timeRemaining = Math.max(0, (minMilliseconds || 0) - (Date.now() - start));
			if (timeRemaining === 0) {
				finish(success, error);
			}
			else {
				setTimeout(() => {
					finish(success, error)
				}, timeRemaining);
			}
		}

		function finish(success: T, error: Error): void {
			setState({
				isLoading: false,
				success: success,
				error: error,
			});
		}

		promiseFunc()
			.then((resp) => {
				wrapFinish(resp, null);
			})
			.catch((err: Error) => {
				wrapFinish(null, err);
			});
	}
	return state;
}