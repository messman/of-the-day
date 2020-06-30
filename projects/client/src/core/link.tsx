// Handles links.
import * as React from 'react';
import { styled } from '@/core/style/styled';

const BasicLink = styled.a`
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
	return <BasicLink href={href} rel="noreferrer noopener" target="_blank" title="Opens in a new tab" {...otherProps}>{text} &rsaquo;</BasicLink>;
};


/** Executes a click action. */
export const ActionLink: React.FC<LinkProps> = (props) => {
	const { children, onClick, ...otherProps } = props;
	const text = children as string;

	function onLinkClicked(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): boolean {
		props.onClick!(e);
		return false;
	}

	return (
		<BasicLink title={text} onClick={onLinkClicked} {...otherProps}>{text}</BasicLink>
	);
};
