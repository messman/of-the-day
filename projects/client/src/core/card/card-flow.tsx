import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FlexRow, useWindowLayout } from '@messman/react-common';
import * as React from 'react';
import { ApplicationMaxWidth, useResponsiveEdgeSpacing } from '../layout/common';
import { tStyled } from '../style/styled';
import { CardContainer } from './card';

export function findNumberOfChildren(children: React.ReactNode): number {
	return React.Children.toArray(children).filter((child) => {
		return !!child;
	}).length;
}

function useIsRow(numberOfChildren?: number): boolean {

	numberOfChildren = numberOfChildren || 0;
	const { widthBreakpoint } = useWindowLayout();

	if (numberOfChildren <= 1) {
		return false;
	}

	/*
		Logic below is based on layout breakpoints and trying to keep the math
		such that the cards inside will get a reasonable amount of space (larger
		than the minimum mobile width, at least)
	*/
	let isRow: boolean = null!;
	if (widthBreakpoint <= LayoutBreakpoint.mobileLarge) {
		// Mobile - always column.
		isRow = false;
	}
	else if (widthBreakpoint <= LayoutBreakpoint.tablet) {
		isRow = false;
	}
	else if (widthBreakpoint <= LayoutBreakpoint.desktop) {
		isRow = numberOfChildren <= 2;
	}
	else if (widthBreakpoint <= LayoutBreakpoint.wide) {
		isRow = numberOfChildren <= 3;
	}
	else if (widthBreakpoint <= LayoutBreakpoint.max) {
		isRow = true;
	}
	return isRow;
}

export interface CardFlowProps {
	useAutoVerticalMargin?: boolean;
}

export const CardFlow: React.FC<CardFlowProps> = (props) => {
	const { useAutoVerticalMargin, children } = props;

	const numberOfChildren = findNumberOfChildren(children);
	const isRow = useIsRow(numberOfChildren);
	const spacingBetween = useResponsiveEdgeSpacing();

	const FlowElement = isRow ? Row : Column;

	return (
		<ApplicationMaxWidth>
			<FlowElement $spacing={spacingBetween.value} $useVerticalMargin={useAutoVerticalMargin || false}>
				{children}
			</FlowElement>
		</ApplicationMaxWidth>
	);
};

interface RowColumnProps {
	$spacing: string;
	$useVerticalMargin: boolean;
}

const Column = tStyled.div<RowColumnProps>`
	margin: ${p => p.$useVerticalMargin ? p.$spacing : 0} ${p => p.$spacing};

	${CardContainer} + ${CardContainer} {
		margin-top: ${p => p.$spacing};
	}
`;

const Row = tStyled(FlexRow) <RowColumnProps>`
	margin: ${p => p.$useVerticalMargin ? p.$spacing : 0} ${p => p.$spacing};

	${CardContainer} {
		margin-left: ${p => p.$spacing}; 
	}

	${CardContainer}:first-child {
		margin-left: 0;
	}
`;