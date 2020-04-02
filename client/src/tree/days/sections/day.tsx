import * as React from "react";
import * as Common from "@/styles/common";
import { DailyRecord, MusicRecord, SharedDayRecord } from "@/data/apiResponse";
import { Quote } from "./quote";
import { Music } from "@/unit/components/music";
import { Video } from "@/unit/components/video";
import { faLocationArrow, faClock, faMoon, faComment, faVideo, faMusic, faPen, faCalendar, faSun } from '@fortawesome/free-solid-svg-icons'
import { IconTitle } from "@/unit/components/iconTitle";
import { If } from "@/unit/components/if";
import { IconPad } from "@/unit/components/icon";

interface DayProps {
	day: DailyRecord,
	dayMusic: MusicRecord
}

export const Day: React.FC<DayProps> = (props) => {
	const { day, dayMusic } = props;

	return (
		<>
			<DayTitle day={day} />
			<IconPad>
				<If show={day.specialEvent}>
					{() => <>
						<Common.Text>{day.specialEvent}</Common.Text>
					</>}
				</If>

				<If show={day.note}>
					{() => <>
						<Common.Text>{day.note}</Common.Text>
					</>}
				</If>

				<If show={day.location}>
					{() => <>
						<IconTitle icon={faLocationArrow}>Location</IconTitle>
						<Common.Text>{day.location}</Common.Text>
					</>}
				</If>

				<If show={day.schedule}>
					{() => <>
						<IconTitle icon={faClock}>Schedule</IconTitle>
						<Common.Text>{day.schedule}</Common.Text>
					</>}
				</If>

				<If show={dayMusic}>
					{() => <>
						<IconTitle icon={faMusic}>Music</IconTitle>
						<Music record={dayMusic} />
					</>}
				</If>

				<If show={day.youTubeLink}>
					{() => <>
						<IconTitle icon={faVideo}>Video</IconTitle>
						<Video link={day.youTubeLink} title={day.youTubeLinkTitle} description={day.youTubeLinkDescription} />
					</>}
				</If>

				<If show={day.quote}>
					{() => <>
						<IconTitle icon={faComment}>Quote</IconTitle>
						<Quote text={day.quote} attribution={day.quoteBy} />
					</>}
				</If>

				<If show={day.howDidItGo}>
					{() => <>
						<IconTitle icon={faMoon}>End-of-day thoughts</IconTitle>
						<Common.Text>{day.howDidItGo}</Common.Text>
					</>}
				</If>
			</IconPad>
		</>
	);
}

interface DayTitleProps {
	day: SharedDayRecord
}

export const DayTitle: React.FC<DayTitleProps> = (props) => {
	const { day } = props;
	return <Common.Title >{day.dayAsText} &nbsp;&mdash;&nbsp; Day {day.dayNumber}</Common.Title>;
}