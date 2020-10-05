import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { DayOff } from './elements/day-off';
import { tStyled } from '@/core/style/styled';
import { spacing } from '@/core/layout/common';
import { ContextGroup } from './elements/group-context';
import { ShareGroup } from './elements/group-share';

interface PostProps {
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
				<ContextGroup post={post} />
				<ShareGroup post={post} />
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