import * as React from 'react';
import { defaultInvalidFilter, IArchiveFilter, IArchiveResponse, IOtherResponse, IPostResponse } from 'oftheday-shared';
import { clampPromise, PromiseOutput, StalePromiseTimerComponent, StalePromiseTimerOutput, useDocumentVisibility, usePromise, useStalePromiseTimer, useTruthyTimer } from '@messman/react-common';
import { CONSTANT } from '../constant';
import { matchPath, useLocation } from 'react-router-dom';
import { Route, routes } from '../nav/routing';
import { fetchArchiveResponse, fetchOtherResponse, fetchPostResponse } from './data-request';

/** Top-level data provider that holds our smaller providers. */
export const DataProvider: React.FC = (props) => {
	const { children } = props;

	return (
		<ApplicationRefreshTimer>
			<PostResponseProvider>
				<OtherResponseProvider>
					<ArchiveContextProvider>
						{children}
					</ArchiveContextProvider>
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
		window.location.reload();
	});

	return <>{props.children}</>;
};


export interface ArchiveContext {
	promise: PromiseOutput<IArchiveResponse>;
	filter: IArchiveFilter;
	applyFilter: (filter: IArchiveFilter) => void;
}

const ArchiveResponseContext = React.createContext<ArchiveContext>(null!);

export const ArchiveContextProvider: React.FC = (props) => {

	const [filter, setFilter] = React.useState<IArchiveFilter>(defaultInvalidFilter);

	const promise = usePromise<IArchiveResponse>({
		isStarted: false,
		promiseFunc: null!
	});

	const context = React.useMemo<ArchiveContext>(() => {

		function applyFilter() {
			promise.reset({
				isStarted: true,
				promiseFunc: async () => {
					return await clampPromise(fetchArchiveResponse({
						filter: filter
					}), CONSTANT.fetchMinTimeout, CONSTANT.fetchMaxTimeout);
				}
			});

			setFilter(filter);
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

function createResponseProvider<T>(ResponseContext: React.Context<PromiseOutput<T>>, responseFunc: () => Promise<T>, routes: Route[]): React.FC {
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
				if (lastCompleted === StalePromiseTimerComponent.timer) {
					promise.reset({
						isStarted: true
					});
				}
				else {
					timer.reset({
						isStarted: true
					});
				}
			}
		}, [promise, timer, lastCompleted, promiseFunc]);

		return (
			<ResponseContext.Provider value={promiseTimer.promise}>
				{props.children}
			</ResponseContext.Provider>
		);
	};
}


const PostResponseContext = React.createContext<PromiseOutput<IPostResponse>>(null!);
const postResponseActivePages = [routes.posts];
const PostResponseProvider = createResponseProvider(PostResponseContext, fetchPostResponse, postResponseActivePages);
export const usePostResponse = () => React.useContext(PostResponseContext);

const OtherResponseContext = React.createContext<PromiseOutput<IOtherResponse>>(null!);
const otherResponseActivePages = [routes.other];
const OtherResponseProvider = createResponseProvider(OtherResponseContext, fetchOtherResponse, otherResponseActivePages);
export const useOtherResponse = () => React.useContext(PostResponseContext);