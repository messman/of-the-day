// import * as React from "react";
// import styled from "@/styles/theme";
// import * as Common from "@/styles/common";
// import { OfTheDayAppData, Days } from "./days/days";
// import { AllMusicAppData, AllMusic } from "./allMusic/allMusic";
// import { ActionLink, OutLink } from "@/unit/components/link";
// import { GlobalAppStyles, ThemeProvider, themes } from "@/styles/theme";
// import { useLocalStorage } from "@/unit/hooks/useLocalStorage";
// import { keyFactory } from "@/data/localStorage";

// export const getKey = keyFactory("of-the-day");
// const themeIndexKey = getKey("themeIndex");

// export const App: React.FC = () => {

// 	// Currently unused - for the other view of the page.
// 	const [isViewingDays, setIsViewingDays] = React.useState(true);
// 	// function onAppSwitchLinkClick(): void {
// 	// 	setIsViewingDays(!isViewingDays);
// 	// }

// 	// Rotate between themes through the link. Uses local storage.
// 	const [themeIndex, setThemeIndex] = useLocalStorage(themeIndexKey, 1);
// 	const theme = themes[themeIndex];
// 	function onThemeLinkClick(): void {
// 		setThemeIndex((themeIndex + 1) % themes.length);
// 	}

// 	//const linkTitle = isViewingDays ? "See all music" : "Back to daily view";
// 	const renderedSection = isViewingDays ? <Days /> : <AllMusic />;

// 	return (
// 		<ThemeProvider theme={theme.theme}>
// 			<GlobalAppStyles />
// 			<OfTheDayAppData>
// 				<AllMusicAppData>
// 					<Root>
// 						<Common.PageTitle>Of The Day</Common.PageTitle>
// 						<Common.Text>A place for daily updates by Andrew.</Common.Text>
// 						{/* <Common.Bump>
// 							<ActionLink onClick={onAppSwitchLinkClick}>{linkTitle}</ActionLink>
// 						</Common.Bump> */}
// 						<Common.Bump>
// 							{renderedSection}
// 						</Common.Bump>
// 						<ExtraSpaceBottomOfPage />

// 						<hr />
// 						<Common.Bump>
// 							<ActionLink onClick={onThemeLinkClick}>Theme: {theme.name}</ActionLink>
// 						</Common.Bump>
// 						<Common.Bump>
// 							<Common.Text>Copyright &copy; Andrew Messier.</Common.Text>
// 							<div>
// 								<OutLink href="https://andrewmessier.com">Andrew Messier</OutLink>
// 							</div>
// 						</Common.Bump>
// 						<Common.Bump>
// 							<Common.Text>Icons by <OutLink href="https://fontawesome.com/license/free">FontAwesome</OutLink></Common.Text>
// 							<div>
// 								Found an issue or want to see the code? Go to <OutLink href="https://github.com/messman/of-the-day">GitHub</OutLink>
// 							</div>
// 							<div>
// 								Need to reach out? Contact me on <OutLink href="https://www.linkedin.com/in/andrewgmessier/">LinkedIn</OutLink>
// 							</div>
// 						</Common.Bump>
// 						<ExtraSpaceBottomOfPage />
// 					</Root>
// 				</AllMusicAppData>
// 			</OfTheDayAppData>
// 		</ThemeProvider>
// 	);
// };

// // Makes it easier for us to support mobile and desktop without a ton of extra design.
// const Root = styled.div`
// 	max-width: 800px;
// 	margin: auto;
// 	padding: 0 1rem;
// `;

// // Extra space to avoid crowding the bottom of the screen.
// const ExtraSpaceBottomOfPage = styled.div`
// 	height: 3rem;
// 	width: 1px;
// `;
