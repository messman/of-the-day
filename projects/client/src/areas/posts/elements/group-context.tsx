import * as React from 'react';
import { IPost, isValidPostElement } from 'oftheday-shared';
import { Notes, Schedule, Location } from './basics';
import { EndThoughts } from './end-thoughts';
import { ColumnCardFlow, RowCardFlow, useMaximumRowChildren } from '@/core/card/card-flow';
import { ApplicationMaxWidth, spacing, Spacing, useResponsiveEdgeSpacing } from '@/core/layout/common';

interface PostProps {
	post: IPost;
}

export const ContextGroup: React.FC<PostProps> = (props) => {
	const { post } = props;

	const endThoughts = <EndThoughts value={post.endThoughts} />;
	const notes = <Notes value={post.basics} />;
	const schedule = <Schedule value={post.basics} />;
	const location = <Location value={post.basics} />;

	const numberOfChildrenToRender = [
		isValidPostElement.endThoughts(post.endThoughts),
		isValidPostElement.note(post.basics),
		isValidPostElement.schedule(post.basics),
		isValidPostElement.location(post.basics)
	].filter(x => !!x).length;
	const maximumRowChildren = useMaximumRowChildren();
	const spacingBetween = useResponsiveEdgeSpacing();

	if (numberOfChildrenToRender < 1) {
		return null;
	}

	let cardFlowRender: JSX.Element = null!;
	if (maximumRowChildren === 1) {
		// Easy case - render as each item on its own row.
		cardFlowRender = (
			<ColumnCardFlow $spacing={spacingBetween.value}>
				{endThoughts}
				{notes}
				{schedule}
				{location}
			</ColumnCardFlow>
		);
	}
	else if (numberOfChildrenToRender <= maximumRowChildren) {
		// Easy case - just render all of them in the row and it sorts itself out.
		cardFlowRender = (
			<RowCardFlow $spacing={spacingBetween.value}>
				{endThoughts}
				{notes}
				{schedule}
				{location}
			</RowCardFlow>
		);
	}
	else if (numberOfChildrenToRender === 3) {
		// Hard case - 3 children, more children than the maximum for one row.
		// Either the End Thoughts or the Notes belongs on its own row.
		const ownRowChild = endThoughts || notes;
		const sameRowChild = endThoughts ? notes : null;
		cardFlowRender = (
			<>
				<RowCardFlow $spacing={spacingBetween.value}>
					{ownRowChild}
				</RowCardFlow>
				<Spacing margin={spacingBetween.top}>
					<RowCardFlow $spacing={spacingBetween.value}>
						{sameRowChild}
						{schedule}
						{location}
					</RowCardFlow>
				</Spacing>
			</>
		);
	}
	else if (numberOfChildrenToRender === 4) {
		// Rendering all children - do two rows by two columns.
		cardFlowRender = (
			<>
				<RowCardFlow $spacing={spacingBetween.value}>
					{endThoughts}
					{notes}
				</RowCardFlow>
				<Spacing margin={spacingBetween.top}>
					<RowCardFlow $spacing={spacingBetween.value}>
						{schedule}
						{location}
					</RowCardFlow>
				</Spacing>
			</>
		);
	}

	return (
		<Spacing margin={spacing.grand.top}>
			<ApplicationMaxWidth>
				{cardFlowRender}
			</ApplicationMaxWidth>
		</Spacing>
	);
};