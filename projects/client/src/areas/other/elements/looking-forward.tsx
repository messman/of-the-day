import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { OutLink } from '@/core/link';
import { RegularText } from '@/core/symbol/text';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';

export interface LookingForwardProps {
	other: IOther;
}

const title = `What's Ahead`;

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
		<Card title={title} icon={iconTypes.calendar}>
			<RegularText>{render}</RegularText>
		</Card>
	);
};
