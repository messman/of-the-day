import * as React from 'react';
import { styled } from '@/core/style/styled';
import { SharedDayRecord } from 'oftheday-shared';
import { Subtitle, subtitleHeight } from '@/core/symbol/text';
import { spacingBValue } from '@/core/style/common';
import { FlexRow } from '@/core/layout/flex';
import { iconTypes, Icon } from '@/core/symbol/icon';
import { useCurrentTheme } from '@/core/style/theme';

export interface DayTitleProps {
	day: SharedDayRecord;
	isCollapsed: boolean;
	onCollapseChange: () => void;
}

export const DayTitle: React.FC<DayTitleProps> = (props) => {
	const { day, isCollapsed, onCollapseChange } = props;
	const theme = useCurrentTheme();

	return (
		<Margin justifyContent='space-between'>
			<div>
				<Subtitle isInline={true} isBold={true}>{day.dayAsText}</Subtitle>
				<Subtitle isInline={true}>&nbsp;&nbsp;&middot;&nbsp;&nbsp;Day {day.dayNumber}</Subtitle>
			</div>
			<Subtitle isInline={true}>
				<CollapseRotation isCollapsed={isCollapsed} onClick={onCollapseChange}>
					<Icon type={iconTypes.collapse} fill={theme.color.textAndIcon} height={subtitleHeight} />
				</CollapseRotation>
			</Subtitle>
		</Margin>
	);
};

const Margin = styled(FlexRow)`
	margin: ${spacingBValue};
`;

export interface CollapseRotationProps {
	isCollapsed: boolean;
}

const CollapseRotation = styled.button<CollapseRotationProps>`
	cursor: pointer;
	border: none;
	background: transparent;
	transform: ${p => p.isCollapsed ? 'none' : 'rotateZ(-90deg)'};
`;