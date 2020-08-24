import * as React from 'react';
import { IPostImage } from 'oftheday-shared';
import { largerSpacing } from '@/core/style/common';
import { DynamicMargin, Value } from '@/core/layout/common';
import { ElementSeparator } from './separators';
import { Text } from '@/core/symbol/text';
import { DefaultLayoutBreakpoint } from '@messman/react-common';
import { styled } from '@/core/style/styled';
import { OutLink } from '@/core/link';

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
		<DynamicMargin margin={largerSpacing.horizontal} >
			<DynamicMargin margin={largerSpacing.vertical} >
				<Text isBold={true}>Image</Text>
			</DynamicMargin>
			<DynamicMargin margin={largerSpacing.vertical} >
				<a href={link} target='_blank' rel="noreferrer noopener" title='Click to open in a new tab'>
					<ConstrainedImage src={link} />
				</a>
			</DynamicMargin>
			<Value margin={largerSpacing.vertical}>{description}</Value>
			<Value margin={largerSpacing.vertical}>{sourceRender}</Value>
			<ElementSeparator />
		</DynamicMargin>

	);
};

const ConstrainedImage = styled.img`
	width: 100%;
	max-width: ${DefaultLayoutBreakpoint.wide}px;
	max-height: ${DefaultLayoutBreakpoint.wide}px;
`;