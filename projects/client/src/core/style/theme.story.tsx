import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Heading1, Heading2, Heading3, RegularText, SmallText } from '@/core/symbol/text';
import { tStyled } from '@/core/style/styled';
import { useCurrentTheme } from '@/core/style/theme';
import { borderRadiusStyle } from '@/core/style/common';
import { Spacing } from '../layout/common';

export default { title: 'Core/Style/Theme' };

export const TestTheme = decorate('Theme', null, () => {

	const theme = useCurrentTheme();

	return (
		<>
			<div>
				<TextSizesColorBox backgroundColor={theme.bg} />
				<TextSizesColorBox backgroundColor={theme.subtleFill.a0Background} />
			</div>
			<TextColorBox backgroundColor={theme.system.error}>Error</TextColorBox>
			<TextColorBox backgroundColor={theme.system.warning}>Warning</TextColorBox>
			<TextColorBox backgroundColor={theme.system.success}>Success</TextColorBox>
			<TextColorBox backgroundColor={theme.accent.distinct}>Link</TextColorBox>
		</>
	);
});

interface ColorBoxProps {
	backgroundColor: string,
}

const ColorBox = tStyled.div<ColorBoxProps>`
	display: inline-block;
	min-width: 3rem;
	min-height: 1rem;

	background-color: ${p => p.backgroundColor};
	${borderRadiusStyle};
	margin: ${Spacing.bat08};
	padding: ${Spacing.bat08};
`;

const TextSizesColorBox: React.FC<ColorBoxProps> = (props) => {
	return (
		<ColorBox backgroundColor={props.backgroundColor}>
			<Heading1>Heading 1</Heading1>
			<Heading2>Heading 2</Heading2>
			<Heading3>Heading 3</Heading3>
			<RegularText>Regular Text</RegularText>
			<SmallText>Small Text</SmallText>
		</ColorBox>
	);
};

const LongColorBox = tStyled.div<ColorBoxProps>`
	display: inline-block;
	min-width: 8rem;
	min-height: 1rem;

	background-color: ${p => p.backgroundColor};
	${borderRadiusStyle};
	margin-bottom: ${Spacing.bat08};
	margin-right: ${Spacing.bat08};
`;

const TextColorBox: React.FC<ColorBoxProps> = (props) => {
	return (
		<div>
			<LongColorBox backgroundColor={props.backgroundColor} />
			<RegularText>{props.children}</RegularText>
		</div>
	);
};