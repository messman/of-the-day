import * as React from "react";
import * as Common from "@/styles/common";
import { TextPlaceholder } from "@/unit/components/placeholder";
import { RenderIf } from "@/unit/components/renderIf";
import { DailyRecord, MusicRecord, OfTheDayData } from "@/data/apiResponse";
import { Quote } from "./quote";
import { PlaceholderRenderProperty } from "@/unit/components/placeholderRenderIf";
import { DayMusic } from "@/unit/components/music";
import { Video } from "@/unit/components/video";
import { faLocationArrow, faClock, faMoon, faComment, faVideo, faMusic, faPen, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { IconProps } from "@/unit/components/icon";

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
					{() => <>{day.dayAsText} &nbsp;&mdash;&nbsp; Day {day.dayNumber}</>}
				</TextPlaceholder>
			</Common.Title>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title={null}
				titleLength={0}
				titleIcon={icons.specialEvent}
				showIfProperty={() => day.specialEvent}
				propertyOutput={() => day.specialEvent}
				propertyLength={10}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title={null}
				titleLength={0}
				titleIcon={icons.note}
				showIfProperty={() => day.note}
				propertyOutput={() => day.note}
				propertyLength={15}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="Location"
				titleLength={12}
				titleIcon={icons.location}
				showIfProperty={() => day.location}
				propertyOutput={() => day.location}
				propertyLength={20}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="Schedule"
				titleLength={12}
				titleIcon={icons.schedule}
				showIfProperty={() => day.schedule}
				propertyOutput={() => day.schedule}
				propertyLength={24}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="Music"
				titleLength={8}
				titleIcon={icons.music}
				showIfProperty={() => dayMusic}
				propertyOutput={() =>
					<DayMusic isLoading={isLoading} record={dayMusic} />
				}
				propertyLength={24}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="Video"
				titleLength={8}
				titleIcon={icons.video}
				showIfProperty={() => day.youTubeLink}
				propertyOutput={() =>
					<Video isLoading={false} link={day.youTubeLink} title={day.youTubeLinkTitle} description={day.youTubeLinkDescription} />
				}
				propertyLength={24}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="Quote"
				titleLength={8}
				titleIcon={icons.quote}
				showIfProperty={() => day.quote}
				propertyOutput={() =>
					<Quote text={day.quote} attribution={day.quoteBy} />
				}
				propertyLength={16}
			/>

			<PlaceholderRenderProperty
				isLoading={isLoading}
				title="End-of-day thoughts"
				titleLength={12}
				titleIcon={icons.endOfDay}
				showIfProperty={() => day.howDidItGo}
				propertyOutput={() => day.howDidItGo}
				propertyLength={24}
			/>
		</>
	);
}

const icons = {
	location: {
		definition: faLocationArrow
	},
	schedule: {
		definition: faClock
	},
	specialEvent: {
		definition: faCalendar
	},
	note: {
		definition: faPen
	},
	music: {
		definition: faMusic
	},
	video: {
		definition: faVideo
	},
	quote: {
		definition: faComment
	},
	endOfDay: {
		definition: faMoon
	}
};
