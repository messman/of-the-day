import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { LabelValue } from '@/core/layout/common';
import { spacing } from '@/core/style/common';
import { OutLink } from '@/core/link';
import { Text } from '@/core/symbol/text';

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
		<LabelValue margin={spacing.medium.value} label='What I am working on'>
			<Text>{render}</Text>
		</LabelValue>
	);
};
