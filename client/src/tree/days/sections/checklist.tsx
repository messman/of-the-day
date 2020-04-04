// Handles the simple to-do checklist.

import * as React from "react";
import styled from "@/styles/theme";
import * as Common from "@/styles/common";
import { If } from "@/unit/components/if";
import { OfTheDayData } from "@/data/apiResponse";
import { IconTitle } from "@/unit/components/iconTitle";
import { faTasks, faCheck, faCircle, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/unit/components/icon";
import { ThemeContext } from "styled-components";

interface ChecklistProps {
	data: OfTheDayData
}

export const Checklist: React.FC<ChecklistProps> = (props) => {
	const { data } = props;
	if (!data) {
		return;
	}

	const checklistDone = data.checklistDone || [];
	const checklistToDo = data.checklistToDo || [];

	return (
		<If show={checklistDone.length > 0 || checklistToDo.length > 0}>
			{() =>
				<>
					<IconTitle icon={faTasks}>Top recent to-do items</IconTitle>
					<InnerChecklist isDone={true} items={checklistDone} />
					<InnerChecklist isDone={false} items={checklistToDo} />
				</>
			}
		</If>
	);
}

interface InnerChecklistProps {
	items: string[],
	isDone: boolean
}

const InnerChecklist: React.FC<InnerChecklistProps> = (props) => {
	const theme = React.useContext(ThemeContext);

	const items = props.items.map((item) => {
		return (
			<Common.Text key={item}>
				<If show={props.isDone}>
					{() => <Icon icon={faCheck} color={theme.color.completedToDo} />}
				</If>
				<If show={!props.isDone}>
					{() => <Icon icon={faCaretRight} color={theme.color.incompleteToDo} />}
				</If>
				{item}
			</Common.Text>
		)
	});

	return (
		<List>
			{items}
		</List>
	);
};

const List = styled.div`
	margin-bottom: 1rem;
	margin-top: 0;
`;

