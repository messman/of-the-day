import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "@/tree/app";
import { GlobalAppStyles, ThemeProvider, theme } from "@/styles/theme";

// Apply our theme and hand off to the App.
ReactDOM.render(
	<ThemeProvider theme={theme}>
		<GlobalAppStyles />
		<App />
	</ThemeProvider>,
	document.getElementById("react-root")
);