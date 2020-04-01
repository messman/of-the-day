import * as React from "react";
import { usePromise, PromiseOutput } from "@/unit/hooks/usePromise";
import { OfTheDayData } from "@/data/apiResponse";
import { fetchApi, fetchMinMilliseconds, FetchErr } from "@/data/fetch";
import { Header } from "./sections/header";
import { Checklist } from "./sections/checklist";
import { Day } from "./sections/day";

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
	else if (!isLoading && !data && !error) {
		return null;
	}

	return (
		<>
			<Header isLoading={isLoading} data={data} />
			<Checklist isLoading={isLoading} data={data} />
			<Day isLoading={isLoading} data={data} isYesterday={false} />
			<Day isLoading={isLoading} data={data} isYesterday={true} />
		</>
	);
}


const OfTheDayAppDataContext = React.createContext<PromiseOutput<OfTheDayData>>(null);

const url = "https://agm-of-the-day.azurewebsites.net/api/OfTheDay";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const isTomorrow = params.get("tomorrow") === "1";
const fullUrl = !isTomorrow ? url : url + "?tomorrow=1";

export const OfTheDayAppData: React.FC = (props) => {
	const promiseOutput = usePromise<OfTheDayData>({
		promiseFunc: () => fetchApi(fullUrl),
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
