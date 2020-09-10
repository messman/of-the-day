import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { spacing } from '@/core/layout/common';
import { TagList } from './tag';
import { ElementRoot } from '../post';
import { FlexRow } from '@messman/react-common';
import { tStyled } from '@/core/style/styled';
import { useIsCompactWidth } from '@/services/layout/window-layout';
import { Subtitle, RegularText } from '@/core/symbol/text';

export interface BasicsProps {
	post: IPost;
}

export const Basics: React.FC<BasicsProps> = (props) => {
	const isCompactWidth = useIsCompactWidth();
	if (isCompactWidth) {
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
			<TextContainer>
				<Subtitle isBold={true} margin={titleMargin}>Notes</Subtitle>
				<Subtitle show={event} margin={textMargin} color={c => c.text}>{event}</Subtitle>
				<RegularText show={note} margin={textMargin}>{note}</RegularText>
			</TextContainer>
		);
	}

	let centerRender: JSX.Element | null = null;
	if (schedule || (dayTypes && dayTypes.length)) {
		centerRender = (
			<TextContainer>
				<Subtitle isBold={true} margin={titleMargin}>Schedule</Subtitle>
				<RegularText show={schedule} margin={textMargin}>{schedule}</RegularText>
				<TagList margin={textMargin} tags={dayTypes} />
			</TextContainer>
		);
	}

	let rightRender: JSX.Element | null = null;
	if (location) {
		rightRender = (
			<TextContainer>
				<Subtitle isBold={true} margin={titleMargin}>Location</Subtitle>
				<Subtitle color={c => c.text}>{location}</Subtitle>
			</TextContainer>
		);
	}

	const renders = [leftRender, centerRender, rightRender].filter(r => !!r).map((render, i) => {
		if (i !== 0) {
			return (
				<>
					<VerticalSeparator />
					{render}
				</>
			);
		}
		return render;
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