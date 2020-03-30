import * as React from "react";
import styled from "@/styles/theme";
import { useAppDataContext } from "@/tree/appData";
import * as Common from "@/styles/common";
import { TextPlaceholder } from "@/styles/placeholder";
import { RenderIf } from "@/unit/components/renderIf";

interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = (props) => {

	const { isLoading, success, error } = useAppDataContext();
	if (error) {
		return null;
	}

	return (
		<>
			<Common.Text>
				<TextPlaceholder show={isLoading} length={15}>
					{() => <>Day {success.today.dayNumber} - Started {success.keyVal.startDate}</>}
				</TextPlaceholder>
			</Common.Text>

			<RenderIf show={!!success && !!success.keyVal.badInformation}>
				{() =>
					<Common.BadText>
						{success.keyVal.badInformation}
					</Common.BadText>
				}
			</RenderIf>

			<RenderIf show={!!success && !!success.keyVal.importantInformation}>
				{() =>
					<Common.ImportantText>
						{success.keyVal.importantInformation}
					</Common.ImportantText>
				}
			</RenderIf>

			<RenderIf show={isLoading || !!success.keyVal.workingOn}>
				{() =>
					<>
						<Common.SubTitle>
							<TextPlaceholder show={isLoading} length={12}>
								{() => <>What I'm working on</>}
							</TextPlaceholder>
						</Common.SubTitle>
						<Common.Text>
							<TextPlaceholder show={isLoading} length={30}>
								{() => <>{success.keyVal.workingOn}</>}
							</TextPlaceholder>
						</Common.Text>
					</>
				}
			</RenderIf>

			<RenderIf show={isLoading || !!success.keyVal.lookingForwardTo}>
				{() =>
					<>
						<Common.SubTitle>
							<TextPlaceholder show={isLoading} length={14}>
								{() => <>What I'm looking forward to</>}
							</TextPlaceholder>
						</Common.SubTitle>
						<Common.Text>
							<TextPlaceholder show={isLoading} length={30}>
								{() => <>{success.keyVal.lookingForwardTo}</>}
							</TextPlaceholder>
						</Common.Text>
					</>
				}
			</RenderIf>
		</>
	);
}





