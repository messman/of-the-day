import * as React from 'react';
import { styled } from '../style/styled';
import { Text } from '../symbol/text';
import { DefaultLayoutBreakpoint, FlexColumn, FlexRow } from '@messman/react-common';

/** A flex column whose width is the screen width, not the width decided by flex rules. */
export const ScreenWidthFlexColumn = styled(FlexColumn)`
	width: 100vw;
	max-width: ${DefaultLayoutBreakpoint.regular}px;
`;

/** A flex column whose width is the Regular Layout Breakpoint Size. */
export const RegularWidthFlexColumn = styled(FlexColumn)`
	width: ${DefaultLayoutBreakpoint.regular}px;
`;

/** A Flex Row that has overflow: auto, so it scrolls if its width is greater than its parent. */
export const OverflowAutoFlexRow = styled(FlexRow)`
	overflow: auto;
`;

export const postValueMargin = '1rem';

export interface ValueProps {
	show?: any;
	margin: string | null;
}

export const Value: React.FC<ValueProps> = (props) => {
	const { children, show, margin } = props;

	if (!children || (show !== undefined && !show)) {
		return null;
	}

	return (
		<DynamicMargin margin={margin || '0'}>
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
		<DynamicMargin margin={margin || '0'}>
			<Text isBold={true}>{label}</Text>
			<Value margin='3px 0 0 0'>
				{children}
			</Value>
		</DynamicMargin>
	);
};

interface DynamicMarginProps {
	margin: string;
}

const DynamicMargin = styled.div<DynamicMarginProps>`
	margin: ${p => p.margin};
`;