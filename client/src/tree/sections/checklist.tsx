import * as React from "react";
import styled from "@/styles/theme";
import { useAppDataContext } from "@/tree/appData";
import * as Common from "@/styles/common";
import { TextPlaceholder } from "@/styles/placeholder";
import { RenderIf } from "@/unit/components/renderIf";

interface ChecklistProps {
}

export const Checklist: React.FC<ChecklistProps> = (props) => {

	const { isLoading, success, error } = useAppDataContext();
	if (error) {
		return null;
	}

	const checklistDone = isLoading ? [] : (success.checklistDone || []);
	const checklistToDo = isLoading ? [] : (success.checklistToDo || []);

	return (
		<RenderIf show={isLoading || checklistDone.length > 0 || checklistToDo.length > 0}>
			{() =>
				<>
					<Common.SubTitle>
						<TextPlaceholder show={isLoading} length={12}>
							{() => <>Top recent to-do items</>}
						</TextPlaceholder>
					</Common.SubTitle>

					<Common.Text><TextPlaceholder show={isLoading} length={10} /></Common.Text>
					<Common.Text><TextPlaceholder show={isLoading} length={10} /></Common.Text>
					<Common.Text><TextPlaceholder show={isLoading} length={10} /></Common.Text>
					<Common.Text><TextPlaceholder show={isLoading} length={10} /></Common.Text>

					<RenderIf show={!!success}>
						{() =>
							<>
								<InnerChecklist isDone={true} items={checklistDone} />
								<InnerChecklist isDone={false} items={checklistToDo} />
							</>
						}
					</RenderIf>
				</>
			}
		</RenderIf>
	);
}

interface InnerChecklistProps {
	items: string[],
	isDone: boolean
}

const InnerChecklist: React.FC<InnerChecklistProps> = (props) => {
	const items = props.items.map((item) => {
		return (
			<ListItem key={item} isDone={props.isDone}>
				<Common.Text>
					{item}
				</Common.Text>
			</ListItem>
		)
	});

	return (
		<List>
			{items}
		</List>
	);
};

interface ListItemProps {
	isDone: boolean
}

const ListItem = styled.li<ListItemProps>`
	position: relative;
	&::before {
		position: absolute;
		top: 0;
		left: -1rem;
		content: "\\2022";
		font-size: 3rem;
		height: 1rem;
		width: 1rem;
		line-height: 1rem;
		color: ${props => props.isDone ? props.theme.color.completedToDo : props.theme.color.incompleteToDo};
	}
`;

const List = styled.ul`
	margin-bottom: 1rem;
	margin-top: 0;
	padding-left: 2.5rem;
	list-style-type: none;
`;

