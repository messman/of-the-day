import * as React from 'react';
import { GrandTitle, grandTitleHeight } from '@/core/symbol/text';
import { useTransition, animated } from 'react-spring';
import { tStyled } from '@/core/style/styled';

const words = [
	'Music',
	'Video',
	'Quote',
	'Link',
	'Image',
	'Thoughts',
	'Location'
];
function shuffle(array: any[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
shuffle(words);

export const PageTitleScrollAnimation: React.FC = () => {
	const interval = 3000;
	const offset = 3000;

	const [isAnimationDelayed, setIsAnimationDelayed] = React.useState(true);

	const [indexState, setIndexState] = React.useState({ isPaused: false, index: 0 });
	const word = (isAnimationDelayed || indexState.isPaused) ? null : words[indexState.index];

	const transitions = useTransition(word, null, {
		from: { opacity: 0, top: `-${grandTitleHeight}` },
		enter: { opacity: 1, top: `0rem` },
		leave: { opacity: 0, top: grandTitleHeight },
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

	if (isAnimationDelayed) {
		return null;
	}

	const transitionRender = transitions.map((transition) => {
		const { item, key, props } = transition;
		return (
			<PageTitleScrollAnimationContainer key={key} style={props}>
				<GrandTitle color={c => c.secondary} isBold={true}>
					{item}&nbsp;
				</GrandTitle>
			</PageTitleScrollAnimationContainer>
		);
	});

	return (
		<>
			{transitionRender}
		</>
	);
};

const PageTitleScrollAnimationContainer = tStyled(animated.span)`
	position: absolute;
	right: 0;
`;