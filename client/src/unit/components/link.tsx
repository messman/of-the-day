import * as React from "react";
import styled from "@/styles/theme";

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

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { }

export const OutLink: React.FC<LinkProps> = (props) => {
	const { children, href, rel, target, title, ...otherProps } = props;
	if (!href) {
		return null;
	}
	const text = props.children as string;
	return <_Link href={href} rel="noreferrer noopener" target="_blank" title="Opens in a new tab" {...otherProps}>{text} &rsaquo;</_Link>;
}


/** Executes a click action. */
export const ActionLink: React.FC<LinkProps> = (props) => {
	const { children, onClick, ...otherProps } = props;
	const text = children as string;

	function onLinkClicked(e): boolean {
		props.onClick(e);
		return false;
	}

	return (
		<_Link title={text} onClick={onLinkClicked} {...otherProps}>{text}</_Link>
	);
}
