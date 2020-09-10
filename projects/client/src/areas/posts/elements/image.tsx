import * as React from 'react';
import { IPostImage } from 'oftheday-shared';
import { spacing } from '@/core/layout/common';
import { RegularText, Subtitle } from '@/core/symbol/text';
import { DefaultLayoutBreakpoint } from '@messman/react-common';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { ElementRoot } from '../post';
import { MediaSplit } from '@/core/layout/media-split';
import { borderRadiusStyle, mediaBoxShadowStyle } from '@/core/style/common';

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

	const mediaRender = (
		<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
			<ConstrainedImage src={link} />
		</a>
	);

	return (
		<ElementRoot>
			<MediaSplit isMediaOnRight={true} mediaRender={mediaRender}>
				<Subtitle margin={spacing.small.bottom}>Image</Subtitle>
				<RegularText show={description} margin={spacing.small.top}>{description}</RegularText>
				<RegularText show={sourceRender} margin={spacing.nudge.top}>From {sourceRender}</RegularText>
			</MediaSplit>
		</ElementRoot>
	);
};

const ConstrainedImage = tStyled.img`
	width: 100%;
	max-width: ${DefaultLayoutBreakpoint.wide}px;
	max-height: ${DefaultLayoutBreakpoint.wide}px;

	${borderRadiusStyle};
	${mediaBoxShadowStyle};
`;