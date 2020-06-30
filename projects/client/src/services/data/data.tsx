import * as React from 'react';
import { usePromise, PromiseOutput } from '../promise';


const AllResponseContext = React.createContext<PromiseOutput<string>>(null!);

export const AllResponseProvider: React.FC = (props) => {

	const promiseState = usePromise({
		promiseFunc: async () => await 'hello',
		runImmediately: true
	});

	return (
		<AllResponseContext.Provider value={promiseState}>
			{props.children}
		</AllResponseContext.Provider>
	);
};

// function createPromiseFunc(localDataPhrase: string | null): () => Promise<AllResponseSuccess> {
// 	let promiseFunc: () => Promise<AllResponse> = fetchAllResponse;
// 	let minTimeout: number = CONSTANT.fetchMinTimeout;

// 	if (localDataPhrase) {
// 		const localData = DEFINE.localTestData![localDataPhrase];
// 		promiseFunc = async () => { return localData; };
// 		minTimeout = CONSTANT.localTestDataMinTimeout;
// 	}

// 	const errorWrappedPromiseFunc = async (): Promise<AllResponseSuccess> => {
// 		try {
// 			const result = await promiseFunc();
// 			if (result.error) {
// 				// Log errors coming in from the API.
// 				console.error('Errors received from successful fetch', result.error.errors);
// 				throw new Error('Errors received from result of fetch');
// 			}
// 			return {
// 				info: result.info,
// 				all: result.all!,
// 				error: null
// 			};
// 		}
// 		catch (e) {
// 			console.error(e);
// 			throw e;
// 		}
// 	};

// 	return () => {
// 		return clampPromise(errorWrappedPromiseFunc(), minTimeout, CONSTANT.fetchMaxTimeout);
// 	};
// }

// export const useAllResponse = () => React.useContext(AllResponseContext);

// export function hasAllResponseData(allResponsePromise: PromiseOutput<AllResponseSuccess>): boolean {
// 	return !!allResponsePromise?.data?.all;
// }

// async function fetchAllResponse(): Promise<AllResponse> {

// 	const url = DEFINE.fetchUrl;

// 	try {
// 		const response = await fetch(url);
// 		if (response.ok) {
// 			try {
// 				const text = await response.text();
// 				return deserialize(text);
// 			}
// 			catch (e) {
// 				console.error(e);
// 				throw new Error('Fetch was successful, but there was a problem with deserialization.');
// 			}
// 		}
// 		else {
// 			if (response.status === 404) {
// 				throw new Error('The application could not connect to the API (404)');
// 			}
// 			throw new Error(`The API experienced an error (${response.status})`);
// 		}
// 	}
// 	catch (err) {
// 		if (!(err instanceof Error)) {
// 			err = new Error(err);
// 		}
// 		console.error(url, err);
// 		throw err;
// 	}
// }


