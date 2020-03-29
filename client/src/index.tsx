import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "@/tree/app";
import { AppDataProvider } from "@/tree/appData";
import { GlobalAppStyles, ThemeProvider, theme } from "@/styles/theme";

ReactDOM.render(
	<AppDataProvider>
		<ThemeProvider theme={theme}>
			<>
				<GlobalAppStyles />
				<App />
			</>
		</ThemeProvider>
	</AppDataProvider>,
	document.getElementById("react-root")
);