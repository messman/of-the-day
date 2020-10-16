import { useScrollContainerElement } from '@/areas/layout/layout';
import { Card, CardProps } from '@/core/card/card';
import { useElementIntersect } from '@messman/react-common';
import { IPost, IPostElementType } from 'oftheday-shared';
import * as React from 'react';
import { VideoContainer } from './video';

export interface PostsElementProps<T> {
	value: T;
	isForArchive?: boolean;
	hideTitle?: boolean;
	archivePost?: IPost;
}

export interface PostsElementFC<T> extends React.FC<PostsElementProps<T | undefined>> {
	element: IPostElementType;
}

/**
 * Creates a component that only displays if the props are correctly validated (present).
 */
export function createPostsElement<T>(Component: React.FC<PostsElementProps<T>>, element: IPostElementType, validator: (value: T | undefined) => boolean): PostsElementFC<T> {
	const fc = ((props: PostsElementProps<T | undefined>) => {
		if (validator(props.value)) {
			return <Component value={props.value!} isForArchive={props.isForArchive} hideTitle={props.hideTitle} archivePost={props.archivePost} />;
		}
		return null;
	}) as unknown as PostsElementFC<T>;
	fc.element = element;
	return fc;
}

export interface PostCardProps extends Omit<CardProps, 'subtitle'> {
	isForArchive?: boolean;
	hideTitle?: boolean;
	archivePost?: IPost;
}

/**
 * Specific type of card that is used for post elements.
 * Hides the title under certain circumstances (archive + only type being displayed).
*/
export const PostCard: React.FC<PostCardProps> = (props) => {
	const { title, isForArchive, hideTitle, archivePost, icon, children } = props;

	let subtitleRender: JSX.Element | null = null;
	if (isForArchive && archivePost) {
		const { date, dayNumber } = archivePost;

		subtitleRender = <>{date}&nbsp;&middot;&nbsp;Day {dayNumber}</>;
	}

	const optionalTitle = hideTitle ? null : title;

	return (
		<Card
			title={optionalTitle}
			icon={icon}
			subtitle={subtitleRender}
		>
			{children}
		</Card>
	);
};

export interface EmbeddedContentRevealProps {
	isRevealedOnMount: boolean;
}

export const EmbeddedContentReveal: React.FC<EmbeddedContentRevealProps> = (props) => {
	const { isRevealedOnMount, children } = props;
	if (isRevealedOnMount) {
		return <>{children}</>;
	}
	return (
		<InnerEmbeddedContentReveal>
			{children}
		</InnerEmbeddedContentReveal>
	);
};

// Prove it's working by setting this to negative (or, start a video and then scroll away).
const pixelsPastScrollElementForReveal = 400;
const rootMargin = `${pixelsPastScrollElementForReveal}px 0px ${pixelsPastScrollElementForReveal}px 0px`;

const InnerEmbeddedContentReveal: React.FC = (props) => {
	const [isRevealingContent, setIsRevealingContent] = React.useState(false);

	const scrollContainerElement = useScrollContainerElement();

	const elementIntersectRef = useElementIntersect({
		rootMargin: rootMargin,
		rootElement: scrollContainerElement
	}, (intersect) => {
		if (!intersect || !elementIntersectRef.current) {
			return;
		}
		setIsRevealingContent(intersect.isIntersecting);
	});

	const content = isRevealingContent ? <>{props.children}</> : <VideoContainer />;

	return (
		<>
			<div ref={elementIntersectRef} />
			{content}
		</>
	);
};