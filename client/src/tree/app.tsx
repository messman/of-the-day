import * as React from "react";
import styled from "@/styles/theme";
import * as Common from "@/styles/common";
import { OfTheDayAppData, Days } from "./days/days";
import { AllMusicAppData, AllMusic } from "./allMusic/allMusic";
import { ActionLink, OutLink } from "@/unit/components/link";
import { GlobalAppStyles, ThemeProvider, themes } from "@/styles/theme";
import { useLocalStorage } from "@/unit/hooks/useLocalStorage";

export const App: React.FC = () => {

	const [isViewingDays, setIsViewingDays] = React.useState(true);
	const [themeIndex, setThemeIndex] = useLocalStorage("themeIndex", 0);

	function onAppSwitchLinkClick(): void {
		setIsViewingDays(!isViewingDays);
	}

	const theme = themes[themeIndex];
	function onThemeLinkClick(): void {
		setThemeIndex((themeIndex + 1) % themes.length);
	}

	const linkTitle = isViewingDays ? "See all music" : "Back to daily view";
	const renderedSection = isViewingDays ? <Days /> : <AllMusic />;

	return (
		<ThemeProvider theme={theme.theme}>
			<GlobalAppStyles />
			<OfTheDayAppData>
				<AllMusicAppData>
					<Root>
						<Common.PageTitle>Of The Day</Common.PageTitle>
						<Common.Text>A place for daily updates by Andrew.</Common.Text>
						<Common.Bump>
							<ActionLink onClick={onAppSwitchLinkClick} title={linkTitle} />
						</Common.Bump>
						<Common.Bump>
							{renderedSection}
						</Common.Bump>
						<ExtraSpaceBottomOfPage />
						<Common.Text>
							<OutLink title="Andrew Messier" url="https://andrewmessier.com" />
							<ActionLink onClick={onThemeLinkClick} title={`Theme: ${theme.name}`} />
						</Common.Text>
						<ExtraSpaceBottomOfPage />
					</Root>
				</AllMusicAppData>
			</OfTheDayAppData>
		</ThemeProvider>
	);
}

const Root = styled.div`
	max-width: 800px;
	margin: auto;
	padding: 0 1rem;
`;

const ExtraSpaceBottomOfPage = styled.div`
	height: 3rem;
	width: 1px;
`;