import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { OutLink } from '@/core/link';
import { RegularText } from '@/core/symbol/text';
import { Card, CardPadding } from '@/core/card/card';
import { iconTypes, SVGIconType } from '@/core/symbol/icon';
import { CardGroup } from '@/core/card/card-group';
import { EqualCardFlow } from '@/core/card/card-flow';

export interface PlansProps {
	other: IOther;
}

export const Plans: React.FC<PlansProps> = (props) => {
	const { other } = props;

	return (
		<CardGroup title='Plans' isAutoAlternateBackground={true}>
			<EqualCardFlow>
				<WorkingOn other={other} />
				<LookingForward other={other} />
			</EqualCardFlow>
		</CardGroup>
	);
};

export interface LookingForwardProps {
	other: IOther;
}

const lookingForwardTitle = `What's Ahead`;

export const LookingForward: React.FC<LookingForwardProps> = (props) => {
	const { other } = props;
	const { lookingForward } = other;
	if (!lookingForward || !lookingForward.text) {
		return null;
	}
	const { text, link, linkText } = lookingForward;

	return (
		<LinkTextCard title={lookingForwardTitle} text={text} link={link} linkText={linkText} icon={iconTypes.calendar} />
	);
};

export interface WorkingOnProps {
	other: IOther;
}

const workingOnTitle = `What I'm Working On`;

export const WorkingOn: React.FC<WorkingOnProps> = (props) => {
	const { other } = props;
	const { workingOn } = other;
	if (!workingOn || !workingOn.text) {
		return null;
	}
	const { text, link, linkText } = workingOn;

	return (
		<LinkTextCard title={workingOnTitle} text={text} link={link} linkText={linkText} icon={iconTypes.project} />
	);
};

interface LinkTextCardProps {
	title: string;
	text: string;
	link: string;
	linkText: string;
	icon: SVGIconType;
}

const LinkTextCard: React.FC<LinkTextCardProps> = (props) => {
	const { title, text, link, linkText, icon } = props;
	if (!text) {
		return null;
	}

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
		<Card title={title} icon={icon}>
			<CardPadding>
				<RegularText>{render}</RegularText>
			</CardPadding>
		</Card>
	);
};
