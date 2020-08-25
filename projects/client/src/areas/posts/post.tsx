import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { PostTitle } from './elements/post-title';
import { Basics } from './elements/basics';
import { DaySeparator, ElementSeparator } from './elements/separators';
import { Music } from './elements/music';
import { Video } from './elements/video';
import { Quote } from './elements/quote';
import { Image } from './elements/image';
import { EndThoughts } from './elements/end-thoughts';
import { Custom } from './elements/custom';
import { DayOff } from './elements/day-off';
import { styled } from '@/core/style/styled';

interface PostProps {
	isCollapsedInitially?: boolean;
	post: IPost;
}

export const Post: React.FC<PostProps> = (props) => {
	const { post, isCollapsedInitially } = props;

	const [isCollapsed, setIsCollapsed] = React.useState(!!isCollapsedInitially);
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

	let render: JSX.Element = null!;

	if (isCollapsed) {
		render = topSection;
	}
	else if (post.isDayOff) {
		render = (
			<>
				{topSection}
				<DayOff message={post.dayOffMessage} />
			</>
		);
	}
	else {
		render = (
			<>
				{topSection}
				<Basics post={post} />
				<EndThoughts endThoughts={post.endThoughts} />
				<Music music={post.music} />
				<Video video={post.video} />
				<Image image={post.image} />
				<Quote quote={post.quote} />
				<Custom custom={post.custom} />
			</>
		);
	}

	return (
		<PostRoot>
			{render}
		</PostRoot>
	);
};

export const ElementRoot = styled.div``;

const PostRoot = styled.div`
	& > ${ElementRoot}:last-of-type ${ElementSeparator} {
		display: none;
	}
`;
