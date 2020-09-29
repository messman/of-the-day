import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { OutLink } from '@/core/link';
import { RegularText } from '@/core/symbol/text';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';

export interface WorkingOnProps {
	other: IOther;
}

const title = `What I'm Working On`;

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
		<Card title={title} icon={iconTypes.screen}>
			<RegularText>{render}</RegularText>
		</Card>
	);
};
