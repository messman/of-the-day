import * as React from 'react';
import { IPostCustom } from 'oftheday-shared';
import { largerSpacing } from '@/core/style/common';
import { LabelValue, DynamicMargin, Value } from '@/core/layout/common';
import { ElementSeparator } from './separators';
import { Text } from '@/core/symbol/text';
import { OutLink } from '@/core/link';
import { ElementRoot } from '../post';

export interface CustomProps {
	custom: IPostCustom;
}

export const Custom: React.FC<CustomProps> = (props) => {
	const { custom } = props;
	const { value, title, link, linkText } = custom;

	if (!value || !title) {
		return null;
	}

	let render: JSX.Element = null!;

	// If the link is included, it should be at the forefront.
	if (link) {
		render = (
			<>
				<DynamicMargin margin={largerSpacing.vertical}>
					<Text isBold={true}>{title}</Text>
				</DynamicMargin>
				<Value margin={largerSpacing.vertical}>
					<OutLink href={link}>{linkText}</OutLink>
				</Value>
				<Value margin={largerSpacing.vertical}>
					{value}
				</Value>
			</>
		);
	}
	else {
		render = (
			<LabelValue margin={largerSpacing.vertical} label={title}>
				{value}
			</LabelValue>
		);
	}

	return (
		<ElementRoot>
			<DynamicMargin margin={largerSpacing.horizontal} >
				{render}
				<ElementSeparator />
			</DynamicMargin>
		</ElementRoot>
	);
};