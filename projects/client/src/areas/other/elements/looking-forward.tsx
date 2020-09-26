import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { OutLink } from '@/core/link';
import { RegularText, Heading2 } from '@/core/symbol/text';
import { spacing, Spacing } from '@/core/layout/common';

export interface LookingForwardProps {
	other: IOther;
}

export const LookingForward: React.FC<LookingForwardProps> = (props) => {
	const { other } = props;
	const { lookingForward } = other;
	if (!lookingForward || !lookingForward.text) {
		return null;
	}
	const { text, link, linkText } = lookingForward;

	let linkRender: JSX.Element | null = null;
	let render: JSX.Element = null!;

	if (link) {
		linkRender = <OutLink href={link}>{linkText}</OutLink>;
	}

	if (text && link) {
		render = <>{linkRender} - {text}</>;
	}
	else if (text) {
		render = <>{text}</>;
	}
	else {
		render = linkRender!;
	}

	return (
		<Spacing margin={spacing.medium.value}>
			<Heading2>
				What I'm looking forward to
			</Heading2>
			<RegularText>{render}</RegularText>
		</Spacing>
	);
};
