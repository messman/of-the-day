import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { LabelValue, DynamicMargin } from '@/core/layout/common';
import { largerSpacing, smallerSpacing } from '@/core/style/common';
import { useCurrentTheme } from '@/core/style/theme';
import { iconTypes, Icon } from '@/core/symbol/icon';
import { Text, textHeight } from '@/core/symbol/text';
import { styled } from '@/core/style/styled';

export interface ChecklistProps {
	other: IOther;
}

export const Checklist: React.FC<ChecklistProps> = (props) => {
	const { other } = props;
	const { checklistDone, checklistToDo } = other;

	const safeChecklistDone = checklistDone || [];
	const safeChecklistToDo = checklistToDo || [];
	if (!safeChecklistDone.length && !safeChecklistToDo.length) {
		return null;
	}

	const { horizontal, vertical } = largerSpacing;

	return (
		<DynamicMargin margin={horizontal}>
			<LabelValue margin={vertical} label='Recent to-do items'>
				<InnerChecklist isDone={true} items={safeChecklistDone} />
				<InnerChecklist isDone={false} items={safeChecklistToDo} />
			</LabelValue>
		</DynamicMargin>
	);
};

interface InnerChecklistProps {
	items: string[],
	isDone: boolean;
}

const InnerChecklist: React.FC<InnerChecklistProps> = (props) => {
	const theme = useCurrentTheme();

	const items = props.items.map((item) => {
		const color = props.isDone ? theme.color.success : theme.color.backgroundC;
		const iconType = props.isDone ? iconTypes.todoComplete : iconTypes.todoIncomplete;

		return (
			<Text key={item}>
				<DynamicMargin isInline={true} margin={smallerSpacing.right}>
					<Icon type={iconType} fillColor={color} height={textHeight} />
				</DynamicMargin>
				{item}
			</Text>
		);
	});

	return (
		<List>
			{items}
		</List>
	);
};

const List = styled.div`
	margin-bottom: ${smallerSpacing.value};
	margin-top: 0;
`;