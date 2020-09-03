// Handles links.
import * as React from 'react';
import { styled } from '@/core/style/styled';
import { iconTypes, Icon } from './symbol/icon';
import { useCurrentTheme } from './style/theme';

const BasicLink = styled.a`
	margin: 0;

	position: relative;
	display: inline-block;
	cursor: pointer;

	color: ${p => p.theme.color.textLink};
	text-decoration: none;

	&:visited, &:active, &:link, &:hover {
		color: ${p => p.theme.color.textLink};
		text-decoration: none;
	}
`;

const Underline = styled.span`
	text-decoration: underline;
`;


export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { }

export const OutLink: React.FC<LinkProps> = (props) => {
	const { children, href, rel, target, title, ...otherProps } = props;
	const theme = useCurrentTheme();
	if (!href) {
		return null;
	}
	const text = (props.children as string) || href;
	return (
		<BasicLink href={href} rel="noreferrer noopener" target="_blank" title="Opens in a new tab" {...otherProps}>
			<Underline>
				{text}
			</Underline>
			<Icon type={iconTypes.out} fillColor={theme.color.textLink} height='.7rem' />
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
