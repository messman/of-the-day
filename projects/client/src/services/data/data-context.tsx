import * as React from 'react';
import { defaultInvalidFilter, IArchiveFilter, IArchiveResponse, IMeta, IPostResponse, IResponseWithMeta, isFilterSemanticallyEqual, isFilterSortSemanticallyEqual } from 'oftheday-shared';
import { clampPromise, PromiseOutput, StalePromiseTimerComponent, StalePromiseTimerOutput, useDocumentVisibility, usePromise, useStalePromiseTimer, useTruthyTimer } from '@messman/react-common';
import { CONSTANT } from '../constant';
import { matchPath, useLocation } from 'react-router-dom';
import { Route, routes } from '../nav/routing';
import { fetchArchiveResponse, fetchPostResponse } from './data-request';
import { DEFINE } from '../define';
import { archiveTestData, postsTestData } from '@/test/data';
import { sortPosts } from '../archive/sort';

/** Top-level data provider that holds our smaller providers. */
export const DataProvider: React.FC = (props) => {
	const { children } = props;

	return (
		<ApplicationRefreshTimer>
			<PostResponseProvider>
				<MetaResponseProvider>
					<ArchiveContextProvider>
						{children}
					</ArchiveContextProvider>
				</MetaResponseProvider>
			</PostResponseProvider>
		</ApplicationRefreshTimer>
	);
};

/**
 * Refreshes the application after a certain amount of time,
 * once the application is visible.
 * Used to re-download HTML from the server. On iOS Safari, if the site
 * is on the home screen as an app, it won't ever automatically refresh otherwise
 * (and the user can't make it refresh).
*/
const ApplicationRefreshTimer: React.FC = (props) => {

	const documentVisibility = useDocumentVisibility();

	useTruthyTimer({
		isStarted: true,
		timeout: CONSTANT.appRefreshTimeout,
	}, documentVisibility, () => {
		// After we reach our timeout, reload location.
		// TODO - keep the URL params on the end.
		window.location.replace('/');
	});

	return <>{props.children}</>;
};

/*
	Archive Context - controls the filter that is used for the archive.
	When a new filter is set (from anywhere), it requests the data for the filter.
*/

export interface ArchiveContext {
	promise: PromiseOutput<IArchiveResponse>;
	filter: IArchiveFilter;
	applyFilter: (filter: IArchiveFilter) => void;
}

const ArchiveResponseContext = React.createContext<ArchiveContext>(null!);
export const useArchiveResponseContext = () => React.useContext(ArchiveResponseContext);

function localArchivePromiseFunc() {
	return clampPromise<IArchiveResponse>(new Promise((resolve) => {
		resolve(archiveTestData);
	}), CONSTANT.localDataFetchTime, null);
}

function createArchivePromiseFunc(filter: IArchiveFilter) {
	return async () => {
		return await clampPromise(fetchArchiveResponse({
			filter: filter
		}), CONSTANT.fetchMinTimeout, CONSTANT.fetchMaxTimeout);
	};
}

export const ArchiveContextProvider: React.FC = (props) => {

	const [filter, setFilter] = React.useState<IArchiveFilter>(defaultInvalidFilter);

	const promise = usePromise<IArchiveResponse>({
		isStarted: false,
		promiseFunc: null!
	});

	const context = React.useMemo<ArchiveContext>(() => {

		function applyFilter(newFilter: IArchiveFilter) {
			setFilter(newFilter);

			let promiseFunc: () => Promise<IArchiveResponse> = null!;
			if (DEFINE.isLocalData) {
				promiseFunc = localArchivePromiseFunc;
			}
			else {
				let useShortCircuitPromise = false;

				// We handle sorting on the client-side, not the server side. 
				// Here's where we can 'short-circuit' to just re-sort the same data. 
				if (promise.data) {
					const currentPosts = promise.data.posts;
					const isEqual = isFilterSemanticallyEqual(filter, newFilter);
					if (isEqual) {
						useShortCircuitPromise = true;
						const isSortEqual = isFilterSortSemanticallyEqual(filter, newFilter);
						if (isSortEqual) {
							// Sort is equal, return the same.
							promiseFunc = () => {
								return Promise.resolve({
									posts: currentPosts
								});
							};
						}
						else {
							// Sort is unequal, re-sort.
							promiseFunc = () => {
								return Promise.resolve({
									posts: sortPosts(newFilter, currentPosts)
								});
							};
						}
					}
				}

				if (!useShortCircuitPromise) {
					promiseFunc = createArchivePromiseFunc(newFilter);
				}
			}

			promise.reset({
				isStarted: true,
				promiseFunc: promiseFunc
			});
		}

		return {
			filter: filter,
			applyFilter: applyFilter,
			promise: promise
		};

	}, [filter, setFilter, promise]);

	return (
		<ArchiveResponseContext.Provider value={context}>
			{props.children}
		</ArchiveResponseContext.Provider>
	);
};

