import { Spacing } from '@/core/layout/common';
import { borderRadiusStyle, formTransitionStyle, HighlightBar } from '@/core/style/common';
import { StyledFCProps, tStyled } from '@/core/style/styled';
import { fontDeclarations, FontSize } from '@/core/symbol/text';
import { FlexRow } from '@messman/react-common';
import * as React from 'react';

export interface CheckboxProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
}

// Surround with styled-components so that we can refer to this component in other CSS blocks.
export const Checkbox = tStyled((props: StyledFCProps<CheckboxProps>) => {
	const { value, onValueChange, children, className } = props;

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		onValueChange(e.target.checked);
	}

	return (
		<CheckboxLabel className={className}>
			<CheckboxInput type='checkbox' checked={value} onChange={onChange} />
			<FlexRow alignItems='center'>
				<CheckboxIndicator $isChecked={value} />
				<InlineRegularText>
					{children}
				</InlineRegularText>
			</FlexRow>
		</CheckboxLabel>
	);
})``;

const InlineRegularText = tStyled.div`
	display: inline-block;
`;

/*${p => p.theme.color.bgComponent3};*/
/*${p => p.theme.color.bgComponent2};*/
const CheckboxLabel = tStyled.label`
	display: block;
	position: relative;
	background-color: ${p => p.theme.subtleFill.c2Button};
	border: 1px solid ${p => p.theme.outlineDistinct};
	box-shadow: ${p => p.theme.shadow.c2Button};
	${borderRadiusStyle}
	padding: ${Spacing.bat08};
	cursor: pointer;
	user-select: none;
`;

const CheckboxInput = tStyled.input`
	display: inline-block;
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
	margin: 0;
	padding: 0;
	border: none;
`;

interface CheckboxIndicatorProps {
	$isChecked: boolean;
}

// border: 1px solid ${p => p.$isChecked ? p.theme.color.accentFillOnBackground : p.theme.color.textAccentOnBackground};
// background-color: ${p => p.$isChecked ? p.theme.color.accentFillOnBackground : 'transparent'};
const CheckboxIndicator = tStyled.span<CheckboxIndicatorProps>`
	display: inline-block;
	width: ${FontSize.regular};
	height: ${FontSize.regular};
	margin-left: ${Spacing.ant04};
	margin-right: ${Spacing.dog16};
	box-sizing: content-box;
	border: 1px solid ${p => p.theme.accent.distinct};
	background-color: ${p => p.$isChecked ? p.theme.accent.distinct : 'transparent'};
	${borderRadiusStyle}
	${formTransitionStyle}
	transition-property: border-color, background-color;
`;

export interface OpenSelectOption {
	value: string;
	isDisabled: boolean;
}

export interface OpenSelectProps {
	options: OpenSelectOption[];
	selectedIndex: number;
	onSelectedIndexChange: (selectedIndex: number) => void;
}

export const OpenSelect: React.FC<OpenSelectProps> = (props) => {
	const { options, selectedIndex, onSelectedIndexChange } = props;

	const optionsRender = options.map((option, i) => {
		const { value, isDisabled } = option;
		const isSelected = i === selectedIndex;

		function onClick() {
			if (!isDisabled) {
				onSelectedIndexChange(i);
			}
		}

		return (
			<OpenOption
				key={value}
				title={value}
				$isSelected={isSelected}
				$isDisabled={isDisabled}
				onClick={onClick}
			>
				{value}
			</OpenOption>
		);
	});


	return (
		<SelectContainer>
			<HighlightBar position='left' index={selectedIndex} count={options.length} />
			{optionsRender}
		</SelectContainer>
	);
};

const SelectContainer = tStyled.div`
	display: block;
	width: 100%;
	position: relative;
	border: 1px solid ${p => p.theme.outlineDistinct};
	box-shadow: ${p => p.theme.shadow.c2Button};
	${borderRadiusStyle}
	user-select: none;
`;

interface OpenOptionProps {
	$isSelected: boolean;
	$isDisabled: boolean;
}

const regularTextOptionSpacing = `${Spacing.dog16} ${Spacing.elf24}`;

const OpenOption = tStyled.div<OpenOptionProps>`
	${fontDeclarations.regular}
	background-color: ${p => p.$isSelected ? p.theme.subtleFill.e4Hover : p.theme.subtleFill.c2Button};
	padding: ${regularTextOptionSpacing};

	cursor: ${p => (p.$isSelected || p.$isDisabled) ? 'not-allowed' : 'pointer'};
	color: ${p => p.$isSelected ? p.theme.textDistinct : (p.$isDisabled ? p.theme.textDisabled : p.theme.textDistinct)};

	& + & {
		border-top: 1px solid ${p => p.theme.outlineSubtle};
	}
`;
