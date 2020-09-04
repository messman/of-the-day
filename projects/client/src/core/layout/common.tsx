import * as React from 'react';
import { styled } from '../style/styled';
import { Text } from '../symbol/text';
import { DefaultLayoutBreakpoint, FlexColumn, FlexRow } from '@messman/react-common';
import { spacing } from '../style/common';

/** A flex column whose width is the screen width, not the width decided by flex rules. */
export const ScreenWidthFlexColumn = styled(FlexColumn)`
	width: 100vw;
	max-width: ${DefaultLayoutBreakpoint.regular}px;
`;

export const ApplicationMaxWidth = styled.div`
	max-width: ${DefaultLayoutBreakpoint.wide}px;
	margin-left: auto;
	margin-right: auto;
`;

/** A flex column whose width is the Regular Layout Breakpoint Size. */
export const RegularWidthFlexColumn = styled(FlexColumn)`
	width: ${DefaultLayoutBreakpoint.regular}px;
`;

/** A Flex Row that has overflow: auto, so it scrolls if its width is greater than its parent. */
export const OverflowAutoFlexRow = styled(FlexRow)`
	overflow: auto;
`;

export interface ValueProps {
	show?: any;
	margin?: string | null;
}

export const Value: React.FC<ValueProps> = (props) => {
	const { children, show, margin } = props;

	if (!children || (show !== undefined && !show)) {
		return null;
	}
	return (
		<DynamicMargin margin={margin}>
			{children}
		</DynamicMargin>
	);
};

export interface LabelValueProps extends ValueProps {
	label: string | number | null;
}

export const LabelValue: React.FC<LabelValueProps> = (props) => {
	const { label, children, show, margin } = props;

	if (!label || !children || (show !== undefined && !show)) {
		return null;
	}

	return (
		<DynamicMargin margin={margin}>
			<Text isBold={true}>{label}</Text>
			<Value margin={spacing.nudge.top}>
				{children}
			</Value>
		</DynamicMargin>
	);
};

export interface DynamicMarginProps {
	margin?: string | null;
	isInline?: boolean;
}

export const DynamicMargin = styled.div<DynamicMarginProps>`
	display: ${p => p.isInline ? 'inline-block' : 'block'};
	margin: ${p => p.margin || 0};
`;