/** Returns true if any of the routes are the current route. */
function useIsAnyRouteActive(routesSubset: Route[]): boolean {
	const location = useLocation();
	return React.useMemo(() => {
		return routesSubset.some((route) => {
			return !!matchPath(location.pathname, {
				path: route.path,
				exact: route === routes.posts // home
			});
		});
	}, [location.pathname]);
}

/** Creates a React Provider that automatically refreshes itself after a certain time and also automatically fires the request when the correct page is active. */
function createResponseProvider<T extends IResponseWithMeta>(ResponseContext: React.Context<PromiseOutput<T>>, responseFunc: () => Promise<T>, routes: Route[]): React.FC {
	return (props) => {
		const documentVisibility = useDocumentVisibility();
		const isAnyRouteActive = useIsAnyRouteActive(routes);

		const promiseFunc = React.useCallback<() => Promise<T>>(async () => {
			return await clampPromise(responseFunc(), CONSTANT.fetchMinTimeout, CONSTANT.fetchMaxTimeout);
		}, []);

		const promiseTimer: StalePromiseTimerOutput<T> = useStalePromiseTimer({
			initialAction: StalePromiseTimerComponent.none,
			timerTimeout: CONSTANT.staleDataTimeout,
			isTimerTruthy: documentVisibility && isAnyRouteActive,
			promiseFunc: promiseFunc,
		});

		const { timer, promise, lastCompleted } = promiseTimer;

		React.useEffect(() => {
			if (!timer.isStarted && !promise.isStarted) {
				if (lastCompleted === StalePromiseTimerComponent.promise) {
					if (promise.data && promise.data.meta && promise.data.meta.shutdown && promise.data.meta.shutdown.length) {
						return;
					}
					timer.reset({
						isStarted: true
					});
				}
				else if (documentVisibility && isAnyRouteActive) {
					promise.reset({
						isStarted: true
					});
				}
			}
		}, [promise, timer, lastCompleted, documentVisibility, isAnyRouteActive]);

		return (
			<ResponseContext.Provider value={promiseTimer.promise}>
				{props.children}
			</ResponseContext.Provider>
		);
	};
}

const postsPromiseFunc = !DEFINE.isLocalData ? fetchPostResponse : (
	function () {
		return clampPromise<IPostResponse>(new Promise((resolve) => {
			resolve(postsTestData);
		}), CONSTANT.localDataFetchTime, null);
	}
);

const PostResponseContext = React.createContext<PromiseOutput<IPostResponse>>(null!);
const postResponseActivePages = [routes.posts, routes.archive, routes.about];
const PostResponseProvider = createResponseProvider(PostResponseContext, postsPromiseFunc, postResponseActivePages);
export const usePostResponse = () => React.useContext(PostResponseContext);


/*
	The Posts and Other responses both contain Meta information.
	This provider collects the meta from either one and makes it available.
*/
const MetaResponseContext = React.createContext<IMeta | null>(null);
const MetaResponseProvider: React.FC = (props) => {
	const postPromise = usePostResponse();

	const meta = postPromise.data?.meta || null;

	return (
		<MetaResponseContext.Provider value={meta}>
			{props.children}
		</MetaResponseContext.Provider>
	);
};
export const useMeta = () => React.useContext(MetaResponseContext);