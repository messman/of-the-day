import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FlexRow, useWindowLayout } from '@messman/react-common';
import * as React from 'react';
import { ApplicationMaxWidth, Spacing, spacing } from '../layout/common';
import { tStyled } from '../style/styled';
import { CardContainer } from './card';

export function findNumberOfChildren(children: React.ReactNode): number {
	return React.Children.toArray(children).filter((child) => {
		console.log(child, React.isValidElement(child));
		return !!child;
	}).length;
}

export function useCardFlowSpacing(numberOfChildren?: number): [boolean, Spacing] {

	numberOfChildren = numberOfChildren || 0;

	console.log({ numberOfChildren });

	const { widthBreakpoint } = useWindowLayout();

	/*
		Logic below is based on layout breakpoints and trying to keep the math
		such that the cards inside will get a reasonable amount of space (larger
		than the minimum mobile width, at least)

	*/
	let isRow: boolean = null!;
	let spacingBetween: Spacing = null!;
	if (widthBreakpoint <= LayoutBreakpoint.mobileLarge) {
		// Mobile - always column.
		isRow = false;
		spacingBetween = spacing.medium;
	}
	else if (widthBreakpoint <= LayoutBreakpoint.tablet) {
		isRow = false;
		spacingBetween = spacing.large;
	}
	else if (widthBreakpoint <= LayoutBreakpoint.desktop) {
		isRow = numberOfChildren <= 2;
		spacingBetween = spacing.large;
	}
	else if (widthBreakpoint <= LayoutBreakpoint.wide) {
		isRow = numberOfChildren <= 3;
		spacingBetween = spacing.large;
	}
	else if (widthBreakpoint <= LayoutBreakpoint.max) {
		isRow = true;
		spacingBetween = spacing.large;
	}

	// If only one child, it's not really a row.
	if (numberOfChildren <= 1) {
		isRow = false;
	}

	return [isRow, spacingBetween];
}

export interface CardFlowProps {
	explicitNumberOfChildren?: number;
	useAutoVerticalMargin?: boolean;
}

export const CardFlow: React.FC<CardFlowProps> = (props) => {
	const { explicitNumberOfChildren, useAutoVerticalMargin, children } = props;

	const numberOfChildren = explicitNumberOfChildren || findNumberOfChildren(children);
	const [isRow, spacingBetween] = useCardFlowSpacing(numberOfChildren);

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