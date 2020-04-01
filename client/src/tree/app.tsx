import * as React from "react";
import styled from "@/styles/theme";
import * as Common from "@/styles/common";
import { OfTheDayAppData, Days } from "./days/days";
import { AllMusicAppData, AllMusic } from "./allMusic/allMusic";
import { ActionLink } from "@/unit/components/link";

export const App: React.FC = () => {

	const [isViewingDays, setIsViewingDays] = React.useState(true);

	function onLinkClick(): void {
		setIsViewingDays(!isViewingDays);
	}

	const linkTitle = isViewingDays ? "See all music" : "Back to daily view";
	const renderedSection = isViewingDays ? <Days /> : <AllMusic />;

	return (
		<OfTheDayAppData>
			<AllMusicAppData>
				<Root>
					<Common.PageTitle>Of The Day</Common.PageTitle>
					<Common.Text>A place for daily updates by Andrew.</Common.Text>
					<Common.Bump>
						<ActionLink onClick={onLinkClick} title={linkTitle} />
					</Common.Bump>
					<Common.Bump>
						{renderedSection}
					</Common.Bump>
					<ExtraSpaceBottomOfPage />
				</Root>
			</AllMusicAppData>
		</OfTheDayAppData>
	);
}

const Root = styled.div`
	max-width: 800px;
	margin: auto;
	padding: .5rem;
`;

const ExtraSpaceBottomOfPage = styled.div`
	height: 5rem;
	width: 1px;
`;