import * as React from 'react';
import { IPostCustom } from 'oftheday-shared';
import { spacing } from '@/core/style/common';
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
				<DynamicMargin margin={spacing.medium.vertical}>
					<Text isBold={true}>{title}</Text>
				</DynamicMargin>
				<Value margin={spacing.medium.vertical}>
					<OutLink href={link}>{linkText}</OutLink>
				</Value>
				<Value margin={spacing.medium.vertical}>
					{value}
				</Value>
			</>
		);
	}
	else {
		render = (
			<LabelValue margin={spacing.medium.vertical} label={title}>
				{value}
			</LabelValue>
		);
	}

	return (
		<ElementRoot>
			<DynamicMargin margin={spacing.medium.horizontal} >
				{render}
				<ElementSeparator />
			</DynamicMargin>
		</ElementRoot>
	);
};