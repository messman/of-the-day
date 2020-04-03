import * as React from "react";
import styled from "@/styles/theme";
import * as Common from "@/styles/common";
import { OfTheDayAppData, Days } from "./days/days";
import { AllMusicAppData, AllMusic } from "./allMusic/allMusic";
import { ActionLink, OutLink } from "@/unit/components/link";
import { GlobalAppStyles, ThemeProvider, themes } from "@/styles/theme";
import { useLocalStorage, keyFactory } from "@/unit/hooks/useLocalStorage";

export const getKey = keyFactory("of-the-day");
const themeIndexKey = getKey("themeIndex");

export const App: React.FC = () => {

	const [isViewingDays, setIsViewingDays] = React.useState(true);
	const [themeIndex, setThemeIndex] = useLocalStorage(themeIndexKey, 0);

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
							<ActionLink onClick={onAppSwitchLinkClick}>{linkTitle}</ActionLink>
						</Common.Bump>
						<Common.Bump>
							{renderedSection}
						</Common.Bump>
						<ExtraSpaceBottomOfPage />

						<hr />
						<Common.Bump>
							<ActionLink onClick={onThemeLinkClick}>Theme: {theme.name}</ActionLink>
						</Common.Bump>
						<Common.Bump>
							<Common.Text>Copyright &copy; Andrew Messier.</Common.Text>
							<div>
								<OutLink href="https://andrewmessier.com">Andrew Messier</OutLink>
							</div>
						</Common.Bump>
						<Common.Bump>
							<Common.Text>Icons by <OutLink href="https://fontawesome.com/license/free">FontAwesome</OutLink></Common.Text>
							<div>
								<OutLink href="https://github.com/messman/of-the-day">GitHub</OutLink>
							</div>
						</Common.Bump>
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
