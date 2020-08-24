import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { PostTitle } from './elements/post-title';
import { Basics } from './elements/basics';
import { DaySeparator } from './elements/separators';
import { Music } from './elements/music';
import { Video } from './elements/video';
import { Quote } from './elements/quote';
import { Image } from './elements/image';
import { EndThoughts } from './elements/end-thoughts';
import { Custom } from './elements/custom';

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
			<EndThoughts endThoughts={post.endThoughts} />
			<Music music={post.music} />
			<Video video={post.video} />
			<Image image={post.image} />
			<Quote quote={post.quote} />
			<Custom custom={post.custom} />
		</>
	);
};