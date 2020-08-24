import * as React from 'react';
import { IPostCustom } from 'oftheday-shared';
import { largerSpacing } from '@/core/style/common';
import { LabelValue, DynamicMargin, Value } from '@/core/layout/common';
import { ElementSeparator } from './separators';
import { Text } from '@/core/symbol/text';
import { OutLink } from '@/core/link';

export interface CustomProps {
	custom: IPostCustom;
}

export const Custom: React.FC<CustomProps> = (props) => {
	const { custom } = props;
	const { value, title, link, linkText } = custom;

	if (!value || !title) {
		return null;
	}

	// If the link is included, it should be at the forefront.
	if (link) {
		return (
			<DynamicMargin margin={largerSpacing.horizontal}>
				<DynamicMargin margin={largerSpacing.vertical}>
					<Text isBold={true}>{title}</Text>
				</DynamicMargin>
				<Value margin={largerSpacing.vertical}>
					<OutLink href={link}>{linkText}</OutLink>
				</Value>
				<Value margin={largerSpacing.vertical}>
					{value}
				</Value>
				<ElementSeparator />
			</DynamicMargin>
		);
	}

	return (
		<DynamicMargin margin={largerSpacing.horizontal} >
			<LabelValue margin={largerSpacing.vertical} label={title}>
				{value}
			</LabelValue>
			<ElementSeparator />
		</DynamicMargin>
	);
};