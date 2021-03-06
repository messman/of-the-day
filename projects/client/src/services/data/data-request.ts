import { IArchiveRequest, IArchiveResponse, IPostResponse } from 'oftheday-shared';
import { sortPosts } from '../archive/sort';
import { DEFINE } from '../define';
import { hasParam } from '../nav/url';

/*
	Holds the actual requests to the server, using fetch.
*/

export async function fetchPostResponse(): Promise<IPostResponse> {
	const includeFuture = hasParam('future');
	const path = includeFuture ? 'posts?future=1' : 'posts';
	return makeRequest(path);
}

export async function fetchArchiveResponse(request: IArchiveRequest): Promise<IArchiveResponse> {
	const response = await makeRequest<IArchiveResponse>('archive', request);
	return {
		posts: sortPosts(request.filter, response.posts)
	};
}

async function makeRequest<T>(path: string, postData?: {}): Promise<T> {

	const url = `${DEFINE.serverBase}/api/${path}`;
	try {
		let response: Response = null!;
		if (postData) {
			response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(postData)
			});
		}
		else {
			response = await fetch(url);
		}

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