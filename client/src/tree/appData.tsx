import * as React from "react";
import { usePromise, PromiseState } from "@/unit/hooks/usePromise";
import { createContext, useContext } from "react";
import { OfTheDayData } from "@/data/apiResponse";

const AppDataContext = createContext<PromiseState<OfTheDayData>>(null);

export const AppDataProvider: React.FC = (props) => {
	const promiseState = usePromise(getApiData, 2500);

	return (
		<AppDataContext.Provider value={promiseState}>
			{props.children}
		</AppDataContext.Provider>
	);
}

export const useAppDataContext = () => useContext(AppDataContext);

const url = "https://agm-of-the-day.azurewebsites.net/api/OfTheDay";
function getApiData(): Promise<OfTheDayData> {
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`fetch status error (${response.status}): ${response.statusText}`);
			}
			return response.json();
		})
		.then((data) => {
			return data as OfTheDayData;
		})
		.catch((e) => {
			const error = e as Error;
			throw new Error(`fetch exception caught: ${error.message}`);
		});
}