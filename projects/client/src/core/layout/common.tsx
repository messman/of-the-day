import * as React from 'react';
import { styled } from '../style/styled';
import { FlexColumn, FlexRow } from './flex';
import { LayoutBreakpoint } from '@/services/layout/layout-info';
import { Text } from '../symbol/text';

/** A flex column whose width is the screen width, not the width decided by flex rules. */
export const ScreenWidthFlexColumn = styled(FlexColumn)`
	width: 100vw;
	max-width: ${LayoutBreakpoint.regular}px;
`;

/** A flex column whose width is the Regular Layout Breakpoint Size. */
export const RegularWidthFlexColumn = styled(FlexColumn)`
	width: ${LayoutBreakpoint.regular}px;
`;

/** A Flex Row that has overflow: auto, so it scrolls if its width is greater than its parent. */
export const OverflowAutoFlexRow = styled(FlexRow)`
	overflow: auto;
`;

export interface ValueProps {
	value: string | number | null;
	margin: string | null;
}

export const Value: React.FC<ValueProps> = (props) => {
	const { value, margin } = props;

	if (!value) {
		return null;
	}

	return (
		<DynamicMargin margin={margin || '0'}>
			<Text>{value}</Text>
		</DynamicMargin>
	);
};

export interface LabelValueProps extends ValueProps {
	label: string | number | null;
}

export const LabelValue: React.FC<LabelValueProps> = (props) => {
	const { label, value, margin } = props;

	if (!label || !value) {
		return null;
	}

	return (
		<DynamicMargin margin={margin || '0'}>
			<Text isBold={true}>{label}</Text>
			<DynamicMargin margin='3px 0 0 0'>
				<Text>{value}</Text>
			</DynamicMargin>
		</DynamicMargin>
	);
};

interface DynamicMarginProps {
	margin: string;
}

const DynamicMargin = styled.div<DynamicMarginProps>`
	margin: ${p => p.margin};
`;