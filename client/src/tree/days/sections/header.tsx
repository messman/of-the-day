import * as React from "react";
import * as Common from "@/styles/common";
import { TextPlaceholder } from "@/unit/components/placeholder";
import { RenderIf } from "@/unit/components/renderIf";
import { PlaceholderRenderProperty } from "@/unit/components/placeholderRenderIf";
import { OfTheDayData } from "@/data/apiResponse";
import { faHourglassHalf, faPlay } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
	isLoading: boolean,
	data: OfTheDayData
}

export const Header: React.FC<HeaderProps> = (props) => {

	const { isLoading, data } = props;

	return (
		<>
			<RenderIf show={!!data && !!data.keyVal.badInformation}>
				{() =>
					<Common.BadText>
						{data.keyVal.badInformation}
					</Common.BadText>
				}
			</RenderIf>

			<RenderIf show={!!data && !!data.keyVal.importantInformation}>
				{() =>
					<Common.ImportantText>
						{data.keyVal.importantInformation}
					</Common.ImportantText>
				}
			</RenderIf>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="What I'm working on"
				titleLength={12}
				titleIcon={icons.workingOn}
				showIfProperty={() => data.keyVal.workingOn}
				propertyOutput={() => data.keyVal.workingOn}
				propertyLength={15}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="What I'm looking forward to"
				titleLength={14}
				titleIcon={icons.lookingForward}
				showIfProperty={() => data.keyVal.lookingForwardTo}
				propertyOutput={() => data.keyVal.lookingForwardTo}
				propertyLength={15}
			/>
		</>
	);
}

const icons = {
	workingOn: {
		definition: faPlay
	},
	lookingForward: {
		definition: faHourglassHalf
	}
};