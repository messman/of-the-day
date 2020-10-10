import { Card, CardProps } from '@/core/card/card';
import { spacing } from '@/core/layout/common';
import { ActionLink } from '@/core/link';
import { SeeMoreButton } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FlexRow, useWindowLayout } from '@messman/react-common';
import { IPost, IPostElementType } from 'oftheday-shared';
import * as React from 'react';

export interface PostsElementProps<T> {
	value: T;
	isForArchive?: boolean;
	archivePost?: IPost;
}

export interface PostsElementFC<T> extends React.FC<PostsElementProps<T | undefined>> {
	element: IPostElementType;
}

export function createPostsElement<T>(Component: React.FC<PostsElementProps<T>>, element: IPostElementType, validator: (value: T | undefined) => boolean): PostsElementFC<T> {
	const fc = ((props: PostsElementProps<T | undefined>) => {
		if (validator(props.value)) {
			return <Component value={props.value!} isForArchive={props.isForArchive} archivePost={props.archivePost} />;
		}
		return null;
	}) as unknown as PostsElementFC<T>;
	fc.element = element;
	return fc;
}

export interface PostCardProps extends Omit<CardProps, 'subtitle'> {
	isForArchive?: boolean;
	archivePost?: IPost;
}

export const PostCard: React.FC<PostCardProps> = (props) => {
	const { title, isForArchive, archivePost, icon, children } = props;

	let subtitleRender: JSX.Element | null = null;
	if (isForArchive && archivePost) {
		const { date, dayNumber } = archivePost;

		subtitleRender = <>{date}&nbsp;&middot;&nbsp;Day {dayNumber}</>;
	}

	return (
		<Card
			title={title}
			icon={icon}
			subtitle={subtitleRender}
		>
			{children}
		</Card>
	);
};

export interface PostArchiveLinksProps {
	isForArchive?: boolean;
	isMusic?: boolean;
	isVideo?: boolean;
	isTop: boolean;
}

export const PostArchiveLinks: React.FC<PostArchiveLinksProps> = (props) => {
	const { isForArchive, isMusic, isVideo, isTop } = props;

	const { widthBreakpoint } = useWindowLayout();
	if (isForArchive || (!isMusic && !isVideo && !isTop)) {
		return null;
	}

	const musicOrVideoButton = (isMusic || isVideo) ? (
		<SeeMoreButton>See All {isMusic ? 'Music' : 'Video'}</SeeMoreButton>
	) : null;

	const topButton = isTop ? (
		<SeeMoreTopButton>See All Top</SeeMoreTopButton>
	) : null;

	const ButtonContainer = widthBreakpoint >= LayoutBreakpoint.mobileLarge ? HorizontalButtonContainer : VerticalButtonContainer;

	return (
		<ButtonContainer>
			{musicOrVideoButton}
			{topButton}
		</ButtonContainer>
	);
};

const HorizontalButtonContainer = tStyled(FlexRow)`
	margin-top: ${spacing.large.value};

	${SeeMoreButton} + ${SeeMoreButton} {
		margin-left: ${spacing.medium.value};
	}
`;

const VerticalButtonContainer = tStyled.div`
	margin-top: ${spacing.large.value};

	${SeeMoreButton} + ${SeeMoreButton} {
		margin-top: ${spacing.medium.value};
	}
`;

const SeeMoreTopButton = tStyled(SeeMoreButton)`
	color: ${p => p.theme.color.tagTopForeground};
	background: ${p => p.theme.color.tagTopBackground};
`;

export interface ShowEmbeddedContentProps {
	isForArchive?: boolean;
}

export const ShowEmbeddedContent: React.FC<ShowEmbeddedContentProps> = (props) => {
	const { isForArchive, children } = props;

	const [isHidden, setIsHidden] = React.useState(!!isForArchive);

	if (isHidden) {
		function onClick() {
			setIsHidden(false);
		}

		return <ActionLink onClick={onClick}>Show Embedded Content</ActionLink>;
	}
	return <>{children}</>;
};