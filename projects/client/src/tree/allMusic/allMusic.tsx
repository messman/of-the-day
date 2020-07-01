// // Currently not used - was going to show all the music selections in one view, but it might be too much work to scale.
// // May come up with an alternate 'archive' section that shows all data.

// import * as React from 'react';
// import { usePromise, PromiseOutput, promiseMaximum } from '@/unit/hooks/usePromise';
// import { MusicRecord } from '@/data/apiResponse';
// import { fetchApi, FetchErr, fetchMinMilliseconds, fetchMaxMilliseconds } from '@/data/fetch';
// import { Music } from '@/unit/components/music';
// import * as Common from '@/styles/common';
// import { LoadingIcon, IconPad } from '@/unit/components/icon';
// import { DayTitle } from '../days/sections/day';

// export const AllMusic: React.FC = () => {

// 	const { isLoading, data, error, run } = useAllMusicAppData();

// 	React.useEffect(() => {
// 		if (!isLoading && !data && !error) {
// 			run(false);
// 		}
// 	}, [isLoading, data, error]);

// 	if (error) {
// 		return <FetchErr />;
// 	}
// 	else if (isLoading) {
// 		return <LoadingIcon />;
// 	}
// 	else if (!data) {
// 		return null;
// 	}

// 	const music = data.map(m => {
// 		return (
// 			<div key={m.dayNumber}>
// 				<DayTitle day={m} />
// 				<Music record={m} />
// 			</div>
// 		);
// 	});

// 	return (
// 		<>
// 			{music}
// 		</>
// 	);
// }


// const AllMusicAppDataContext = React.createContext<PromiseOutput<MusicRecord[]>>(null);

// const url = 'https://agm-of-the-day.azurewebsites.net/api/AllMusic';
// function getData(): Promise<MusicRecord[]> {
// 	return promiseMaximum(fetchApi(url), fetchMaxMilliseconds);
// }

// export const AllMusicAppData: React.FC = (props) => {
// 	const promiseOutput = usePromise<MusicRecord[]>({
// 		promiseFunc: getData,
// 		runImmediately: false,
// 		minMilliseconds: fetchMinMilliseconds
// 	});

// 	return (
// 		<AllMusicAppDataContext.Provider value={promiseOutput}>
// 			{props.children}
// 		</AllMusicAppDataContext.Provider>
// 	);
// }

// const useAllMusicAppData = () => React.useContext(AllMusicAppDataContext);
