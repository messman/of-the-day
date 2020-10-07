import * as React from 'react';
import { IPost, IPostElementType } from 'oftheday-shared';
import { Spacing, spacing } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { borderRadiusStyle } from '@/core/style/common';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { createPostsElement } from './elements-common';

function shouldRenderImage(post: IPost): boolean {
	const { image } = post;
	return !!image.link;
}

export const Image = createPostsElement((props) => {
	const { post } = props;
	if (!shouldRenderImage(post)) {
		return null;
	}

	const { image } = post;
	const { link, description, source, sourceLink } = image;

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

			<RegularText show={description} margin={spacing.small.top}>{description}</RegularText>
			<RegularText show={sourceRender} margin={spacing.nudge.top}>From {sourceRender}</RegularText>
			<Spacing margin={spacing.large.top}>

				<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
					<ConstrainedImage src={link} />
				</a>
			</Spacing>
		</Card>
	);
}, IPostElementType.image, shouldRenderImage);

const ConstrainedImage = tStyled.img`
	width: 100%;
	max-width: ${LayoutBreakpoint.tablet}px;
	max-height: 80vh;

	${borderRadiusStyle};
`;