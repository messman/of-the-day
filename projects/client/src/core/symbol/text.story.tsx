import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Title, titleHeight, Subtitle, subtitleHeight, Text, textHeight, SmallText, smallTextHeight } from '@/core/symbol/text';
import { iconTypes, Icon } from '@/core/symbol/icon';
import { styled } from '../style/styled';
import { largerSpacingValue } from '../style/common';

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
				<Text isInline={true}>
					<Icon type={iconType} height={textHeight} />
					Text
					</Text>
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

const Padding = styled.div`
	margin: ${largerSpacingValue};
`;