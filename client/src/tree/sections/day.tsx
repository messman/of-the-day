import * as React from "react";
import styled from "@/styles/theme";
import { useAppDataContext } from "@/tree/appData";
import * as Common from "@/styles/common";
import { TextPlaceholder } from "@/styles/placeholder";
import { RenderIf } from "@/unit/components/renderIf";
import { DailyRecord, MusicRecord } from "@/data/apiResponse";

interface DayProps {
	isYesterday: boolean
}

export const Day: React.FC<DayProps> = (props) => {

	const { isLoading, success, error } = useAppDataContext();
	if (error) {
		return null;
	}

	let day: DailyRecord = null;
	let dayMusic: MusicRecord = null;
	if (success) {
		if (props.isYesterday) {
			day = success.yesterday;
			dayMusic = success.yesterdayMusic;
		}
		else {
			day = success.today;
			dayMusic = success.todayMusic;
		}
	}
	const text = props.isYesterday ? "Yesterday" : "Today";

	return (
		<>
			<Common.Title>
				<TextPlaceholder show={isLoading} length={17}>
					{() => <>{text} - {day.dayAsText}</>}
				</TextPlaceholder>
			</Common.Title>

			<Common.Text>
				<TextPlaceholder show={isLoading} length={6}>
					{() => <>Day {day.dayNumber}</>}
				</TextPlaceholder>
			</Common.Text>

			<RenderIf show={isLoading || !!day.specialEvent}>
				{() =>
					<Common.Text>
						<TextPlaceholder show={isLoading} length={10}>
							{() => <>{day.specialEvent}</>}
						</TextPlaceholder>
					</Common.Text>
				}
			</RenderIf>

			<RenderIf show={isLoading || !!day.note}>
				{() =>
					<Common.Text>
						<TextPlaceholder show={isLoading} length={15}>
							{() => <>{day.note}</>}
						</TextPlaceholder>
					</Common.Text>
				}
			</RenderIf>

			<RenderIf show={isLoading || !!day.location}>
				{() =>
					<>
						<Common.SubTitle>
							<TextPlaceholder show={isLoading} length={12}>
								{() => <>Location</>}
							</TextPlaceholder>
						</Common.SubTitle>
						<Common.Text>
							<TextPlaceholder show={isLoading} length={30}>
								{() => <>{day.location}</>}
							</TextPlaceholder>
						</Common.Text>
					</>
				}
			</RenderIf>

			<RenderIf show={isLoading || !!day.schedule}>
				{() =>
					<>
						<Common.SubTitle>
							<TextPlaceholder show={isLoading} length={12}>
								{() => <>Schedule</>}
							</TextPlaceholder>
						</Common.SubTitle>
						<Common.Text>
							<TextPlaceholder show={isLoading} length={30}>
								{() => <>{day.schedule}</>}
							</TextPlaceholder>
						</Common.Text>
					</>
				}
			</RenderIf>

			<RenderIf show={isLoading || !!day.howDidItGo}>
				{() =>
					<>
						<Common.SubTitle>
							<TextPlaceholder show={isLoading} length={12}>
								{() => <>End-of-day thoughts</>}
							</TextPlaceholder>
						</Common.SubTitle>
						<Common.Text>
							<TextPlaceholder show={isLoading} length={30}>
								{() => <>{day.howDidItGo}</>}
							</TextPlaceholder>
						</Common.Text>
					</>
				}
			</RenderIf>

			{/* 

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
			</RenderIf> */}
		</>
	);
}





