import styled, { css, keyframes, StyledFC } from "../../styles/theme";
import * as React from "react";

const shimmerKeyframe = keyframes`
	0% {
		opacity: .1;
	}
	100% {
		opacity: .4;
    }
`;

const _Placeholder = styled.span`
	position: relative;
	display: inline-block;

	color: transparent;

	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	animation-duration: .8s;
	animation-direction: alternate;
	animation-fill-mode: none;
	animation-iteration-count: infinite;
	animation-name: ${shimmerKeyframe};
	animation-timing-function: ease-out;

	background-color: ${props => props.theme.color.bgPlaceholder};
	border-radius: .1rem;
`;

interface PlaceholderProps {
	/** Truthy/falsy value used to determine if the placeholder should show. */
	show: any,
	children?: () => any
}

interface TextPlaceholderProps extends PlaceholderProps {
	length: number
}

export const TextPlaceholder: StyledFC<TextPlaceholderProps> = (props) => {
	if (!props.show) {
		return <>{props.children ? props.children() : ""}</>;
	}
	const { children, ...otherProps } = props;

	let repeat: string = 'M'.repeat(otherProps.length);
	return <_Placeholder {...otherProps}>{repeat}</_Placeholder>
}

const _BoxPlaceholder = styled(_Placeholder) <BoxPlaceholderProps>`
	width: "${p => p.width}px";
	height: "${p => p.height}px";
`;

export interface BoxPlaceholderProps extends PlaceholderProps {
	width: number,
	height: number
}

export const BoxPlaceholder: StyledFC<BoxPlaceholderProps> = (props) => {
	if (!props.show) {
		return <>{props.children ? props.children() : ""}</>;
	}
	const { children, ...otherProps } = props;
	return <_BoxPlaceholder {...otherProps} />
}