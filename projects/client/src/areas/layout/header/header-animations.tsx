import * as React from 'react';
import { keyframes, tCss, tStyled } from '@/core/style/styled';
import { iconTypes, SizedIcon, SVGIconType } from '@/core/symbol/icon';
import { FontWeight } from '@/core/style/theme';
import { Spacing } from '@/core/layout/common';
import { sortRandom } from '@/services/archive/sort';
import { useDocumentVisibility } from '@messman/react-common';

/*
	Holds the animating header components (subtitle and icon).
*/

export interface HeaderAnimationState2 {
	entity: HeaderAnimationEntity2 | null;
	index: number;
	status: HeaderAnimationEntityStatus;
}

export interface HeaderAnimationEntity2 {
	text: string;
	icon: SVGIconType;
}

export enum HeaderAnimationEntityStatus {
	entering,
	entered,
	exiting
}

const baseEntity: HeaderAnimationEntity2 = {
	text: 'This is',
	icon: iconTypes.brand
};

let entities: HeaderAnimationEntity2[] = [
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
		text: 'Image',
		icon: iconTypes.image
	},
	{
		text: 'Link',
		icon: iconTypes.link
	},
	{
		text: 'Update',
		icon: iconTypes.activity
	},
];
// Sort our entities on page load so it's different each time.
entities = [baseEntity, ...sortRandom(entities)];

// Our settings for the timing of the animations.
const delayEnteredBase = 4500;
const delayEnteredOtherEntity = 2500;
const delayNoEntity = 100;
const delayEnteringExiting = 450;

const defaultState: HeaderAnimationState2 = {
	entity: baseEntity,
	index: 0,
	status: HeaderAnimationEntityStatus.entered
};

// Changes the chosen entity ('Music' and its icon, for example) with a timeout.
export function useHeaderAnimationState2(isActive: boolean): HeaderAnimationState2 {
	const isDocumentVisible = useDocumentVisibility();
	const [entityState, setEntityState] = React.useState<HeaderAnimationState2>(defaultState);
	const { entity, index, status } = entityState;

	React.useEffect(() => {
		if (!isDocumentVisible || !isActive) {
			return;
		}

		let delay = delayEnteredOtherEntity;
		if (!entity) {
			// Currently blank.
			delay = delayNoEntity;
		}
		else if (status === HeaderAnimationEntityStatus.exiting || status === HeaderAnimationEntityStatus.entering) {
			// Currently entering or exiting.
			delay = delayEnteringExiting;
		}
		else if (entity === baseEntity) {
			delay = delayEnteredBase;
		}

		const id = window.setTimeout(() => {
			setEntityState((p) => {
				/*
					Calculate new from old.
				*/
				const { entity, index, status } = p;
				console.log(p);

				if (!entity) {
					const newIndex = (index + 1) % entities.length;
					// Pick new entity.
					return {
						status: HeaderAnimationEntityStatus.entering,
						entity: entities[newIndex],
						index: newIndex
					};
				}
				else if (status === HeaderAnimationEntityStatus.exiting) {
					// Clear entity.
					return {
						status: status,
						entity: null,
						index: index
					};
				}
				else {
					// Rotate status.
					return {
						status: status === HeaderAnimationEntityStatus.entering ? HeaderAnimationEntityStatus.entered : HeaderAnimationEntityStatus.exiting,
						entity: entity,
						index: index
					};
				}
			});
		}, delay);

		return () => {
			window.clearTimeout(id);
		};
	}, [entity, index, status, isDocumentVisible, isActive]);

	return entityState;
}

export interface HeaderSubtitleAnimationProps2 {
	height: string;
	animationState: HeaderAnimationState2;
}

export const HeaderSubtitleAnimation2: React.FC<HeaderSubtitleAnimationProps2> = (props) => {
	const { animationState, height } = props;
	const { entity, status } = animationState;
	const text = entity?.text || '';

	const transitionRender = text ? (
		<TextAnimationContainer animationStatus={status} >
			<TextContainer dataHeight={height}>
				{text}
			</TextContainer>
		</TextAnimationContainer>
	) : null;

	return (
		<TextHeightContainer dataHeight={height}>
			{transitionRender}
		</TextHeightContainer>
	);
};

