import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FlexRow, useWindowLayout } from '@messman/react-common';
import * as React from 'react';
import { Spacing, spacing } from '../layout/common';
import { tStyled } from '../style/styled';
import { CardContainer } from './card';

export interface CardFlowProps {
}

export const CardFlow: React.FC<CardFlowProps> = (props) => {
	const { children } = props;

	const { widthBreakpoint } = useWindowLayout();
	const numberOfChildren = React.Children.count(children);

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

	if (!isRow) {
		return (
			<Column $spacing={spacingBetween.value}>
				{children}
			</Column>
		);
	}
	return (
		<Row $spacing={spacingBetween.value}>
			{children}
		</Row>
	);

};

interface ColumnProps {
	$spacing: string;
}

const Column = tStyled.div<ColumnProps>`
	margin: 0 ${p => p.$spacing};

	${CardContainer} + ${CardContainer} {
		margin-top: ${p => p.$spacing};
	}
`;

interface RowProps {
	$spacing: string;
}

const Row = tStyled(FlexRow) <RowProps>`
	margin: 0 ${p => p.$spacing};

	${CardContainer} {
		margin-left: ${p => p.$spacing}; 
	}

	${CardContainer}:first-child {
		margin-left: 0;
	}
`;