import { useScrollContainerElement } from '@/areas/layout/layout';
import { Spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { fontDeclarations } from '@/core/symbol/text';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { useElementIntersect, useElementSize } from '@messman/react-common';
import * as React from 'react';
import { VideoContainer } from './video';

export interface EmbeddedContentRevealProps {
	/** A key to track changes. */
	changeKey: string;
	/** If true, the content is unloaded when scrolled out of view. */
	isUnloadedWhenHidden: boolean;
	/** If true, a button must be clicked to first reveal the content. */
	isOnlyRevealedOnClick: boolean;
	/**
	 * If true, after the content is revealed the first time its width and height will be used for
	 * the replacement content.
	 */
	useElementForSize: boolean;
	/**
	 * If true, content will reveal earlier in the scrolling.
	 */
	useLargerMargin: boolean;
}

export const EmbeddedContentReveal: React.FC<EmbeddedContentRevealProps> = (props) => {
	const { changeKey, isUnloadedWhenHidden, isOnlyRevealedOnClick, children } = props;

	const [isRevealedByClick, setIsRevealedByClick] = React.useState(!isOnlyRevealedOnClick);
	React.useEffect(() => {
		setIsRevealedByClick(!isOnlyRevealedOnClick);
	}, [changeKey]);

	function onClick() {
		setIsRevealedByClick(true);
	}

	if (!isRevealedByClick) {
		return (
			<SubtleRevealButton onClick={onClick}>Load Embedded Content</SubtleRevealButton>
		);
	}
	else if (!isUnloadedWhenHidden) {
		return <>{children}</>;
	}
	return (
		<InnerEmbeddedContentReveal {...props} />
	);
};

const SubtleRevealButton = tStyled.button`
	display: block;
	max-width: ${LayoutBreakpointRem.b20Min};
	margin: 0 auto;

	text-align: center;
	${fontDeclarations.small}

	${borderRadiusStyle}
	padding: ${Spacing.dog16} ${Spacing.elf24};
	border: 1px solid transparent;
	box-shadow: ${p => p.theme.shadow.c2Button};

	cursor: pointer;
	color: ${p => p.theme.textDistinct};
	background-color: transparent;
	border-color: ${p => p.theme.outlineDistinct};
`;

// Prove it's working by setting this to negative (or, start a video and then scroll away).
const pixelsPastScrollElementForRevealSmaller = 400;
const pixelsPastScrollElementForRevealLarger = 800;
const rootMarginSmaller = `${pixelsPastScrollElementForRevealSmaller}px 0px ${pixelsPastScrollElementForRevealSmaller}px 0px`;
const rootMarginLarger = `${pixelsPastScrollElementForRevealLarger}px 0px ${pixelsPastScrollElementForRevealLarger}px 0px`;

const InnerEmbeddedContentReveal: React.FC<EmbeddedContentRevealProps> = (props) => {
	const { useElementForSize, useLargerMargin, children } = props;

	const [isRevealingContent, setIsRevealingContent] = React.useState(false);

	const scrollContainerElement = useScrollContainerElement();

	const elementIntersectRef = useElementIntersect({
		rootMargin: useLargerMargin ? rootMarginLarger : rootMarginSmaller,
		rootElement: scrollContainerElement
	}, (intersect) => {
		if (!intersect || !elementIntersectRef.current) {
			return;
		}
		setIsRevealingContent(intersect.isIntersecting);
	});

	let content: JSX.Element = null!;
	if (useElementForSize) {
		content = <EmbeddedContentSizeMatch isRevealingContent={isRevealingContent} children={children} />;
	}
	else if (isRevealingContent) {
		content = <>{children}</>;
	}
	else {
		content = <VideoContainer />;
	}

	return (
		<div ref={elementIntersectRef}>
			{content}
		</div>
	);
};

interface EmbeddedContentSizeMatchProps {
	isRevealingContent: boolean;
}

const EmbeddedContentSizeMatch: React.FC<EmbeddedContentSizeMatchProps> = (props) => {
	const { isRevealingContent, children } = props;
	// Use a ref here because the height measurement won't directly affect render on its own.
	// It's really the content reveal that will do that.
	//const elementIndex = useUnique();
	const heightRef = React.useRef<number>(0);
	// Remember - image width / height can also change due to resizing of webpage.
	const elementRef = useElementSize(500, (_width, height) => {
		if (isRevealingContent && height > 0) {
			//console.log('Set', { elementIndex, height });
			heightRef.current = height;
		}
	});
	const height = heightRef.current;

	// useChangeEffect(() => {
	// 	if (isRevealingContent) {
	// 		console.log('Reveal', { elementIndex, height });
	// 	}
	// 	else {
	// 		console.log('Hide', { elementIndex, height });
	// 	}
	// }, [isRevealingContent]);

	if (isRevealingContent) {
		return (
			<div ref={elementRef}>
				{children}
			</div>
		);
	}
	else if (height < 100) {
		return <VideoContainer />;
	}
	else {
		return <div style={{ height: `${height}px` }} />;
	}
};