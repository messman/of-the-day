import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Heading1, Heading2, Heading3, RegularText, SmallText, FontSize } from '@/core/symbol/text';
import { iconTypes, Icon } from '@/core/symbol/icon';
import { tStyled } from '../style/styled';
import { spacing } from '../layout/common';

export default { title: 'Core/Symbol/Text' };

export const TestTextWithIcons = decorate('Text', null, () => {

	const iconType = iconTypes.activity;

	return (
		<>
			<Padding>
				<Heading1 isInline={true}>
					<SpacedIcon type={iconType} height={FontSize.heading1} fillColor={c => c.textAccentOnBackground} />
					Heading 1
				</Heading1>
			</Padding>
			<Padding>
				<Heading2 isInline={true}>
					<SpacedIcon type={iconType} height={FontSize.heading2} fillColor={c => c.textAccentOnBackground} />
					Heading 2
				</Heading2>
			</Padding>
			<Padding>
				<Heading3 isInline={true}>
					<SpacedIcon type={iconType} height={FontSize.heading3} fillColor={c => c.textAccentOnBackground} />
					Heading 3
				</Heading3>
			</Padding>
			<Padding>
				<RegularText isInline={true}>
					<SpacedIcon type={iconType} height={FontSize.textRegular} fillColor={c => c.textAccentOnBackground} />
					Regular Text
					</RegularText>
			</Padding>
			<Padding>
				<SmallText isInline={true}>
					<SpacedIcon type={iconType} height={FontSize.textSmall} fillColor={c => c.textAccentOnBackground} />
					Small Text
				</SmallText>
			</Padding>
		</>
	);
});

const Padding = tStyled.div`
	margin: ${spacing.medium.value};
`;

const SpacedIcon = tStyled(Icon)`
	margin-right: ${spacing.nudge.value};
`;