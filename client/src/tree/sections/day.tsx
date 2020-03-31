import * as React from "react";
import styled from "@/styles/theme";
import { useAppDataContext } from "@/tree/appData";
import * as Common from "@/styles/common";
import { TextPlaceholder } from "@/styles/placeholder";
import { RenderIf } from "@/unit/components/renderIf";
import { DailyRecord, MusicRecord } from "@/data/apiResponse";
import { Music } from "./subsections/music";
import { Quote } from "./subsections/quote";

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

	let youTubeEmbedLink = null;
	if (day && day.youTubeLink) {
		youTubeEmbedLink = day.youTubeLink.replace("https://youtu.be/", "https://www.youtube.com/embed/");
	}

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

			<RenderIf show={isLoading || !!dayMusic}>
				{() => <Music isLoading={isLoading} record={dayMusic} />}
			</RenderIf>

			<RenderIf show={!!day && !!day.youTubeLink}>
				{() =>
					<>
						<Common.SubTitle>Video</Common.SubTitle>
						<RenderIf show={!!day.youTubeLinkTitle}>
							{() => <Common.Text>"{day.youTubeLinkTitle}"</Common.Text>}
						</RenderIf>
						<RenderIf show={!!day.youTubeLinkDescription}>
							{() => <Common.Text>{day.youTubeLinkDescription}</Common.Text>}
						</RenderIf>
						<Common.Bump>
							<iframe src={youTubeEmbedLink} width="560" height="315" frameBorder="0" allow="encrypted-media" allowFullScreen></iframe>
						</Common.Bump>
					</>
				}
			</RenderIf>


			<RenderIf show={!!day && !!day.quote}>
				{() =>
					<>
						<Common.SubTitle>Quote</Common.SubTitle>
						<Quote text={day.quote} attribution={day.quoteBy} />
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

		</>
	);
}





