import { useScrollContainerElement } from '@/areas/layout/layout';
import { useElementIntersect } from '@messman/react-common';
import * as React from 'react';
import { VideoContainer } from './video';

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