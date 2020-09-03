import * as React from 'react';
import { IPostImage } from 'oftheday-shared';
import { spacing } from '@/core/style/common';
import { DynamicMargin, Value, LabelValue } from '@/core/layout/common';
import { ElementSeparator } from './separators';
import { Text } from '@/core/symbol/text';
import { DefaultLayoutBreakpoint } from '@messman/react-common';
import { styled } from '@/core/style/styled';
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
			<DynamicMargin margin={spacing.medium.horizontal} >
				<LabelValue margin={spacing.medium.vertical} label='Image'>
					<Text >{description}</Text>
				</LabelValue>
				<DynamicMargin margin={spacing.medium.vertical} >
					<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
						<ConstrainedImage src={link} />
					</a>
				</DynamicMargin>
				<Value margin={spacing.medium.vertical}>{sourceRender}</Value>
				<ElementSeparator />
			</DynamicMargin>
		</ElementRoot>
	);
};

const ConstrainedImage = styled.img`
	width: 100%;
	max-width: ${DefaultLayoutBreakpoint.wide}px;
	max-height: ${DefaultLayoutBreakpoint.wide}px;
`;