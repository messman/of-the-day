import * as React from "react";
import styled from "@/styles/theme";

export interface LinkProps {
	title: string
}

const LineBreak = styled.span`
	display: block;
`;

const _Link = styled.a`
	font-size: 1rem;
	margin: 0;
	margin-top: .3rem;

	display: inline-block;
	cursor: pointer;

	color: ${p => p.theme.color.link};
	text-decoration: none;

	&:visited, &:active, &:link, &:hover {
		color: ${p => p.theme.color.link};
		text-decoration: none;
	}
`;

export interface OutLinkProps extends LinkProps {
	url: string,
}

/** Creates a link if the url exists. */
export const OutLink: React.FC<OutLinkProps> = (props) => {
	if (!props.url) {
		return null;
	}

	return (
		<LineBreak>
			<_Link href={props.url} rel="noreferrer noopener" target="_blank" title="Opens in a new tab">{props.title} &rsaquo;</_Link>
		</LineBreak>
	);
}

export interface ActionLinkProps extends LinkProps {
	onClick: () => void,
}

/** Executes a click action. */
export const ActionLink: React.FC<ActionLinkProps> = (props) => {

	function onLinkClicked(): boolean {
		props.onClick();
		return false;
	}

	return (
		<LineBreak>
			<_Link title={props.title} onClick={onLinkClicked}>{props.title}</_Link>
		</LineBreak>
	);
}
