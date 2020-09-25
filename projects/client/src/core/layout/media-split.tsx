import * as React from 'react';
import { tStyled } from '../style/styled';
import { FlexRow, useWindowLayout, FlexColumn } from '@messman/react-common';
import { VerticalDivider, spacing, Spacing } from './common';
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
	width: ${splitMediaBreakpoint};
`;

export const MediaSplit: React.FC<MediaSplitProps> = (props) => {
	const { isLeft, titleRender, mediaRender, splitRender, children } = props;

	const { widthBreakpoint } = useWindowLayout();
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

	if (widthBreakpoint <= LayoutBreakpoint.mobileLarge) {
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
	else if (widthBreakpoint <= LayoutBreakpoint.tablet) {
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
					<VerticalDivider dataSpacing={spacing.medium.value} />
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

	const largeDividerWidth = widthBreakpoint >= LayoutBreakpoint.wide ? spacing.grand.value : spacing.large.value;

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
				<VerticalDivider dataSpacing={largeDividerWidth} />
				<OrderedFlexColumn isFirst={!isLeft} justifyContent='center' flex='0 1 100%'>
					{mediaRender}
				</OrderedFlexColumn>
			</FlexRow>
		</>
	);
};

interface OrderedFlexColumnProps {
	isFirst: boolean;
}

const OrderedFlexColumn = tStyled(FlexColumn) <OrderedFlexColumnProps>`
	order: ${p => p.isFirst ? -1 : 2};
`;