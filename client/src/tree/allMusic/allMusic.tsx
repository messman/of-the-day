import * as React from "react";
import { usePromise, PromiseOutput } from "@/unit/hooks/usePromise";
import { MusicRecord } from "@/data/apiResponse";
import { fetchApi, FetchErr } from "@/data/fetch";
import { ListMusic } from "@/unit/components/music";

export const AllMusic: React.FC = () => {

	const { isLoading, data, error, run } = useAllMusicAppData();

	React.useEffect(() => {
		if (!isLoading && !data && !error) {
			run(false);
		}
	}, [isLoading, data, error]);

	if (error) {
		return <FetchErr />;
	}
	else if (!data) {
		return null;
	}

	const music = data.map(m => {
		return <ListMusic key={m.dayNumber} record={m} />;
	});

	return (
		<>
			{music}
		</>
	);
}


const AllMusicAppDataContext = React.createContext<PromiseOutput<MusicRecord[]>>(null);

const url = "https://agm-of-the-day.azurewebsites.net/api/AllMusic";
export const AllMusicAppData: React.FC = (props) => {
	const promiseOutput = usePromise<MusicRecord[]>({
		promiseFunc: () => fetchApi(url),
		runImmediately: false,
		minMilliseconds: 0
	});

	return (
		<AllMusicAppDataContext.Provider value={promiseOutput}>
			{props.children}
		</AllMusicAppDataContext.Provider>
	);
}

const useAllMusicAppData = () => React.useContext(AllMusicAppDataContext);
