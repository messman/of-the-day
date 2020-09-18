import * as React from 'react';
import { GrandTitle, Title, grandTitleHeight, titleHeight } from '@/core/symbol/text';
import { useTransition, animated } from 'react-spring';
import { tStyled } from '@/core/style/styled';
import { FlexRow, useWindowLayout } from '@messman/react-common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';

const words = [
	'Music',
	'Video',
	'Quote',
	'Link',
	'Image',
	'Thoughts',
	'Location',
	'Notes',
	'Article'
];
function shuffle(array: any[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
shuffle(words);

export interface PageTitleScrollAnimationProps {
}

export const PageTitleScrollAnimation: React.FC<PageTitleScrollAnimationProps> = () => {
	const { widthBreakpoint } = useWindowLayout();

	// Default to desktop.
	let TextComponent = GrandTitle;
	let textHeight = grandTitleHeight;
	if (widthBreakpoint <= LayoutBreakpoint.tablet) {
		TextComponent = Title;
		textHeight = titleHeight;
	}

	const interval = 3000;
	const offset = 3000;

	const [isAnimationDelayed, setIsAnimationDelayed] = React.useState(true);

	const [indexState, setIndexState] = React.useState({ isPaused: false, index: 0 });
	const word = (isAnimationDelayed || indexState.isPaused) ? null : words[indexState.index];

	const transitions = useTransition(word, null, {
		from: { opacity: 0, top: `-${textHeight}` },
		enter: { opacity: 1, top: `0rem` },
		leave: { opacity: 0, top: textHeight },
	});

	React.useEffect(() => {
		if (isAnimationDelayed) {
			return;
		}

		const id = window.setInterval(() => {
			setIndexState((p) => {
				if (p.isPaused) {
					return {
						isPaused: false,
						index: (p.index + 1) % words.length
					};
				}
				return {
					isPaused: true,
					index: p.index
				};
			});
		}, interval);

		return () => {
			window.clearInterval(id);
		};
	}, [isAnimationDelayed]);

	// Initial delay of animation
	React.useEffect(() => {
		const id = window.setTimeout(() => {
			setIsAnimationDelayed(false);
		}, offset);
		return () => {
			window.clearTimeout(id);
		};
	}, []);

	let transitionRender: JSX.Element[] = [];
	if (!isAnimationDelayed) {

		transitionRender = transitions.map((transition) => {
			const { item, key, props } = transition;
			return (
				<PageTitleScrollAnimationContainer key={key} style={props}>
					<TextComponent color={c => c.headerSpecialText}>
						{item}&nbsp;
				</TextComponent>
				</PageTitleScrollAnimationContainer>
			);
		});
	}

	return (
		<TextComponent isInline={true} isRelative={true} color={c => c.textDistinct}>
			<SideContainer flex='none' justifyContent='flex-end'>
				{transitionRender}
			</SideContainer>
			<>Of The Day</>
		</TextComponent>
	);
};

const PageTitleScrollAnimationContainer = tStyled(animated.span)`
	position: absolute;
	right: 0;
`;

const SideContainer = tStyled(FlexRow)`
	width: 0;
	overflow: visible;
`;