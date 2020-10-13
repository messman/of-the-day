import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { Spacing, spacing } from '@/core/layout/common';
import { iconTypes, Icon, SVGIconType } from '@/core/symbol/icon';
import { RegularText, FontSize } from '@/core/symbol/text';
import { CardGroup } from '@/core/card/card-group';
import { Card, CardPadding } from '@/core/card/card';
import { ThemePickColor } from '@/core/style/theme';
import { EqualCardFlow } from '@/core/card/card-flow';

export interface ChecklistProps {
	other: IOther;
}

export const Checklist: React.FC<ChecklistProps> = (props) => {
	const { other } = props;
	const { checklistToDo, checklistDone } = other;

	return (
		<CardGroup title='Goals' isAutoAlternateBackground={true}>
			<EqualCardFlow>
				<InnerChecklist
					title='Top To-Do Items'
					icon={iconTypes.todoIncomplete}
					items={checklistToDo}
					itemsIcon={iconTypes.todoIncomplete}
					itemsIconColor={c => c.textDisabled}
				/>
				<InnerChecklist
					title='Completed Items'
					icon={iconTypes.todoComplete}
					items={checklistDone}
					itemsIcon={iconTypes.todoComplete}
					itemsIconColor={c => c.success}
				/>
			</EqualCardFlow>
		</CardGroup>
	);
};

interface InnerChecklistProps {
	title: string;
	icon: SVGIconType;
	items: string[];
	itemsIcon: SVGIconType;
	itemsIconColor: ThemePickColor;
}

const InnerChecklist: React.FC<InnerChecklistProps> = (props) => {
	const { title, icon, items, itemsIcon, itemsIconColor } = props;

	if (!items || !items.length) {
		return null;
	}

	const itemsRender = items.map((item, i) => {

		const key = `${i}_${item}`;
		return (
			<RegularText key={key}>
				<Spacing isInline={true} margin={spacing.small.right}>
					<Icon type={itemsIcon} fillColor={itemsIconColor} height={FontSize.textRegular} />
				</Spacing>
				{item}
			</RegularText>
		);
	});

	return (
		<Card title={title} icon={icon}>
			<CardPadding>
				{itemsRender}
			</CardPadding>
		</Card>
	);
};