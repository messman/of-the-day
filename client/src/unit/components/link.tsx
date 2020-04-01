import * as React from "react";
import styled from "@/styles/theme";

export interface LinkProps {
	title: string
}


const _Link = styled.a`
	font-size: 1.2rem;
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

	// Wrap in a div, but keep the link itself as display: inline-block to make sure it's not accidentally clicked. 
	return (
		<div>
			<_Link href={props.url} rel="noreferrer noopener" target="_blank" title="Opens in a new tab">{props.title} &rsaquo;</_Link>
		</div>
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

	// Wrap in a div, but keep the link itself as display: inline-block to make sure it's not accidentally clicked. 
	return (
		<div>
			<_Link title={props.title} onClick={onLinkClicked}>{props.title}</_Link>
		</div>
	);
}
