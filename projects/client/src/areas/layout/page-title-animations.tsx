import * as React from 'react';
import { GrandTitle, grandTitleHeight } from '@/core/symbol/text';
import { ThemePickColor } from '@/core/style/theme';
import { useTransition, animated } from 'react-spring';
import { Icon, SVGIconType } from '@/core/symbol/icon';
import { styled } from '@/core/style/styled';
import { FlexRow } from '@messman/react-common';
import { spacing } from '@/core/style/common';

const iconColor: ThemePickColor = c => c.primaryB;

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
				<GrandTitle dataColor={c => c.secondary} isBold={true}>
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

const PageTitleScrollAnimationContainer = styled(animated.span)`
	position: absolute;
	right: 0;
	z-index: 20;
`;

export type IconAnimationDefinition = [SVGIconType, (number | (number[]))];
export type IconAnimationDefinitions = { [key: string]: IconAnimationDefinition; };

export interface IconScrollAnimationProps {
	delayFactor: number;
	icons: IconAnimationDefinitions;
}

function getRotationFromIconsDefinition(definition: IconAnimationDefinition) {
	const rotations = definition[1];
	if (Array.isArray(rotations)) {
		return rotations[Math.floor(Math.random() * rotations.length)];
	}
	else {
		return rotations;
	}
}

const iconSwapInterval = 16000;

export const IconScrollAnimation: React.FC<IconScrollAnimationProps> = (props) => {
	const { icons, delayFactor } = props;
	const iconNames = React.useMemo(() => {
		return Object.keys(icons);
	}, [icons]);

	const [isAnimationStarting, setIsAnimationStarting] = React.useState(true);
	const [iconSelection, setIconSelection] = React.useState(() => {
		const iconIndex = Math.floor(Math.random() * iconNames.length);
		return {
			iconIndex: iconIndex,
			rotation: getRotationFromIconsDefinition(icons[iconNames[iconIndex]])
		};
	});

	let interval = iconSwapInterval;
	if (isAnimationStarting) {
		interval += (iconSwapInterval * delayFactor);
	}

	const transitions = useTransition(iconSelection, i => i.iconIndex, {
		initial: { opacity: 1, scale: 1 },
		from: { opacity: 0, scale: 1.2 },
		enter: { opacity: 1, scale: 1 },
		leave: { opacity: 0, scale: .8 }
	});

	React.useEffect(() => {
		const id = window.setInterval(() => {
			setIsAnimationStarting(false);
			setIconSelection((p) => {
				const newIconIndex = (p.iconIndex + 1) % iconNames.length;
				return {
					iconIndex: newIconIndex,
					rotation: getRotationFromIconsDefinition(icons[iconNames[newIconIndex]])
				};
			});
		}, interval);

		return () => {
			window.clearInterval(id);
		};
	}, [iconNames, interval]);

	const transitionRender = transitions.map((transition) => {
		const { item, key, props } = transition;

		const { scale, ...otherProps } = props;

		const [iconType] = icons[iconNames[item.iconIndex]];
		const rotation = item.rotation;

		let render: JSX.Element | null = null;
		if (iconType) {
			render = <Icon type={iconType} fillColor={iconColor} height='40rem' />;
		}

		return (
			<IconScrollContainer key={key} dataRotation={rotation} flex='none' justifyContent='center' alignItems='center'>
				<animated.div style={{ transform: scale!.interpolate((s) => `scale(${s})`), ...otherProps }}>
					{render}
				</animated.div>
			</IconScrollContainer>
		);
	});

	return (
		<LayeringContainer>
			{transitionRender}
		</LayeringContainer>
	);
};


const LayeringContainer = styled.div`
	margin-top: ${spacing.large.value};
	position: relative;
	width: 0;
	height: 0;
	z-index: 10;
`;

interface IconScrollContainerProps {
	dataRotation: number;
}

const IconScrollContainer = styled(FlexRow) <IconScrollContainerProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 0;
	overflow: visible;
	transform: rotate(${p => p.dataRotation}deg);
`;