import * as React from 'react';
import { Spacing, Block } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { IconSize, iconTypes, SizedIcon } from '@/core/symbol/icon';
import { SmallText, Heading2, ParagraphCenter } from '@/core/symbol/text';
import { CONSTANT } from '@/services/constant';
import { useWindowMediaLayout, FlexColumn } from '@messman/react-common';
import { isInvalidLayout } from '@/services/layout/window-layout';

export interface InvalidCheckProps {
	/** Used for testing. Messages about the application as a whole. */
	forceAlertMessages?: string[],
	/** Used for testing. Whether to show the Internet Explorer warning. */
	isForceInternetExplorer?: boolean,
	/** Used for testing. Whether to show the invalid layout warning. */
	isForceInvalidLayout?: boolean,
	/** Used for error boundary. */
	error: Error | null;
}

interface InvalidCheckState {
	error: Error | null;
}

/**
 * This is a class component so that it can act as our error boundary.
 * https://reactjs.org/docs/error-boundaries.html
 */
export class InvalidCheck extends React.Component<InvalidCheckProps, InvalidCheckState> {
	constructor(props: InvalidCheckProps) {
		super(props);
		this.state = { error: this.props.error || null };
	}

	static getDerivedStateFromError(error: Error): InvalidCheckState {
		return {
			error: error
		};
	}

	componentDidCatch(error: Error, _: any): void {
		console.error('Error Captured by InvalidCheck', error);
	}

	render() {
		const invalidCheckProps = { ...this.props };
		invalidCheckProps.error = this.state.error;

		return (
			<InvalidCheckParser
				forceAlertMessages={this.props.forceAlertMessages}
				isForceInternetExplorer={this.props.isForceInternetExplorer}
				isForceInvalidLayout={this.props.isForceInvalidLayout}
				error={this.state.error}
			>
				{this.props.children}
			</InvalidCheckParser>
		);
	}
}


/** Wrapper component that will check for layout issues, build alerts, etc and show an overlay on the screen. */
const InvalidCheckParser: React.FC<InvalidCheckProps> = (props) => {

	// Get our layout info so we can check its validity.
	const windowLayout = useWindowMediaLayout();

	let invalidMessages: string[] = [];
	let isAllowRefreshClick = false;

	const forceAlertMessages = props.forceAlertMessages || [];
	const constantAlertMessages = CONSTANT.alertMessages || [];
	const alertMessages = forceAlertMessages.length ? forceAlertMessages : constantAlertMessages;
	if (alertMessages.length) {
		invalidMessages = alertMessages;
		isAllowRefreshClick = true;
	}
	else if (props.error) {
		invalidMessages = ['There was an unexpected error.', 'It might caused by a bug.'];
		isAllowRefreshClick = true;
	}
	else if (props.isForceInternetExplorer || /MSIE|Trident/.test(window.navigator.userAgent)) {
		// Honestly, we may never even get here. Internet Explorer may cause the application to fail before we ever run this check. Nice to keep just in case, though.
		invalidMessages = [`It looks like you're using Internet Explorer`, 'Internet Explorer is not supported for this application.', 'Please, we beg you - use a more modern browser.'];
	}
	else if (props.isForceInvalidLayout || isInvalidLayout(windowLayout)) {
		invalidMessages = ['Your screen size and/or rotation are invalid for this application', 'Consider rotating your device or using a different device.'];
		isAllowRefreshClick = true;
	}

	// If we have messages, show. And don't show the children underneath.
	// TODO - This destroys our render tree, and may cause expensive recomputation in the case of the invalid layout case.
	if (invalidMessages && invalidMessages.length) {
		return <InvalidCenter messages={invalidMessages} isAllowRefreshClick={isAllowRefreshClick} />;
	}
	else {
		return <>{props.children}</>;
	}
};

export interface InvalidCenterProps {
	/** Messages to show. Each will become its own line. */
	messages: string[];
	isAllowRefreshClick: boolean;
}

const InvalidCenter: React.FC<InvalidCenterProps> = (props) => {

	// First message will get a larger size.
	const [firstMessage, ...otherMessages] = props.messages;

	// Other messages become regular text.
	const otherMessagesText = otherMessages.map((m, i) => {
		const key = `${i}_${m}`;
		return (
			<ParagraphCenter key={key}>{m}</ParagraphCenter>
		);
	});

	let clickInstruction: JSX.Element | null = null;
	let onClick: () => void = () => { };
	if (props.isAllowRefreshClick) {
		onClick = function () {
			window.location.reload();
		};
		clickInstruction = (
			<SmallText>Click/tap here to refresh the application.</SmallText>
		);
	}


	/*
		Structure:
		- Outer FlexRow wrapper that takes up 100% of parent
			- Inner Flex that is centered and is sized to its contents
	*/
	return (
		<InvalidCenterWrapper justifyContent='space-around' alignItems='center' onClick={onClick}>
			<div>
				<RedSizedIcon type={iconTypes.alert} size={IconSize.b_large} />
				<Block.Dog16 />
				<Heading2>{firstMessage}</Heading2>
				{otherMessagesText}
				{clickInstruction}
			</div>
			<div />
		</InvalidCenterWrapper>
	);
};

/* Pad to ensure the inner Flex content doesn't run up against the edge. */
const InvalidCenterWrapper = tStyled(FlexColumn)`
	padding: ${Spacing.dog16};
	text-align: center;
`;

const RedSizedIcon = tStyled(SizedIcon)`
	color: ${p => p.theme.system.error};
`;