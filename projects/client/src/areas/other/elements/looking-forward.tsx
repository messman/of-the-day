import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { LabelValue } from '@/core/layout/common';
import { largerSpacing } from '@/core/style/common';
import { OutLink } from '@/core/link';
import { Text } from '@/core/symbol/text';

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
		<LabelValue margin={largerSpacing.value} label='What I am looking forward to'>
			<Text>{render}</Text>
		</LabelValue>
	);
};
