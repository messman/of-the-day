import * as React from "react";
import { FlexColumn } from "@/unit/components/flex";
import styled from "@/styles/theme";
import { useAppDataContext } from "./appData";
import { Title } from "./sections/title";
import { Error } from "./sections/error";
import { Header } from "./sections/header";
import { Checklist } from "./sections/checklist";
import { Day } from "./sections/day";

interface AppProps {
}

export const App: React.FC<AppProps> = (props) => {

	const { isLoading, success, error } = useAppDataContext();

	if (error) {
		console.error("Error fetching data", error);
		return (
			<Root>
				<Title />
				<Error />
			</Root>
		);
	}

	return (
		<Root>
			<Title />
			<Header />
			<Checklist />
			<Day isYesterday={false} />
			<Day isYesterday={true} />
		</Root>
	);
}

const Root = styled.div`
	max-width: 800px;
	margin: auto;
	padding: .5rem;
`;