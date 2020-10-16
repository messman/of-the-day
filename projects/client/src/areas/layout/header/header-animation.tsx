import * as React from 'react';
import { useTransition, animated } from 'react-spring';
import { tStyled } from '@/core/style/styled';
import { Icon, iconTypes, SVGIconType } from '@/core/symbol/icon';
import { FontWeight } from '@/core/style/theme';
import { spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { sortRandom } from '@/services/archive/sort';

/*
	Holds the animating header components (subtitle and icon).
*/

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
		icon: iconTypes.link
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
	},
	{
		text: 'Project',
		icon: iconTypes.project
	}
];
// Sort our entities on page load so it's different each time.
entities = [baseEntity, ...sortRandom(entities)];

// Our settings for the timing of the animations.
const delayOnBase = 4500;
const delayOnBlank = 500;
const delayOnEntity = 2500;

// Changes the chosen entity ('Music' and its icon, for example) with a timeout.
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

	// Use opacity on in and out. Come in from top, out from bottom.
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
	rightMargin: string;
	animationState: HeaderAnimationState;
}

export const HeaderIconAnimation: React.FC<HeaderIconAnimationProps> = (props) => {
	const { animationState, titleHeight, subtitleHeight, rightMargin } = props;
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
		<IconHeightContainer titleHeight={titleHeight} subtitleHeight={subtitleHeight} rightMargin={rightMargin}>
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
	box-shadow: 0 0 6px 1px ${p => p.theme.color.accentGradientFillShadow};
`;

interface IconHeightContainerProps {
	titleHeight: string;
	subtitleHeight: string;
	rightMargin: string;
}

const IconHeightContainer = tStyled.div<IconHeightContainerProps>`
	position: relative;
	width: calc(${p => p.titleHeight} + ${p => p.subtitleHeight});
	height: calc(${p => p.titleHeight} + ${p => p.subtitleHeight});
	margin-right: ${p => p.rightMargin};
`;