import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Title, titleHeight, Subtitle, subtitleHeight, RegularText, textHeight, SmallText, smallTextHeight } from '@/core/symbol/text';
import { iconTypes, Icon } from '@/core/symbol/icon';
import { tStyled } from '../style/styled';
import { spacing } from '../layout/common';

export default { title: 'Core/Symbol/Text' };

export const TestTextWithIcons = decorate('Text', () => {

	const iconType = iconTypes.alert;

	return (
		<>
			<Padding>
				<Title isInline={true}>
					<Icon type={iconType} height={titleHeight} />
					Title
					</Title>
			</Padding>
			<Padding>
				<Subtitle isInline={true}>
					<Icon type={iconType} height={subtitleHeight} />
					Subtitle
					</Subtitle>
			</Padding>
			<Padding>
				<RegularText isInline={true}>
					<Icon type={iconType} height={textHeight} />
					Text
					</RegularText>
			</Padding>
			<Padding>
				<SmallText isInline={true}>
					<Icon type={iconType} height={smallTextHeight} />
					SmallText
					</SmallText>
			</Padding>
		</>
	);
});

const Padding = tStyled.div`
	margin: ${spacing.medium.value};
`;