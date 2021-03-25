import * as React from 'react';
import { TagList } from './tag';
import { iconTypes } from '@/core/symbol/icon';
import { PostElementCard, PostElementProps } from '../card/card';
import { ElementActions } from '../element-action-overlay';
import { IPostElementType } from 'oftheday-shared';
import { fontDeclarations, lineHeights, Paragraph, ParagraphArray } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';

/** "Personal" info, like location, event, etc. */
export const Personal: React.FC<PostElementProps> = (props) => {
	const { isOfSameElement, isForArchive, post } = props;
	const { event, note, dayTypes, location, previousDayThoughts, schedule } = post.personal!;

	const eventRender = event ? (
		<>
			<LeadParagraph>{event}</LeadParagraph>
		</>
	) : null;

	const notesRender = note.length ? (
		<ParagraphArray value={note} />
	) : null;

	const scheduleRender = schedule && dayTypes.length ? (
		<>
			<LeadParagraph>Schedule</LeadParagraph>
			<TagList tags={dayTypes} />
			<Paragraph>{schedule}</Paragraph>
		</>
	) : null;

	const locationRender = location ? (
		<>
			<LeadParagraph>Location</LeadParagraph>
			<Paragraph>
				{location}
			</Paragraph>
		</>
	) : null;

	const thoughtsRender = previousDayThoughts.length ? (
		<>
			<LeadParagraph>Thoughts On Yesterday</LeadParagraph>
			<ParagraphArray value={previousDayThoughts} />
		</>
	) : null;

	if (!eventRender && !notesRender && !scheduleRender && !locationRender && !thoughtsRender) {
		return null;
	}

	return (
		<div>
			<PostElementCard
				title='Me'
				icon={iconTypes.activity}
				isOfSameElement={isOfSameElement}
				isForArchive={isForArchive}
				isShowingEmbeddedByDefault={true}
				post={post}
				actionsRender={
					<ElementActions elementType={IPostElementType.personal} />
				}
			>
				{eventRender}
				{notesRender}
				{scheduleRender}
				{locationRender}
				{thoughtsRender}
			</PostElementCard>
		</div>
	);
};

const LeadParagraph = tStyled.p`
	${fontDeclarations.lead};
	${lineHeights.body};
	color: ${p => p.theme.textDistinct};
`;