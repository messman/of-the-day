import * as React from 'react';
import { ActionLink } from '@/core/link';
import { OverlayBox } from '@/core/overlay/overlay';
import { ManagedOverlayBoxProps } from '@/services/overlay/overlay-manager';
import { FlexColumn } from '@messman/react-common';
import { IPost } from 'oftheday-shared';
import { tStyled } from '@/core/style/styled';
import { Spacing, spacing } from '@/core/layout/common';
import { ThemePickColor } from '@/core/style/theme';
import { Heading3, RegularText } from '@/core/symbol/text';
import { getDayReferenceRender } from './post-common';
import { Button } from '@/core/form/button/button';
import { iconTypes } from '@/core/symbol/icon';

export interface PostsSelectionOverlayProps extends ManagedOverlayBoxProps {
	activePostIndex: number;
	posts: IPost[];
	onPostChosen: (newActivePostIndex: number) => void;
	onArchivesChosen: () => void;
}

export const PostsSelectionOverlay: React.FC<PostsSelectionOverlayProps> = (props) => {

	const { isActive, onSetInactive, activePostIndex, posts, onPostChosen, onArchivesChosen } = props;

	const postsRender = posts.map((post, index) => {

		function onClickPost() {
			onPostChosen(index);
		}

		return (
			<PostListItem
				key={post.date}
				isActivePost={index === activePostIndex}
				post={post}
				onClick={onClickPost}
			/>
		);
	});

	return (
		<OverlayBox
			isActive={isActive}
			onSetInactive={onSetInactive}
			headerTitle='This Week'
			isSetInactiveOnBackdropClick={true}
		>
			<ScrollFlexColumn>
				{postsRender}
				<Spacing margin={spacing.medium.value}>
					<Button onClick={onArchivesChosen} iconAfter={iconTypes.right} isSpecial={true}>See Archive</Button>
				</Spacing>
			</ScrollFlexColumn>
			<FooterActionLink onClick={onSetInactive}>Cancel</FooterActionLink>
		</OverlayBox>
	);
};

const ScrollFlexColumn = tStyled(FlexColumn)`
	overflow-y: auto;
`;

const FooterActionLink = tStyled(ActionLink)`
	padding: ${spacing.medium.value};
	border-top: 1px solid ${p => p.theme.color.bgComponent3};
	text-align: center;
`;

interface PostListItemProps {
	isActivePost: boolean;
	post: IPost;
	onClick: () => void;
}

const PostListItem: React.FC<PostListItemProps> = (props) => {
	const { isActivePost, post, onClick } = props;
	const { dayNumber, dateText, dayReference } = post;

	const dayReferenceRender = getDayReferenceRender(dayReference);

	const color: ThemePickColor = c => isActivePost ? c.textAccentOnBackground : c.textRegular;

	return (
		<PostListItemContainer onClick={onClick} isActivePost={isActivePost}>
			<Heading3 margin={spacing.nudge.bottom} color={color}>{dateText}</Heading3>
			<RegularText margin={spacing.nudge.bottom} color={color}>{dayReferenceRender}Day {dayNumber}</RegularText>
		</PostListItemContainer>
	);
};

interface PostListItemContainerProps {
	isActivePost: boolean;
}

const PostListItemContainer = tStyled.div<PostListItemContainerProps>`
	cursor: ${p => p.isActivePost ? 'not-allowed' : 'pointer'};
	padding: ${spacing.medium.value};
	border-top: 1px solid ${p => p.theme.color.bgComponent3};
	border-left: none;
	border-right: none;

	&:first-child {
		border-top: none;
	}
`;