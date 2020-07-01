// // Handles the main view you see upon loading the app - multiple days and basic information.

// import * as React from 'react';
// import { usePromise, PromiseOutput, promiseMaximum } from '@/unit/hooks/usePromise';
// import { OfTheDayData } from '@/data/apiResponse';
// import { fetchApi, fetchMinMilliseconds, fetchMaxMilliseconds, FetchErr } from '@/data/fetch';
// import * as Common from '@/styles/common';
// import { Checklist } from './sections/checklist';
// import { Day } from './sections/day';
// import { LoadingIcon, IconPad } from '@/unit/components/icon';
// import { If } from '@/unit/components/if';
// import { faPlay, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
// import { IconTitle } from '@/unit/components/iconTitle';
// import { hasParam } from '@/data/url';

// export const Days: React.FC = () => {

// 	// Load our API data state.
// 	const { isLoading, data, error, run } = useOfTheDayAppData();

// 	// If we have not loaded, start the request.
// 	React.useEffect(() => {
// 		if (!isLoading && !data && !error) {
// 			run(false);
// 		}
// 	}, [isLoading, data, error]);

// 	// Handle error and loading or bad data.
// 	if (error) {
// 		return <FetchErr />;
// 	}
// 	else if (isLoading) {
// 		return <LoadingIcon />;
// 	}
// 	else if (!data) {
// 		return null;
// 	}

// 	// We return a certain number of days - collect each in its component.
// 	const days: JSX.Element[] = [];
// 	for (let i = 0; i < data.dailyRecords.length; i++) {
// 		const day = data.dailyRecords[i];
// 		const music = data.musicRecords[i];
// 		days.push(<Day key={day.dayNumber} day={day} dayMusic={music} />);
// 	}

// 	return (
// 		<>
// 			<If show={data.keyVal.badInformation}>
// 				{() =>
// 					<Common.BadText>
// 						{data.keyVal.badInformation}
// 					</Common.BadText>
// 				}
// 			</If>

// 			<If show={data.keyVal.importantInformation}>
// 				{() =>
// 					<Common.ImportantText>
// 						{data.keyVal.importantInformation}
// 					</Common.ImportantText>
// 				}
// 			</If>

// 			<IconPad>
// 				<If show={data.keyVal.workingOn}>
// 					{() => <>
// 						<IconTitle icon={faPlay}>What I'm working on</IconTitle>
// 						<Common.Text>{data.keyVal.workingOn}</Common.Text>
// 					</>}
// 				</If>

// 				<If show={data.keyVal.lookingForwardTo}>
// 					{() => <>
// 						<IconTitle icon={faHourglassHalf}>What I'm looking forward to</IconTitle>
// 						<Common.Text>{data.keyVal.lookingForwardTo}</Common.Text>
// 					</>}
// 				</If>
// 				<Checklist data={data} />
// 			</IconPad>
// 			{days}
// 		</>
// 	);
// }

// const OfTheDayAppDataContext = React.createContext<PromiseOutput<OfTheDayData>>(null);

// // If 'tomorrow' is present on the page URL, add that to our request to preview tomorrow and make sure everything looks okay.
// const url = 'https://agm-of-the-day.azurewebsites.net/api/OfTheDay';
// const isTomorrow = hasParam('tomorrow');
// const fullUrl = !isTomorrow ? url : url + '?tomorrow=1';

// function getData(): Promise<OfTheDayData> {
// 	return promiseMaximum(fetchApi(fullUrl), fetchMaxMilliseconds);
// }

// export const OfTheDayAppData: React.FC = (props) => {
// 	const promiseOutput = usePromise<OfTheDayData>({
// 		promiseFunc: getData,
// 		runImmediately: false,
// 		minMilliseconds: fetchMinMilliseconds
// 	});

// 	return (
// 		<OfTheDayAppDataContext.Provider value={promiseOutput}>
// 			{props.children}
// 		</OfTheDayAppDataContext.Provider>
// 	);
// }

// export const useOfTheDayAppData = () => React.useContext(OfTheDayAppDataContext);
