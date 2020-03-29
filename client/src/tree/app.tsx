import * as React from "react";
import { FlexColumn } from "@/unit/components/flex";
import styled from "@/styles/theme";
import { useAppDataContext } from "./appData";

interface AppProps {
}

export const App: React.FC<AppProps> = (props) => {

	const { isLoading, success, error } = useAppDataContext();

	if (success) {
		console.log(success);
	}
	else if (error) {
		console.error(error);
	}

	return (
		<Root>
			Hello, World! {isLoading ? "Loading" : "Loaded"}
		</Root>
	);
}

const Root = styled(FlexColumn)`
	height: 100%;
	width: 100%;
`



