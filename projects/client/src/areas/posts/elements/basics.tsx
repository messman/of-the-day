import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Value } from '@/core/layout/common';
import { spacing } from '@/core/style/common';
import { TagList } from './tag';
import { ElementRoot } from '../post';
import { FlexRow } from '@messman/react-common';
import { styled } from '@/core/style/styled';
import { useIsCompactWidth } from '@/services/layout/window-layout';
import { Subtitle, Text } from '@/core/symbol/text';

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

	const titleMargin = spacing.large.bottom;

	const textMargin = spacing.medium.vertical;

	let leftRender: JSX.Element | null = null;
	if (event || note) {
		leftRender = (
			<TextContainer>
				<Subtitle isBold={true} margin={titleMargin}>Notes</Subtitle>
				<Value show={event} margin={textMargin}>
					<Subtitle dataColor={c => c.text}>{event}</Subtitle>
				</Value>
				<Value show={note} margin={textMargin}>
					<Text>{note}</Text>
				</Value>
			</TextContainer>
		);
	}

	let centerRender: JSX.Element | null = null;
	if (schedule || (dayTypes && dayTypes.length)) {
		centerRender = (
			<TextContainer>
				<Subtitle isBold={true} margin={titleMargin}>Schedule</Subtitle>
				<Value show={schedule} margin={textMargin}>
					<Text>{schedule}</Text>
				</Value>
				<Value margin={textMargin}>
					<TagList tags={dayTypes} />
				</Value>
			</TextContainer>
		);
	}

	let rightRender: JSX.Element | null = null;
	if (location) {
		rightRender = (
			<TextContainer>
				<Subtitle isBold={true} margin={titleMargin}>Location</Subtitle>
				<Value>
					<Subtitle dataColor={c => c.text}>{location}</Subtitle>
				</Value>
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

const VerticalSeparator = styled.div`
	width: 2px;
	background-color: ${p => p.theme.color.backgroundC};
`;

const TextContainer = styled.div`
	flex: 1;
	margin: ${spacing.medium.value};
	text-align: center;
`;