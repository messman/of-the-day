import * as React from 'react';
import { useTransition, animated } from 'react-spring';
import { tStyled } from '@/core/style/styled';
import { Icon, iconTypes, SVGIconType } from '@/core/symbol/icon';
import { FontWeight } from '@/core/style/theme';
import { spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';

export interface HeaderAnimationState {
	entity: HeaderAnimationEntity | null;
}

export interface HeaderAnimationEntity {
	text: string;
	icon: SVGIconType;
}

const baseEntity: HeaderAnimationEntity = {
	text: 'This is',
	icon: iconTypes.brand
};

let entities: HeaderAnimationEntity[] = [
	{
		text: 'Music',
		icon: iconTypes.music
	},
	{
		text: 'Video',
		icon: iconTypes.video
	},
	{
		text: 'Quote',
		icon: iconTypes.quote
	},
	{
		text: 'Link',
		icon: iconTypes.screen
	},
	{
		text: 'Image',
		icon: iconTypes.image
	},
	{
		text: 'Thoughts',
		icon: iconTypes.thought
	},
	{
		text: 'Location',
		icon: iconTypes.compassLarge
	},
	{
		text: 'Activity',
		icon: iconTypes.activity
	}
];
function shuffle(array: any[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
shuffle(entities);
entities = [baseEntity, ...entities];

const delayOnBase = 4500;
const delayOnBlank = 800;
const delayOnEntity = 2500;

export function useHeaderAnimationState(): HeaderAnimationState {
	const [entityState, setEntityState] = React.useState({
		isBlank: false,
		index: 0
	});
	const { isBlank, index } = entityState;

	React.useEffect(() => {
		const isBase = !isBlank && index === 0;
		const delay = isBase ? delayOnBase : (isBlank ? delayOnBlank : delayOnEntity);

		const id = window.setTimeout(() => {
			setEntityState((p) => {
				const wasBlank = p.isBlank;
				return {
					isBlank: !wasBlank,
					index: wasBlank ? (p.index + 1) % entities.length : p.index
				};
			});
		}, delay);

		return () => {
			window.clearTimeout(id);
		};
	}, [isBlank, index]);

	return {
		entity: isBlank ? null : entities[index]
	};
}

export interface HeaderSubtitleAnimationProps {
	height: string;
	animationState: HeaderAnimationState;
}

export const HeaderSubtitleAnimation: React.FC<HeaderSubtitleAnimationProps> = (props) => {
	const { animationState, height } = props;
	const { entity } = animationState;
	const text = entity?.text || '';

	const transitions = useTransition(text, null, {
		initial: { opacity: 1, top: `0rem` },
		from: { opacity: 0, top: `-${height}` },
		enter: { opacity: 1, top: `0rem` },
		leave: { opacity: 0, top: height },
	});

	const transitionRender = transitions.map((transition) => {
		const { item, key, props } = transition;
		return (
			<TextAnimationContainer key={key} style={props}>
				<TextContainer dataHeight={height}>
					{item}
				</TextContainer>
			</TextAnimationContainer>
		);
	});

	return (
		<TextHeightContainer dataHeight={height}>
			{transitionRender}
		</TextHeightContainer>
	);
};

const TextAnimationContainer = tStyled(animated.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

interface HeightContainerProps {
	dataHeight: string;
}

const TextContainer = tStyled.div<HeightContainerProps>`
	line-height: ${p => p.dataHeight};
	font-size: ${p => p.dataHeight};
	font-weight: ${FontWeight.extraBold};
	color: ${p => p.theme.color.textDistinctOnAccent};
`;

const TextHeightContainer = tStyled.div<HeightContainerProps>`
	position: relative;
	height: ${p => p.dataHeight};
`;


export interface HeaderIconAnimationProps {
	titleHeight: string;
	subtitleHeight: string;
	animationState: HeaderAnimationState;
}

export const HeaderIconAnimation: React.FC<HeaderIconAnimationProps> = (props) => {
	const { animationState, titleHeight, subtitleHeight } = props;
	const { entity } = animationState;
	const icon = entity?.icon || null;

	const transitions = useTransition(icon, null, {
		initial: { opacity: 1 },
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	});

	const transitionRender = transitions.map((transition) => {
		const { item, key, props } = transition;

		const iconRender = item ? (
			<Icon type={item} height='100%' fillColor={c => c.textDistinctOnAccent} />
		) : null;

		return (
			<IconAnimationContainer key={key} style={props}>
				<IconPaddingWrapper>
					{iconRender}
				</IconPaddingWrapper>
			</IconAnimationContainer>
		);
	});

	return (
		<IconHeightContainer titleHeight={titleHeight} subtitleHeight={subtitleHeight}>
			<IconBackground />
			{transitionRender}
		</IconHeightContainer>
	);
};

const IconAnimationContainer = tStyled(animated.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

interface IconPaddingWrapperProps {
}

const IconPaddingWrapper = tStyled.div<IconPaddingWrapperProps>`
	position: relative;
	width: 100%;
	height: 100%;
	padding: ${spacing.medium.value};
`;

interface IconBackgroundProps {
}

const IconBackground = tStyled.div<IconBackgroundProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	${borderRadiusStyle}
	background-color: ${p => p.theme.color.accentGradientFill};
	box-shadow: 0 0 8px 0 ${p => p.theme.color.accentGradientFillShadow};
`;

interface IconHeightContainerProps {
	titleHeight: string;
	subtitleHeight: string;
}

const IconHeightContainer = tStyled.div<IconHeightContainerProps>`
	position: relative;
	width: calc(${p => p.titleHeight} + ${p => p.subtitleHeight});
	height: calc(${p => p.titleHeight} + ${p => p.subtitleHeight});
	margin-right: ${spacing.medium.value};
`;