import * as React from "react";
import { usePromise, PromiseOutput, promiseMaximum } from "@/unit/hooks/usePromise";
import { OfTheDayData } from "@/data/apiResponse";
import { fetchApi, fetchMinMilliseconds, fetchMaxMilliseconds, FetchErr } from "@/data/fetch";
import * as Common from "@/styles/common";
import { Checklist } from "./sections/checklist";
import { Day } from "./sections/day";
import { LoadingIcon, IconPad } from "@/unit/components/icon";
import { If } from "@/unit/components/if";
import { faPlay, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { IconTitle } from "@/unit/components/iconTitle";

export const Days: React.FC = () => {

	const { isLoading, data, error, run } = useOfTheDayAppData();

	React.useEffect(() => {
		if (!isLoading && !data && !error) {
			run(false);
		}
	}, [isLoading, data, error]);

	if (error) {
		return <FetchErr />;
	}
	else if (isLoading) {
		return <LoadingIcon />;
	}
	else if (!data) {
		return null;
	}

	const days: JSX.Element[] = [];
	for (let i = 0; i < data.dailyRecords.length; i++) {
		const day = data.dailyRecords[i];
		const music = data.musicRecords[i];
		days.push(<Day key={day.dayNumber} day={day} dayMusic={music} />);
	}

	return (
		<>
			<If show={data.keyVal.badInformation}>
				{() =>
					<Common.BadText>
						{data.keyVal.badInformation}
					</Common.BadText>
				}
			</If>

			<If show={data.keyVal.importantInformation}>
				{() =>
					<Common.ImportantText>
						{data.keyVal.importantInformation}
					</Common.ImportantText>
				}
			</If>

			<IconPad>
				<If show={data.keyVal.workingOn}>
					{() => <>
						<IconTitle icon={faPlay}>What I'm working on</IconTitle>
						<Common.Text>{data.keyVal.workingOn}</Common.Text>
					</>}
				</If>

				<If show={data.keyVal.lookingForwardTo}>
					{() => <>
						<IconTitle icon={faHourglassHalf}>What I'm looking forward to</IconTitle>
						<Common.Text>{data.keyVal.lookingForwardTo}</Common.Text>
					</>}
				</If>
				<Checklist data={data} />
			</IconPad>
			{days}
		</>
	);
}


const OfTheDayAppDataContext = React.createContext<PromiseOutput<OfTheDayData>>(null);

const url = "https://agm-of-the-day.azurewebsites.net/api/OfTheDay";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const isTomorrow = params.get("tomorrow") === "1";
const fullUrl = !isTomorrow ? url : url + "?tomorrow=1";

function getData(): Promise<OfTheDayData> {
	return promiseMaximum(fetchApi(fullUrl), fetchMaxMilliseconds);
}

export const OfTheDayAppData: React.FC = (props) => {
	const promiseOutput = usePromise<OfTheDayData>({
		promiseFunc: getData,
		runImmediately: false,
		minMilliseconds: fetchMinMilliseconds
	});

	return (
		<OfTheDayAppDataContext.Provider value={promiseOutput}>
			{props.children}
		</OfTheDayAppDataContext.Provider>
	);
}

export const useOfTheDayAppData = () => React.useContext(OfTheDayAppDataContext);
