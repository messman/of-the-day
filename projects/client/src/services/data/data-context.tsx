import * as React from 'react';
import { defaultInvalidFilter, IArchiveFilter, IArchiveResponse, IMeta, IOtherResponse, IPostResponse, IResponseWithMeta, isFilterSemanticallyEqual, isFilterSortSemanticallyEqual } from 'oftheday-shared';
import { clampPromise, PromiseOutput, StalePromiseTimerComponent, StalePromiseTimerOutput, useDocumentVisibility, usePromise, useStalePromiseTimer, useTruthyTimer } from '@messman/react-common';
import { CONSTANT } from '../constant';
import { matchPath, useLocation } from 'react-router-dom';
import { Route, routes } from '../nav/routing';
import { fetchArchiveResponse, fetchOtherResponse, fetchPostResponse } from './data-request';
import { DEFINE } from '../define';
import { archiveTestData, otherTestData, postsTestData } from '@/test/data';
import { sortPosts } from '../archive/sort';

/** Top-level data provider that holds our smaller providers. */
export const DataProvider: React.FC = (props) => {
	const { children } = props;

	return (
		<ApplicationRefreshTimer>
			<PostResponseProvider>
				<OtherResponseProvider>
					<MetaResponseProvider>
						<ArchiveContextProvider>
							{children}
						</ArchiveContextProvider>
					</MetaResponseProvider>
				</OtherResponseProvider>
			</PostResponseProvider>
		</ApplicationRefreshTimer>
	);
};

const ApplicationRefreshTimer: React.FC = (props) => {

	const documentVisibility = useDocumentVisibility();

	useTruthyTimer({
		isStarted: true,
		timeout: CONSTANT.appRefreshTimeout,
	}, documentVisibility, () => {
		// After we reach our timeout, reload location.
		window.location.replace('/');
	});

	return <>{props.children}</>;
};


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
							promiseFunc = () => {
								return Promise.resolve({
									posts: currentPosts
								});
							};
						}
						else {
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
const postResponseActivePages = [routes.posts];
const PostResponseProvider = createResponseProvider(PostResponseContext, postsPromiseFunc, postResponseActivePages);
export const usePostResponse = () => React.useContext(PostResponseContext);

const otherPromiseFunc = !DEFINE.isLocalData ? fetchOtherResponse : (
	function () {
		return clampPromise<IOtherResponse>(new Promise((resolve) => {
			resolve(otherTestData);
		}), CONSTANT.localDataFetchTime, null);
	}
);

const OtherResponseContext = React.createContext<PromiseOutput<IOtherResponse>>(null!);
// The other response also fetches the meta information - so request it on all other pages.
const otherResponseActivePages = [routes.other, routes.archive, routes.about];
const OtherResponseProvider = createResponseProvider(OtherResponseContext, otherPromiseFunc, otherResponseActivePages);
export const useOtherResponse = () => React.useContext(OtherResponseContext);

const MetaResponseContext = React.createContext<IMeta | null>(null);
const MetaResponseProvider: React.FC = (props) => {
	const postPromise = usePostResponse();
	const otherPromise = useOtherResponse();

	/*
		Special setup here. We want to use the more recent meta from either of the two responses.
		However, we don't want to hold the more recent one in state, 
		because if we just got a new response then we can expect our components to re-render
		and we want this meta to be available immediately on the same render.
		So instead of using state and effects - we will just run our logic every time.
		Ideally we'd be checking more information than this - using end time of promises instead of start time,
		etc.
	*/
	const meta = postPromise.data?.meta || otherPromise.data?.meta || null;

	return (
		<MetaResponseContext.Provider value={meta}>
			{props.children}
		</MetaResponseContext.Provider>
	);
};
export const useMeta = () => React.useContext(MetaResponseContext);