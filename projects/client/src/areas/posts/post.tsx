import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { PostTitle } from './elements/post-title';
import { Text } from '@/core/symbol/text';
import { Basics } from './elements/basics';
import { DaySeparator } from './elements/separators';
import { Music } from './elements/music';
import { Video } from './elements/video';

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
			<Video video={post.video} />
			<Text>Hello!</Text>
			{/*
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