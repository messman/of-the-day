import * as React from 'react';
import { IPostImage } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { RegularText, Subtitle } from '@/core/symbol/text';
import { DefaultLayoutBreakpoint } from '@messman/react-common';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { ElementRoot } from '../post';

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
		<ElementRoot>
			<Spacing margin={spacing.medium.horizontal}>
				<Subtitle margin={spacing.medium.vertical}>Image</Subtitle>
				<RegularText>{description}</RegularText>
				<Spacing margin={spacing.medium.vertical} >
					<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
						<ConstrainedImage src={link} />
					</a>
				</Spacing>
				<RegularText margin={spacing.medium.vertical}>{sourceRender}</RegularText>
			</Spacing>
		</ElementRoot>
	);
};

const ConstrainedImage = tStyled.img`
	width: 100%;
	max-width: ${DefaultLayoutBreakpoint.wide}px;
	max-height: ${DefaultLayoutBreakpoint.wide}px;
`;