import * as React from 'react';
import { tStyled } from '../style/styled';
import { FlexRow, useWindowLayout, FlexColumn } from '@messman/react-common';
import { spacing, Spacing } from './common';
import { TextAlign } from '../style/common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';

export interface MediaSplitProps {
	isLeft: boolean;
	titleRender: JSX.Element;
	splitRender?: JSX.Element | null;
	mediaRender: JSX.Element;
}

const splitMediaBreakpoint = '26rem';
const SplitWidth = tStyled.div`
	max-width: ${splitMediaBreakpoint};
	min-width: 10rem;
`;

export const MediaSplit: React.FC<MediaSplitProps> = (props) => {
	const { isLeft, titleRender, mediaRender, splitRender, children } = props;

	const windowLayout = useWindowLayout();
	const textAlign = 'left';

	const titleContentRender = (
		<TextAlign dataAlign={textAlign}>
			{titleRender}
		</TextAlign>
	);

	const mainContentRender = (
		<TextAlign dataAlign={textAlign}>
			{children}
		</TextAlign>
	);

	/*
		Mobile and larger: all renders in rows.
		Tablet: split non-media on a row, with media on row below
		Desktop and up: non-media on one side, media on another
	*/

	if (windowLayout.widthBreakpoint <= LayoutBreakpoint.mobileLarge) {
		// All mobile. Everything in rows.

		return (
			<>
				{titleContentRender}
				{mainContentRender}
				<Spacing margin={spacing.large.top}>
					{mediaRender}
				</Spacing>
				<Spacing show={splitRender} margin={spacing.large.top}>
					{splitRender}
				</Spacing>
			</>
		);
	}
	else if (windowLayout.widthBreakpoint <= LayoutBreakpoint.tablet) {
		// Tablet. Split the non-media content.

		if (!splitRender) {
			return (
				<>
					{titleContentRender}
					{mainContentRender}
					<Spacing margin={spacing.large.top}>
						{mediaRender}
					</Spacing>
				</>
			);
		}

		return (
			<>
				{titleContentRender}
				<FlexRow>
					<FlexColumn justifyContent='flex-start'>
						{mainContentRender}
					</FlexColumn>
					<Divider />
					<FlexColumn justifyContent='flex-end'>
						{splitRender}
					</FlexColumn>
				</FlexRow>
				<Spacing margin={spacing.large.top}>
					{mediaRender}
				</Spacing>
			</>
		);
	}

	return (
		<>
			<FlexRow>
				<OrderedFlexColumn isFirst={isLeft} justifyContent='flex-start' flex='none'>
					<SplitWidth>
						{titleContentRender}
						{mainContentRender}
						<Spacing show={splitRender} margin={spacing.large.top}>
							{splitRender}
						</Spacing>
					</SplitWidth>
				</OrderedFlexColumn>
				<VisibleDivider />
				<OrderedFlexColumn isFirst={!isLeft} justifyContent='center'>
					{mediaRender}
				</OrderedFlexColumn>
			</FlexRow>
		</>
	);
};

interface OrderedFlexColumnProps {
	isFirst: number;
}

const OrderedFlexColumn = tStyled(FlexColumn) <OrderedFlexColumnProps>`
	order: ${p => p.isFirst ? -1 : 2};
`;

const Divider = tStyled.div`
	margin: ${spacing.large.left};
`;

const VisibleDivider = tStyled.div`
	width: 2px;
	background-color: ${p => p.theme.color.backgroundC};
	margin-left: calc(${spacing.large.value} / 2);
	margin-right: calc(${spacing.large.value} / 2);
`;