import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { spacing } from '@/core/layout/common';
import { TagList } from './tag';
import { ElementRoot } from '../post';
import { FlexRow } from '@messman/react-common';
import { tStyled } from '@/core/style/styled';
import { useIsMobileWidth } from '@/services/layout/window-layout';
import { Subtitle, RegularText } from '@/core/symbol/text';

export interface BasicsProps {
	post: IPost;
}

export const Basics: React.FC<BasicsProps> = (props) => {
	const isMobileWidth = useIsMobileWidth();
	if (isMobileWidth) {
		return null;
	}
	return <RegularBasics {...props} />;
};

const RegularBasics: React.FC<BasicsProps> = (props) => {
	const { post } = props;
	const { basics } = post;
	const { event, note, location, schedule, dayTypes } = basics;

	const titleMargin = spacing.medium.bottom;

	const textMargin = spacing.medium.vertical;

	let leftRender: JSX.Element | null = null;
	if (event || note) {
		leftRender = (
			<TextContainer key='notes'>
				<Subtitle margin={titleMargin}>Notes</Subtitle>
				<Subtitle isBold={false} show={event} margin={textMargin} color={c => c.text}>{event}</Subtitle>
				<RegularText show={note} margin={textMargin}>{note}</RegularText>
			</TextContainer>
		);
	}

	let centerRender: JSX.Element | null = null;
	if (schedule || (dayTypes && dayTypes.length)) {
		centerRender = (
			<TextContainer key='schedule'>
				<Subtitle margin={titleMargin}>Schedule</Subtitle>
				<RegularText show={schedule} margin={textMargin}>{schedule}</RegularText>
				<TagList margin={textMargin} tags={dayTypes} />
			</TextContainer>
		);
	}

	let rightRender: JSX.Element | null = null;
	if (location) {
		rightRender = (
			<TextContainer key='location'>
				<Subtitle isBold={true} margin={titleMargin}>Location</Subtitle>
				<Subtitle isBold={false} color={c => c.text}>{location}</Subtitle>
			</TextContainer>
		);
	}

	const renders: JSX.Element[] = [];
	[leftRender, centerRender, rightRender].filter(r => !!r).forEach((render, i) => {
		if (i !== 0) {
			renders.push(<VerticalSeparator key={i} />);
		}
		renders.push(render!);
	});

	return (
		<ElementRoot margin={spacing.large.vertical}>
			<FlexRow>
				{renders}
			</FlexRow>
		</ElementRoot>
	);
};

const VerticalSeparator = tStyled.div`
	width: 2px;
	background-color: ${p => p.theme.color.backgroundC};
`;

const TextContainer = tStyled.div`
	flex: 1;
	margin: ${spacing.large.value};
	text-align: center;
`;