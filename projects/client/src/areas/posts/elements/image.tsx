import * as React from 'react';
import { IPostImage, IPostElementType, isValidPostElement } from 'oftheday-shared';
import { Spacing, spacing } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { borderRadiusStyle } from '@/core/style/common';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { createPostsElement } from './elements-common';
import { TagList, useTags } from './tag';

export const Image = createPostsElement<IPostImage>((props) => {
	const { link, description, source, sourceLink, isNSFW, isTop } = props.value;

	const tagsStrings = useTags(isTop, isNSFW);

	let sourceRender: JSX.Element | string | null = null;
	if (source) {
		if (sourceLink) {
			sourceRender = <OutLink href={sourceLink}>{source}</OutLink>;
		}
		else {
			sourceRender = source;
		}
	}

	// TODO - add accessibility for image.

	return (
		<Card title='Image' icon={iconTypes.image}>
			<TagList margin={spacing.medium.vertical} tags={tagsStrings} />
			<RegularText show={description} margin={spacing.small.top}>{description}</RegularText>
			<RegularText show={sourceRender} margin={spacing.nudge.top}>From {sourceRender}</RegularText>
			<Spacing margin={spacing.large.top}>

				<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
					<ConstrainedImage src={link} />
				</a>
			</Spacing>
		</Card>
	);
}, IPostElementType.image, isValidPostElement.image);

const ConstrainedImage = tStyled.img`
	width: 100%;
	max-width: ${LayoutBreakpoint.tablet}px;
	max-height: 80vh;

	${borderRadiusStyle};
`;