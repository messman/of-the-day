import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { Spacing, spacing } from '@/core/layout/common';
import { iconTypes, Icon } from '@/core/symbol/icon';
import { RegularText, FontSize } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';

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

	const { horizontal } = spacing.medium;

	return (
		<Spacing margin={horizontal}>
			<InnerChecklist isDone={true} items={safeChecklistDone} />
			<InnerChecklist isDone={false} items={safeChecklistToDo} />
		</Spacing>
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
			<RegularText key={item}>
				<Spacing isInline={true} margin={spacing.small.right}>
					<Icon type={iconType} fillColor={c => isDone ? c.success : c.textDisabled} height={FontSize.textRegular} />
				</Spacing>
				{item}
			</RegularText>
		);
	});

	return (
		<List>
			{itemsRender}
		</List>
	);
};

const List = tStyled.div`
	margin-bottom: ${spacing.small.value};
	margin-top: 0;
`;