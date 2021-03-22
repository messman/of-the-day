// Handles links.
import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { iconTypes, SizedIcon } from './symbol/icon';
import { FontWeight } from './style/theme';

const BasicLink = tStyled.a`
	font-weight: ${FontWeight.medium}

	margin: 0;
	display: inline-block;
	cursor: pointer;

	color: ${p => p.theme.textLink};
	text-decoration: none;

	&:visited, &:active, &:link, &:hover {
		color: ${p => p.theme.textLink};
		text-decoration: none;
	}
`;

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { }

export const OutLink: React.FC<LinkProps> = (props) => {
	const { children, href, rel, target, title, ...otherProps } = props;
	if (!href) {
		return null;
	}
	const text = (props.children as string) || href;
	return (
		<BasicLink href={href} rel="noreferrer noopener" target="_blank" title="Opens in a new tab" {...otherProps}>
			{text}
			<SizedIcon type={iconTypes.out} size='.7rem' />
		</BasicLink>
	);
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
