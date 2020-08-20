// // Handles the simple to-do checklist.

// import * as React from 'react';
// import { styled } from '@/core/style/styled';
// import { Text, Subtitle, textHeight } from '@/core/symbol/text';
// import { OfTheDayData } from 'oftheday-shared';
// import { Icon, iconTypes } from '@/core/symbol/icon';
// import { useCurrentTheme } from '@/core/style/theme';

// interface ChecklistProps {
// 	data: OfTheDayData;
// }

// export const Checklist: React.FC<ChecklistProps> = (props) => {
// 	const { data } = props;
// 	if (!data) {
// 		return null!;
// 	}

// 	const checklistDone = data.checklistDone || [];
// 	const checklistToDo = data.checklistToDo || [];

// 	if (!checklistDone.length || !checklistToDo.length) {
// 		return null!;
// 	}

// 	return (
// 		<>
// 			<Subtitle>
// 				Top recent to-do items
// 			</Subtitle>
// 			<InnerChecklist isDone={true} items={checklistDone} />
// 			<InnerChecklist isDone={false} items={checklistToDo} />
// 		</>
// 	);
// };

// interface InnerChecklistProps {
// 	items: string[],
// 	isDone: boolean;
// }

// const InnerChecklist: React.FC<InnerChecklistProps> = (props) => {
// 	const theme = useCurrentTheme();

// 	const items = props.items.map((item) => {
// 		const color = props.isDone ? theme.color.success : theme.color.backgroundC;
// 		const iconType = props.isDone ? iconTypes.todoComplete : iconTypes.todoIncomplete;

// 		return (
// 			<Text key={item}>
// 				<Icon type={iconType} fill={color} height={textHeight} />
// 				{item}
// 			</Text>
// 		);
// 	});

// 	return (
// 		<List>
// 			{items}
// 		</List>
// 	);
// };

// const List = styled.div`
// 	margin-bottom: 1rem;
// 	margin-top: 0;
// `;