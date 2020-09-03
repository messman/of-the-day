import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Title, Subtitle, Text, SmallText } from '@/core/symbol/text';
import { styled } from '@/core/style/styled';
import { useCurrentTheme } from '@/core/style/theme';
import { borderRadiusStyle, spacing } from '@/core/style/common';

export default { title: 'Core/Style/Theme' };

export const TestTheme = decorate('Theme', () => {

	const theme = useCurrentTheme();

	return (
		<>
			<div>
				<TextSizesColorBox backgroundColor={theme.color.backgroundA} />
				<TextSizesColorBox backgroundColor={theme.color.backgroundB} />
				<TextSizesColorBox backgroundColor={theme.color.backgroundC} />
			</div>
			<TextColorBox backgroundColor={theme.color.error}>Error</TextColorBox>
			<TextColorBox backgroundColor={theme.color.warning}>Warning</TextColorBox>
			<TextColorBox backgroundColor={theme.color.success}>Success</TextColorBox>
			<TextColorBox backgroundColor={theme.color.textLink}>Link</TextColorBox>
		</>
	);
});

interface ColorBoxProps {
	backgroundColor: string,
}

const ColorBox = styled.div<ColorBoxProps>`
	display: inline-block;
	min-width: 3rem;
	min-height: 1rem;

	background-color: ${p => p.backgroundColor};
	${borderRadiusStyle};
	margin: ${spacing.small.value};
	padding: ${spacing.small.value};
`;

const TextSizesColorBox: React.FC<ColorBoxProps> = (props) => {
	return (
		<ColorBox backgroundColor={props.backgroundColor}>
			<Title>Title</Title>
			<Subtitle>Subtitle</Subtitle>
			<Text>Text</Text>
			<SmallText>Small Text</SmallText>
		</ColorBox>
	);
};

const LongColorBox = styled.div<ColorBoxProps>`
	display: inline-block;
	min-width: 8rem;
	min-height: 1rem;

	background-color: ${p => p.backgroundColor};
	${borderRadiusStyle};
	margin-bottom: ${spacing.small.value};
	margin-right: ${spacing.small.value};
`;

const TextColorBox: React.FC<ColorBoxProps> = (props) => {
	return (
		<div>
			<LongColorBox backgroundColor={props.backgroundColor} />
			<Text isInline={true}>{props.children}</Text>
		</div>
	);
};