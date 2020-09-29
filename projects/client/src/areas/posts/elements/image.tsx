import * as React from 'react';
import { IPostImage } from 'oftheday-shared';
import { Spacing, spacing } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { borderRadiusStyle } from '@/core/style/common';
import { CardFlow } from '@/core/card/card-flow';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';
import { LayoutBreakpoint } from '@/services/layout/window-layout';

export interface ImageProps {
	image: IPostImage;
}

export const Image: React.FC<ImageProps> = (props) => {
	const { image } = props;
	const { link, description, source, sourceLink } = image;

	if (!link) {
		return null;
	}

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
		<CardFlow useAutoVerticalMargin={true}>
			<Card title='Image' icon={iconTypes.image}>

				<RegularText show={description} margin={spacing.small.top}>{description}</RegularText>
				<RegularText show={sourceRender} margin={spacing.nudge.top}>From {sourceRender}</RegularText>
				<Spacing margin={spacing.large.top}>

					<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
						<ConstrainedImage src={link} />
					</a>
				</Spacing>
			</Card>
		</CardFlow>
	);
};

const ConstrainedImage = tStyled.img`
	max-width: ${LayoutBreakpoint.tablet}px;
	max-height: 80vh;

	${borderRadiusStyle};
`;