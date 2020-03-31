import * as React from "react";
import styled from "@/styles/theme";

export interface TabLinkProps {
	url: string,
	title: string
}

const _TabLink = styled.a`
	font-size: 1.2rem;
	margin: 0;
	margin-top: .3rem;

	display: inline-block;

	color: ${p => p.theme.color.link};
	text-decoration: none;

	&:visited, &:active, &:link, &:hover {
		color: ${p => p.theme.color.link};
		text-decoration: none;
	}
`;

export const TabLink: React.FC<TabLinkProps> = (props) => {
	if (!props.url) {
		return null;
	}

	return (
		<div>
			<_TabLink href={props.url} rel="noreferrer noopener" target="_blank" title="Opens in a new tab">{props.title} &rsaquo;</_TabLink>
		</div>
	);
}
