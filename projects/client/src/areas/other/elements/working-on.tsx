import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { RegularText, Subtitle } from '@/core/symbol/text';

export interface WorkingOnProps {
	other: IOther;
}

export const WorkingOn: React.FC<WorkingOnProps> = (props) => {
	const { other } = props;
	const { workingOn } = other;
	if (!workingOn || !workingOn.text) {
		return null;
	}
	const { text, link, linkText } = workingOn;

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
			<Subtitle>What I'm working on</Subtitle>
			<RegularText>{render}</RegularText>
		</Spacing>
	);
};
