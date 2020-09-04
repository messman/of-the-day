import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { LabelValue, DynamicMargin } from '@/core/layout/common';
import { spacing } from '@/core/style/common';
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

	const { horizontal, vertical } = spacing.medium;

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
	const { items, isDone } = props;


	const itemsRender = items.map((item) => {
		const iconType = isDone ? iconTypes.todoComplete : iconTypes.todoIncomplete;

		return (
			<Text key={item}>
				<DynamicMargin isInline={true} margin={spacing.small.right}>
					<Icon type={iconType} fillColor={c => isDone ? c.success : c.backgroundC} height={textHeight} />
				</DynamicMargin>
				{item}
			</Text>
		);
	});

	return (
		<List>
			{itemsRender}
		</List>
	);
};

const List = styled.div`
	margin-bottom: ${spacing.small.value};
	margin-top: 0;
`;