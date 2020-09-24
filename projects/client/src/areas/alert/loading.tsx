import * as React from 'react';
import { Overlay } from '@/core/layout/overlay';
import { spacing } from '@/core/layout/common';
import { keyframes, tStyled } from '@/core/style/styled';
import { RegularText, Subtitle } from '@/core/symbol/text';
import { CONSTANT } from '@/services/constant';
import { PopupType, usePopup } from './popup';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { Flex, FlexColumn } from '@messman/react-common';

export interface LoadingProps {
	isLoading: boolean;
	error: Error | null;
}

/**
 * Loading component will render over the top of any content and show a loading animation.
 */
export const Loading: React.FC<LoadingProps> = (props) => {

	const { isLoading, error } = props;
	const setPopup = usePopup()[1];
	const [isStillWorking, setIsStillWorking] = React.useState(false);

	let loadingBody: JSX.Element | null = null;

	React.useEffect(() => {
		let timeoutId = -1;
		if (!isLoading) {
			return;
		}
		timeoutId = window.setTimeout(() => {
			setIsStillWorking(true);
		}, CONSTANT.fetchStillWaitingTimeout);

		return () => {
			if (timeoutId !== -1) {
				window.clearTimeout(timeoutId);
			}
			setIsStillWorking(false);
		};
	}, [isLoading]);

	// If the application set a pop-up...
	if (isLoading) {

		/*
			Structure:
			- Outer FlexColumn that centers each row and spaces them apart evenly.
				- A main body that is sized by its contents.
				- A Flex element with flex=0 that is essentially invisible.. but combined with space-evenly, pushes up the body to be in the upper section of the screen instead of exactly centered.
		*/
		loadingBody = (
			<FlexColumn alignItems='center' justifyContent='space-evenly'>
				<LoadingBody flex='none'>
					<StillWorkingText isShowing={isStillWorking}>Still</StillWorkingText>
					<LoadingDot index={0}>
						<LoadingCompass index={0} />
					</LoadingDot>
					<Subtitle padding={spacing.medium.value}>Loading</Subtitle>
				</LoadingBody>
				<Flex flex='none' />
			</FlexColumn>
		);
	}

	// TODO - this does not belong here.
	React.useEffect(() => {
		if (!isLoading && !!error) {
			setPopup({
				type: PopupType.error,
				title: 'Could Not Load Data',
				text: 'The application failed to load the data needed to show tide and weather information. Please wait a bit and then reload the page.',
				onDataRefresh: null,
				forcePageReload: true
			});
		}
	}, [isLoading, error]);

	return (
		<Overlay isActive={isLoading} backdropOpacity={1} component={loadingBody}>
			{props.children}
		</Overlay>
	);
};

interface StillWorkingTextProps {
	isShowing: boolean;
}

const StillWorkingText = tStyled(RegularText) <StillWorkingTextProps>`
	opacity: ${p => p.isShowing ? 1 : 0};
	transition: opacity .1s linear;
`;

const LoadingBody = tStyled(Flex)`
	/* Prevents crazy resizing scenarios. */
	min-width: 16rem;
	max-width: 24rem;
	min-height: 10rem;
	margin: ${spacing.small.value};
	text-align: center;
`;

const delay = 0;

const scale = keyframes`
	0%, 100% { 
		transform: scale(.8);
	}
	50% { 
		transform: scale(1);
	}
`;

interface LoadingDotProps {
	index: number;
}

const LoadingDot = tStyled.div<LoadingDotProps>`
	display: inline-block;
	margin: .25rem;
	animation: ${scale} 6s infinite ease-in-out both;
	animation-delay: -${p => p.index * delay}s;
`;

const LoadingCompass: React.FC<LoadingDotProps> = (props) => {

	return (
		<LoadingCompassContainer index={props.index} >
			<Icon type={iconTypes.compass} fillColor={c => c.accent} height='3rem' />
		</LoadingCompassContainer>
	);
};

const spin = keyframes`
	0% { 
        transform: rotate(-180deg);
    }
    100% {
        transform: rotate(180deg);
    }
`;

const LoadingCompassContainer = tStyled.div<LoadingDotProps>`
	width: 3rem;
	height: 3rem;

	animation: ${spin} 3s -${p => p.index * delay}s linear infinite;
`;


