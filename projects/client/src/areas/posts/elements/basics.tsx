import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { spacing } from '@/core/layout/common';
import { TagList } from './tag';
import { ElementRoot } from '../post';
import { FlexRow, useWindowLayout, Flex, FlexColumn } from '@messman/react-common';
import { tStyled } from '@/core/style/styled';
import { Subtitle, RegularText } from '@/core/symbol/text';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { separatorThickness } from '@/core/style/common';
import { fontWeights } from '@/core/style/theme';

export interface BasicsProps {
	post: IPost;
}

export const Basics: React.FC<BasicsProps> = (props) => {
	const { post } = props;
	const { basics } = post;
	const { event, note, location, schedule, dayTypes } = basics;

	const windowLayout = useWindowLayout();
	const isAnyMobileWidth = windowLayout.widthBreakpoint <= LayoutBreakpoint.mobileLarge;
	const flex = isAnyMobileWidth ? 'none' : 1;

	const titleMargin = spacing.medium.bottom;
	const textMargin = spacing.medium.vertical;

	let leftRender: JSX.Element | null = null;
	if (event || note) {
		leftRender = (
			<TextContainer key='notes' flex={flex}>
				<Subtitle margin={titleMargin}>Notes</Subtitle>
				<RegularText fontWeight={fontWeights.bold} show={event} margin={textMargin} color={c => c.textDistinct}>{event}</RegularText>
				<RegularText show={note} margin={textMargin}>{note}</RegularText>
			</TextContainer>
		);
	}

	let centerRender: JSX.Element | null = null;
	if (schedule || (dayTypes && dayTypes.length)) {
		centerRender = (
			<TextContainer key='schedule' flex={flex}>
				<Subtitle margin={titleMargin}>Schedule</Subtitle>
				<RegularText show={schedule} margin={textMargin}>{schedule}</RegularText>
				<TagList margin={textMargin} tags={dayTypes} />
			</TextContainer>
		);
	}

	let rightRender: JSX.Element | null = null;
	if (location) {
		rightRender = (
			<TextContainer key='location' flex={flex}>
				<Subtitle margin={titleMargin}>Location</Subtitle>
				<RegularText fontWeight={fontWeights.bold} color={c => c.textDistinct}>{location}</RegularText>
			</TextContainer>
		);
	}

	// TODO - this is here just to add separators, though right now they are transparent. 
	// If we decide we like it that way, clean up this code.
	const renders: JSX.Element[] = [];
	[leftRender, centerRender, rightRender].filter(r => !!r).forEach((render, i) => {
		if (i !== 0) {
			const Separator = isAnyMobileWidth ? HorizontalSeparator : VerticalSeparator;
			renders.push(<Separator key={i} />);
		}
		renders.push(render!);
	});

	const ListWrapper = isAnyMobileWidth ? FlexColumn : FlexRow;
	const margin = isAnyMobileWidth ? `${spacing.large.value} ${spacing.grand.value}` : undefined;

	return (
		<ElementRoot margin={margin}>
			<ListWrapper>
				{renders}
			</ListWrapper>
		</ElementRoot>
	);
};

const VerticalSeparator = tStyled.div`
	width: ${separatorThickness};
`;

const HorizontalSeparator = tStyled.div`
	height: ${separatorThickness};
`;

const TextContainer = tStyled(Flex)`
	margin: ${spacing.large.value};
	text-align: center;
`;