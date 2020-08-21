import * as React from 'react';
import { IPost } from 'oftheday-shared';
// import { Quote } from './quote';
// import { Music } from '@/unit/components/music';
// import { Video } from '@/unit/components/video';
import { PostTitle } from './elements/post-title';
import { Text } from '@/core/symbol/text';
import { Basics } from './elements/basics';
import { DaySeparator } from './elements/separators';
import { Music } from './elements/music';

interface PostProps {
	post: IPost;
}

export const Post: React.FC<PostProps> = (props) => {
	const { post } = props;

	const [isCollapsed, setIsCollapsed] = React.useState(false);
	function onCollapseChange() {
		setIsCollapsed((p) => {
			return !p;
		});
	}

	const topSection = (
		<>
			<DaySeparator />
			<PostTitle
				post={post}
				isCollapsed={isCollapsed}
				onCollapseChange={onCollapseChange}
			/>
		</>
	);

	if (isCollapsed) {
		return topSection;
	}

	return (
		<>
			{topSection}
			<Basics post={post} />
			<Music music={post.music} />
			<Text>Hello!</Text>
			{/* <IconPad>
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

				<If show={dayMusic.title}>
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
			</IconPad> */}
		</>
	);
};