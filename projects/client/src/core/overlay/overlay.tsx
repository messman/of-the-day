import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Spacing } from '@/core/layout/common';
import { tCss, tStyled } from '@/core/style/styled';
import { Heading3 } from '@/core/symbol/text';
import { FlexColumn, createContextConsumer, useRefLayoutEffect } from '@messman/react-common';
import { borderRadiusStyle } from '@/core/style/common';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { ManagedOverlayBoxProps } from '@/services/overlay/overlay-manager';

export interface OverlayBoxProps extends ManagedOverlayBoxProps {
	headerTitle: string;
	isSetInactiveOnBackdropClick?: boolean;
	isMaxHeight?: boolean;
}

export const OverlayBox: React.FC<OverlayBoxProps> = (props) => {
	const { isActive, onSetInactive, headerTitle, isSetInactiveOnBackdropClick, isMaxHeight, children } = props;

	function onBackdropClick() {
		if (isSetInactiveOnBackdropClick) {
			onSetInactive();
		}
	}

	const boxFlex = isMaxHeight ? '1' : 'none';
	return (
		<OverlayPortal>
			<OverlayBackdrop isActive={isActive} onClick={onBackdropClick} />
			<OverlayComponentContainer isActive={isActive}>
				<FlexColumn alignItems='center' justifyContent='space-evenly'>
					<BoxContainer flex={boxFlex} isMaxWidth={true}>
						<OverlayTitleContainer>
							<Heading3>{headerTitle}</Heading3>
						</OverlayTitleContainer>
						{children}
					</BoxContainer>
					<div />
				</FlexColumn>
			</OverlayComponentContainer>
		</OverlayPortal>
	);
};

const OverlayTitleContainer = tStyled.div`
	padding: ${Spacing.dog16};
	border-bottom: 1px solid ${p => p.theme.outlineDistinct};
`;

// Custom duration so we can make it short and snappy.
const springDuration = `.2s`;
// Use z-index as our way to present / hide content.
// Ensure it's higher than 1 (other components on the page).
const springZIndex = 5;

interface OverlayAnimationProps {
	isActive: boolean;
}

const overlayBackdropOpenTransition = tCss`
	transition: z-index .01s, opacity ${springDuration};
`;

const overlayBackdropCloseTransition = tCss`
	transition: opacity ${springDuration}, z-index .01s ${springDuration};
`;

const OverlayBackdrop = tStyled.div<OverlayAnimationProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: ${p => p.theme.bg};
	z-index: ${p => p.isActive ? springZIndex : -1};
	opacity: ${p => p.isActive ? .6 : 0};
	transition-timing-function: ease-out;
	${p => p.isActive ? overlayBackdropOpenTransition : overlayBackdropCloseTransition};
`;

const overlayContainerOpenTransition = tCss`
	transition: z-index .01s, opacity ${springDuration};
`;

// No transition on close of container - the inner content of the overlay has likely already changed (cleared).
const overlayContainerCloseTransition = tCss`
	
`;

const OverlayComponentContainer = tStyled.div<OverlayAnimationProps>`
	pointer-events: none;
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: ${Spacing.dog16};
	z-index: ${p => p.isActive ? springZIndex : -1};
	opacity: ${p => p.isActive ? 1 : 0};
	transition-timing-function: ease-out;
	${p => p.isActive ? overlayContainerOpenTransition : overlayContainerCloseTransition};
`;

interface BoxContainerProps {
	isMaxWidth: boolean;
}

const BoxContainer = tStyled(FlexColumn) <BoxContainerProps>`
	pointer-events: auto;
	position: relative;
	${p => p.isMaxWidth ? 'width: 100%;' : ''}
	max-width: ${LayoutBreakpointRem.d40}rem;
	max-height: min(80vh, ${LayoutBreakpointRem.e50}rem);
	${borderRadiusStyle};
	background-color: ${p => p.theme.subtleFill.g6Overlay};
	box-shadow: ${p => p.theme.shadow.g6Overlay};
	border: 1px solid ${p => p.theme.outlineDistinct};
	overflow: hidden;
`;

export const [OverlayPortalRootIdProvider, useOverlayPortalRootIdProvider] = createContextConsumer<string | null>(null);

export interface OverlayPortalProps {
}

/**
 * Each overlay gets its own portal. That portal goes to the portal root, which is
 * added by React into the tree near the application root.
 * Yes, not great practice.
*/
export const OverlayPortal: React.FC<OverlayPortalProps> = (props) => {

	const rootElement = useOverlayPortalRootElement();
	const [parentElement] = React.useState(() => {
		return document.createElement('div');
	});

	React.useLayoutEffect(() => {
		if (!rootElement) {
			return;
		}
		rootElement.appendChild(parentElement);

		return () => {
			if (parentElement.parentNode) {
				parentElement.parentNode.removeChild(parentElement);
			}
		};
	}, [rootElement, parentElement]);

	return ReactDOM.createPortal(props.children, parentElement);
};

const [OverlayPortalRootElementProvider, useOverlayPortalRootElement] = createContextConsumer<HTMLElement | null>();

/** 
 * Creates a div that all the overlays will portal into.
 * The div is behind the main application, so the overlay will need z-index to become visible.
 **/
export const OverlayPortalRoot: React.FC = (props) => {
	const { children } = props;

	const [rootElement, setRootElement] = React.useState<HTMLElement | null>(null);

	const rootElementRef = useRefLayoutEffect((element) => {
		setRootElement(element);
	}, []);

	return (
		<OverlayPortalRootElementProvider value={rootElement}>
			<div ref={rootElementRef} />
			{children}
		</OverlayPortalRootElementProvider>
	);
};