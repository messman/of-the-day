import * as React from 'react';
import { IPostResponse } from 'oftheday-shared';
import { DEFINE } from '@/services/define';
import { clampPromise, PromiseOutput, StalePromiseTimerComponent, StalePromiseTimerOutput, useDocumentVisibility, useStalePromiseTimer } from '@messman/react-common';
import { CONSTANT } from '../constant';

const PostResponseContext = React.createContext<PromiseOutput<IPostResponse>>(null!);

export const PostResponseProvider: React.FC = (props) => {

	const documentVisibility = useDocumentVisibility();

	const promiseFunc = React.useCallback<() => Promise<IPostResponse>>(async () => {
		return await clampPromise(fetchPostResponse(), CONSTANT.fetchMinTimeout, CONSTANT.fetchMaxTimeout);
	}, []);

	const promiseTimer: StalePromiseTimerOutput<IPostResponse> = useStalePromiseTimer({
		initialAction: StalePromiseTimerComponent.none,
		timerTimeout: CONSTANT.appRefreshTimeout,
		isTimerTruthy: documentVisibility,
		promiseFunc: promiseFunc,
	});

	const { timer, promise, lastCompleted } = promiseTimer;

	React.useEffect(() => {
		if (!timer.isStarted && !promise.isStarted) {
			if (lastCompleted === StalePromiseTimerComponent.timer) {
				window.location.reload();
			}
			else {
				timer.reset({
					isStarted: true
				});
			}
		}
	}, [promise, timer, lastCompleted, promiseFunc]);

	return (
		<PostResponseContext.Provider value={promiseTimer.promise}>
			{props.children}
		</PostResponseContext.Provider>
	);
};

export const usePostResponse = () => React.useContext(PostResponseContext);

export function hasPostResponseData(PostResponsePromise: PromiseOutput<IPostResponse>): boolean {
	return !!PostResponsePromise?.data?.posts;
}

async function fetchPostResponse(): Promise<IPostResponse> {

	const url = DEFINE.serverBase;

	try {
		const response = await fetch(url);
		if (response.ok) {
			try {
				return await response.json();
			}
			catch (e) {
				console.error(e);
				throw new Error('Fetch was successful, but there was a problem with deserialization.');
			}
		}
		else {
			if (response.status === 404) {
				throw new Error('The application could not connect to the API (404)');
			}
			throw new Error(`The API experienced an error (${response.status})`);
		}
	}
	catch (err) {
		if (!(err instanceof Error)) {
			err = new Error(err);
		}
		console.error(url, err);
		throw err;
	}
}


