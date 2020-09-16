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
import { spacing, SpacingProps, ApplicationMaxWidth, Spacing } from '@/core/layout/common';
import { ListItemRoot, ListItemBackground, borderRadiusStyle } from '@/core/style/common';

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

const ElementRootContainer = tStyled(ListItemRoot)`
	background-color: ${p => p.theme.color.backgroundA};
`;

const ElementMaxWidthContainer = tStyled(ApplicationMaxWidth)`
`;

const ElementRootColor = tStyled(ListItemBackground)`
	overflow: auto;
	${borderRadiusStyle}
`;


export const ElementRoot: React.FC<SpacingProps> = (props) => {

	const { margin, ...otherProps } = props;

	let finalMargin = margin || `${spacing.large.value} ${spacing.medium.value}`;

	return (
		<ElementRootContainer>
			<ElementMaxWidthContainer>
				<ElementRootColor>
					<Spacing padding={finalMargin} {...otherProps} />
				</ElementRootColor>
			</ElementMaxWidthContainer>
		</ElementRootContainer>
	);
};

const PostRoot = tStyled.div``;