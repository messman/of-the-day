import * as React from 'react';
import { styled } from '@/core/style/styled';
import { IPost } from 'oftheday-shared';
import { Subtitle, subtitleHeight } from '@/core/symbol/text';
import { spacing } from '@/core/style/common';
import { iconTypes, Icon } from '@/core/symbol/icon';
import { FlexRow } from '@messman/react-common';

export interface PostTitleProps {
	post: IPost;
	isCollapsed: boolean;
	onCollapseChange: () => void;
}

export const PostTitle: React.FC<PostTitleProps> = (props) => {
	const { post, isCollapsed, onCollapseChange } = props;

	return (
		<Margin justifyContent='space-between' flex='none'>
			<div>
				<Subtitle isInline={true} isBold={true}>{post.dateText}</Subtitle>
				<Subtitle isInline={true}>&nbsp;&nbsp;&middot;&nbsp;&nbsp;Day {post.dayNumber}</Subtitle>
			</div>
			<Subtitle isInline={true}>
				<CollapseRotation isCollapsed={isCollapsed} onClick={onCollapseChange}>
					<Icon type={iconTypes.collapse} height={subtitleHeight} />
				</CollapseRotation>
			</Subtitle>
		</Margin>
	);
};

const Margin = styled(FlexRow)`
	margin: ${spacing.medium.value};
`;

export interface CollapseRotationProps {
	isCollapsed: boolean;
}

const CollapseRotation = styled.button<CollapseRotationProps>`
	cursor: pointer;
	border: none;
	background: transparent;
	transform: ${p => p.isCollapsed ? 'none' : 'rotateZ(-90deg)'};
`;