const textEnteringAnimation = keyframes`
	from {
		opacity: 0;
		top: -100%;
	}
	to {
		opacity: 1;
		top: 0;
	}
`;

const textExitingAnimation = keyframes`
	from {
		opacity: 1;
		top: 0;
	}
	to {
		opacity: 0;
		top: 100%;
	}
`;

const textEnteringStyle = tCss`
	animation: ${textEnteringAnimation} ${delayEnteringExiting / 1000}s forwards ease-out;
`;

const textExitingStyle = tCss`
	animation: ${textExitingAnimation} ${delayEnteringExiting / 1000}s forwards ease-in;
`;

function getTextAnimationForStatus(animationStatus: HeaderAnimationEntityStatus) {
	if (animationStatus === HeaderAnimationEntityStatus.entering) {
		return textEnteringStyle;
	}
	if (animationStatus === HeaderAnimationEntityStatus.exiting) {
		return textExitingStyle;
	}
	return undefined;
}

interface TextAnimationContainerProps {
	animationStatus: HeaderAnimationEntityStatus;
}

const TextAnimationContainer = tStyled.div<TextAnimationContainerProps>`
	position: absolute;
	left: 0;
	${p => getTextAnimationForStatus(p.animationStatus)}
`;

interface HeightContainerProps {
	dataHeight: string;
}

const TextContainer = tStyled.div<HeightContainerProps>`
	line-height: ${p => p.dataHeight};
	font-size: ${p => p.dataHeight};
	height: ${p => p.dataHeight};
	font-weight: ${FontWeight.bold};
	color: ${p => p.theme.textOnAccentFill};
`;

const TextHeightContainer = tStyled.div<HeightContainerProps>`
	position: relative;
	height: ${p => p.dataHeight};
`;


export interface HeaderIconAnimationProps2 {
	titleHeight: string;
	subtitleHeight: string;
	rightMargin: string;
	animationState: HeaderAnimationState2;
}

export const HeaderIconAnimation2: React.FC<HeaderIconAnimationProps2> = (props) => {
	const { animationState, titleHeight, subtitleHeight, rightMargin } = props;
	const { entity, status } = animationState;
	const icon = entity?.icon || null;

	const transitionRender = icon ? (
		<IconAnimationContainer animationStatus={status} >
			<IconPaddingWrapper>
				<SizedIcon type={icon} size='100%' />
			</IconPaddingWrapper>
		</IconAnimationContainer>
	) : null;

	return (
		<IconHeightContainer titleHeight={titleHeight} subtitleHeight={subtitleHeight} rightMargin={rightMargin}>
			<IconBackground />
			{transitionRender}
		</IconHeightContainer>
	);
};

const iconEnteringAnimation = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const iconExitingAnimation = keyframes`
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
`;

const iconEnteringStyle = tCss`
	animation: ${iconEnteringAnimation} ${delayEnteringExiting / 1000}s forwards ease-out;
`;

const iconExitingStyle = tCss`
	animation: ${iconExitingAnimation} ${delayEnteringExiting / 1000}s forwards ease-in;
`;

function getIconAnimationForStatus(animationStatus: HeaderAnimationEntityStatus) {
	if (animationStatus === HeaderAnimationEntityStatus.entering) {
		return iconEnteringStyle;
	}
	if (animationStatus === HeaderAnimationEntityStatus.exiting) {
		return iconExitingStyle;
	}
	return undefined;
}

interface IconAnimationContainerProps {
	animationStatus: HeaderAnimationEntityStatus;
}

const IconAnimationContainer = tStyled.div<IconAnimationContainerProps>`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
color: ${p => p.theme.textOnAccentFill};
	${p => getIconAnimationForStatus(p.animationStatus)}
`;

const IconPaddingWrapper = tStyled.div`
	position: relative;
	width: 100%;
	height: 100%;
	padding: ${Spacing.dog16};
`;

interface IconBackgroundProps {
}

const IconBackground = tStyled.div<IconBackgroundProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: 5px solid ${p => p.theme.textOnAccentFill};
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