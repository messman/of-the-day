import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Basics } from './elements/basics';
import { Music } from './elements/music';
import { Video } from './elements/video';
import { Quote } from './elements/quote';
import { Image } from './elements/image';
import { EndThoughts } from './elements/end-thoughts';
import { Custom } from './elements/custom';
import { DayOff } from './elements/day-off';
import { styled } from '@/core/style/styled';
import { DynamicMarginProps, ApplicationMaxWidth, DynamicMargin } from '@/core/layout/common';

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

const ElementRootColor = styled.div`
	overflow: auto;
	&:nth-child(even) {
		background-color: ${p => p.theme.color.backgroundB};
	}
`;

export const ElementRoot: React.FC<DynamicMarginProps> = (props) => {
	return (
		<ElementRootColor>
			<ApplicationMaxWidth>
				<DynamicMargin {...props} />
			</ApplicationMaxWidth>
		</ElementRootColor>
	);
};

const PostRoot = styled.div``;