import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { Heading2 } from '@/core/symbol/text';
import { FlexColumn, createContextConsumer, useRefLayoutEffect } from '@messman/react-common';
import { borderRadiusStyle } from '@/core/style/common';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { useSpring, animated } from 'react-spring';
import { ManagedOverlayBoxProps } from '@/services/overlay/overlay-manager';

export interface OverlayBoxProps extends ManagedOverlayBoxProps {
	headerTitle: string;
	isSetInactiveOnBackdropClick?: boolean;
	isMaxHeight?: boolean;
}

// Custom duration so we can make it short and snappy.
const springDuration = 100;
// Use z-index as our way to present / hide content.
// Ensure it's higher than 1 (other components on the page).
const springZIndex = 5;

export const OverlayBox: React.FC<OverlayBoxProps> = (props) => {

	const { isActive, onSetInactive, headerTitle, isSetInactiveOnBackdropClick, isMaxHeight, children } = props;

	function onBackdropClick() {
		if (isSetInactiveOnBackdropClick) {
			onSetInactive();
		}
	}

	// Props for inner components - animated opacity, but instant z-index.
	// z-index is what makes the components visible.
	const springPropsBackdrop = useSpring({
		config: { duration: springDuration },
		from: { opacity: 0, zIndex: 0 },
		to: async (next: any) => {
			if (isActive) {
				await next({ zIndex: springZIndex, immediate: true });
				await next({ opacity: .6, immediate: false });
			}
			else {
				await next({ opacity: 0, immediate: false });
				await next({ zIndex: -1, immediate: true });
			}
		}
	});
	const springPropsComponentContainer = useSpring({
		config: { duration: springDuration },
		from: { opacity: 0, zIndex: 0 },
		to: async (next: any) => {
			if (isActive) {
				await next({ zIndex: springZIndex, immediate: true });
				await next({ opacity: 1, immediate: false });
			}
			else {
				// Note, here on the hide, we do opacity immediately.
				// This is because the content inside of the overlay may already disappear immediately.
				await next({ opacity: 0, immediate: true });
				await next({ zIndex: -1, immediate: true });
			}
		}
	});

	const boxFlex = isMaxHeight ? '1' : 'none';
	return (
		<OverlayPortal>
			<OverlayBackdrop style={springPropsBackdrop} onClick={onBackdropClick} />
			<OverlayComponentContainer style={springPropsComponentContainer}>
				<FlexColumn alignItems='center' justifyContent='space-evenly'>
					<BoxContainer flex={boxFlex} isMaxWidth={true}>
						<OverlayTitleContainer>
							<Heading2>{headerTitle}</Heading2>
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

const OverlayBackdrop = tStyled(animated.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: ${p => p.theme.bg};
`;

const OverlayComponentContainer = tStyled(animated.div)`
	pointer-events: none;
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: ${Spacing.dog16};
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