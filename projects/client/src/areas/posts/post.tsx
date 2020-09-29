import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Basics } from './elements/basics';
import { Music } from './elements/music';
import { Video } from './elements/video';
import { Quote } from './elements/quote/quote';
import { Image } from './elements/image';
import { EndThoughts } from './elements/end-thoughts';
import { Custom } from './elements/custom';
import { DayOff } from './elements/day-off';
import { tStyled } from '@/core/style/styled';
import { spacing } from '@/core/layout/common';
import { CardFlow } from '@/core/card/card-flow';

interface PostProps {
	isActive?: boolean;
	post: IPost;
}

export const Post: React.FC<PostProps> = (props) => {
	const { post } = props;

	let render: JSX.Element = null!;
	if (post.isDayOff) {
		render = (
			<>
				<DayOff message={post.dayOffMessage} />
			</>
		);
	}
	else {
		render = (
			<>
				<EndThoughts endThoughts={post.endThoughts} />
				<Basics post={post} />
				<CardFlow>
					<Music music={post.music} />
					<Video video={post.video} />
				</CardFlow>
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

const PostRoot = tStyled.div`
	margin: ${spacing.large.bottom};
`;