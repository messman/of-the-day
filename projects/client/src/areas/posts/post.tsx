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
import { spacing, ApplicationMaxWidth, Spacing } from '@/core/layout/common';

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

const ElementMaxWidthContainer = tStyled(ApplicationMaxWidth)`
`;

export const ElementRoot: React.FC = (props) => {
	const { children } = props;
	let finalMargin = `${spacing.grand.value} ${spacing.medium.value}`;
	return (
		<ElementMaxWidthContainer>
			<Spacing margin={finalMargin}>
				{children}
			</Spacing>
		</ElementMaxWidthContainer>
	);
};

const PostRoot = tStyled.div`
	margin: ${spacing.large.bottom};
`;