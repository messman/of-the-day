import * as React from 'react';
import { decorate } from '@/test/storybook/decorate';
import { Title, Subtitle, Text, SmallText } from '@/core/symbol/text';
import { styled } from '@/core/style/styled';
import { useCurrentTheme } from '@/core/style/theme';
import { borderRadiusStyle, spacingAValue } from '@/core/style/common';

export default { title: 'core/style' };

export const TestTheme = decorate(() => {

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
			<TextColorBox backgroundColor={theme.color.link}>Link</TextColorBox>
			<TextColorBox backgroundColor={theme.color.primary}>Primary</TextColorBox>
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
	margin: ${spacingAValue};
	padding: ${spacingAValue};
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
	margin-bottom: ${spacingAValue};
	margin-right: ${spacingAValue};
`;

const TextColorBox: React.FC<ColorBoxProps> = (props) => {
	return (
		<div>
			<LongColorBox backgroundColor={props.backgroundColor} />
			<Text isInline={true}>{props.children}</Text>
		</div>
	);
};