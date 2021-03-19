import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FlexRow, useWindowMediaLayout } from '@messman/react-common';
import * as React from 'react';
import { ApplicationMaxWidth, useResponsiveEdgeSpacing } from '../layout/common';
import { tStyled } from '../style/styled';
import { CardContainer } from './card';

export function findNumberOfChildren(children: React.ReactNode): number {
	return React.Children.toArray(children).filter((child) => {
		return !!child;
	}).length;
}

export function useMaximumRowChildren(): number {
	const { widthBreakpoint } = useWindowMediaLayout();
	/*
		Logic below is based on layout breakpoints and trying to keep the math
		such that the cards inside will get a reasonable amount of space (larger
		than the minimum mobile width, at least)
	*/
	if (widthBreakpoint <= LayoutBreakpoint.tablet) {
		return 1;
	}
	else if (widthBreakpoint <= LayoutBreakpoint.desktop) {
		return 2;
	}
	// Else	
	return 3;
}

export interface EqualCardFlowProps {
}

/**
 * Card Flow strategy where having more children to render than is supported will result in each child 
 * using its own row.
 */
export const EqualCardFlow: React.FC<EqualCardFlowProps> = (props) => {
	const { children } = props;

	const maximumRowChildren = useMaximumRowChildren();
	const numberOfChildren = findNumberOfChildren(children);
	const useFlexRow = numberOfChildren > 1 && numberOfChildren <= maximumRowChildren;
	const spacingBetween = useResponsiveEdgeSpacing();

	const FlowElement = useFlexRow ? RowCardFlow : ColumnCardFlow;

	return (
		<ApplicationMaxWidth>
			<FlowElement $spacing={spacingBetween.value}>
				{children}
			</FlowElement>
		</ApplicationMaxWidth>
	);
};

export interface RowColumnCardFlowProps {
	$spacing: string;
}

/** Adds spacing between cards, in a column flow. */
export const ColumnCardFlow = tStyled.div<RowColumnCardFlowProps>`
	margin: 0 ${p => p.$spacing};

	${CardContainer} + ${CardContainer} {
		margin-top: ${p => p.$spacing};
	}
`;

/** Adds spacing between cards, in a row flow. */
export const RowCardFlow = tStyled(FlexRow) <RowColumnCardFlowProps>`
	margin: 0 ${p => p.$spacing};

	${CardContainer} {
		margin-left: ${p => p.$spacing}; 
	}

	${CardContainer}:first-child {
		margin-left: 0;
	}
`;