import * as React from 'react';
import { IPostCustom } from 'oftheday-shared';
import { spacing, Spacing, ApplicationMaxWidth } from '@/core/layout/common';
import { RegularText, Subtitle } from '@/core/symbol/text';
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
				<Spacing margin={spacing.medium.vertical}>
					<RegularText isBold={true}>{title}</RegularText>
				</Spacing>
				<RegularText margin={spacing.medium.vertical}>
					<OutLink href={link}>{linkText}</OutLink>
				</RegularText>
				<RegularText margin={spacing.medium.vertical}>
					{value}
				</RegularText>
			</>
		);
	}
	else {
		render = (
			<Spacing margin={spacing.medium.vertical}>
				<Subtitle>{title}</Subtitle>
				<RegularText>{value}</RegularText>
			</Spacing>
		);
	}

	return (
		<ElementRoot>
			<ApplicationMaxWidth>
				<Spacing margin={spacing.medium.horizontal} >
					{render}
				</Spacing>
			</ApplicationMaxWidth>
		</ElementRoot>
	);
};