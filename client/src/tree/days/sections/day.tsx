import * as React from "react";
import * as Common from "@/styles/common";
import { TextPlaceholder } from "@/unit/components/placeholder";
import { RenderIf } from "@/unit/components/renderIf";
import { DailyRecord, MusicRecord, OfTheDayData } from "@/data/apiResponse";
import { Quote } from "./quote";
import { PlaceholderRenderProperty } from "@/unit/components/placeholderRenderIf";
import { DayMusic } from "@/unit/components/music";
import { Video } from "@/unit/components/video";

interface DayProps {
	isLoading: boolean,
	data: OfTheDayData,
	isYesterday: boolean
}

export const Day: React.FC<DayProps> = (props) => {

	const { isLoading, data, isYesterday } = props;

	let day: DailyRecord = null;
	let dayMusic: MusicRecord = null;
	if (data) {
		if (isYesterday) {
			day = data.yesterday;
			dayMusic = data.yesterdayMusic;
		}
		else {
			day = data.today;
			dayMusic = data.todayMusic;
		}
	}
	const text = !props.isYesterday ? "Today - " : "";

	return (
		<>
			<Common.Title>
				<TextPlaceholder show={isLoading} length={17}>
					{() => <>{text}{day.dayAsText}</>}
				</TextPlaceholder>
			</Common.Title>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title={null}
				titleLength={0}
				showIfProperty={() => day.dayNumber}
				propertyOutput={() => `Day ${day.dayNumber}`}
				propertyLength={15}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title={null}
				titleLength={0}
				showIfProperty={() => day.specialEvent}
				propertyOutput={() => day.specialEvent}
				propertyLength={10}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title={null}
				titleLength={0}
				showIfProperty={() => day.note}
				propertyOutput={() => day.note}
				propertyLength={15}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="Location"
				titleLength={12}
				showIfProperty={() => day.location}
				propertyOutput={() => day.location}
				propertyLength={20}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="Schedule"
				titleLength={12}
				showIfProperty={() => day.schedule}
				propertyOutput={() => day.schedule}
				propertyLength={24}
			/>

			<RenderIf show={isLoading || !!dayMusic}>
				{() => <DayMusic isLoading={isLoading} record={dayMusic} />}
			</RenderIf>

			<RenderIf show={!!day && !!day.youTubeLink}>
				{() =>
					<>
						<Common.SubTitle>Video</Common.SubTitle>
						<Video isLoading={false} link={day.youTubeLink} title={day.youTubeLinkTitle} description={day.youTubeLinkDescription} />
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

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="End-of-day thoughts"
				titleLength={12}
				showIfProperty={() => day.howDidItGo}
				propertyOutput={() => day.howDidItGo}
				propertyLength={24}
			/>
		</>
	);
}





