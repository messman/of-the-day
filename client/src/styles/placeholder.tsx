import styled, { css, keyframes, StyledFC } from "./theme";
import * as React from "react";

const shimmerKeyframe = keyframes`
	0% {
		opacity: .1;
	}
	100% {
		opacity: .4;
    }
`;

export interface PlaceholderProps {
	show: boolean,
	length: number
}

export interface TextPlaceholderProps extends PlaceholderProps {
	children?: () => any
}

const Placeholder = styled.span<PlaceholderProps>`
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

export const TextPlaceholder: StyledFC<TextPlaceholderProps> = (props) => {
	if (!props.show) {
		return <>{props.children ? props.children() : ""}</>;
	}
	const { children, className, ...otherProps } = props;

	let repeat: string = 'M'.repeat(otherProps.length);
	return <Placeholder className={className} {...otherProps}>{repeat}</Placeholder>
}