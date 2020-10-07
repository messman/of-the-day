import { spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { FontSize, RegularText } from '@/core/symbol/text';
import { FlexRow } from '@messman/react-common';
import * as React from 'react';

export interface CheckboxProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
	const { value, onValueChange, children } = props;

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		onValueChange(e.target.checked);
	}

	return (
		<CheckboxLabel>
			<CheckboxInput type='checkbox' checked={value} onChange={onChange} />
			<FlexRow alignItems='center'>
				<CheckboxIndicator $isChecked={value} />
				<RegularText isInline={true}>
					{children}
				</RegularText>
			</FlexRow>
		</CheckboxLabel>
	);
};

const CheckboxLabel = tStyled.label`
	display: block;
	position: relative;
	border: 1px solid ${p => p.theme.color.bgComponent3};
	background-color: ${p => p.theme.color.bgComponent2};
	${borderRadiusStyle}
	padding: ${spacing.small.value};
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

const CheckboxIndicator = tStyled.span<CheckboxIndicatorProps>`
	display: inline-block;
	width: ${FontSize.textRegular};
	height: ${FontSize.textRegular};
	margin-left: ${spacing.nudge.value};
	margin-right: ${spacing.medium.value};
	box-sizing: content-box;
	border: 1px solid ${p => p.$isChecked ? p.theme.color.accentFillOnBackground : p.theme.color.textAccentOnBackground};
	background-color: ${p => p.$isChecked ? p.theme.color.accentFillOnBackground : 'transparent'};
	${borderRadiusStyle}
	transition: all .1s linear;
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
				<OpenOptionIndicator $isSelected={isSelected} $isDisabled={isDisabled} />
				<RegularText
					isMaxLineLength={false}
					textAlign='center'
					padding={regularTextOptionSpacing}
					color={c => isSelected ? c.textAccentOnBackground : (isDisabled ? c.textDisabled : c.textRegular)}
				>
					{value}
				</RegularText>
			</OpenOption>
		);
	});


	return (
		<SelectContainer>
			{optionsRender}
		</SelectContainer>
	);
};

const SelectContainer = tStyled.div`
	display: block;
	width: 100%;
	position: relative;
	border: 1px solid ${p => p.theme.color.bgComponent3};
	background-color: ${p => p.theme.color.bgComponent2};
	${borderRadiusStyle}
	user-select: none;
`;

interface OpenOptionProps {
	$isSelected: boolean;
	$isDisabled: boolean;
}

const OpenOption = tStyled.div<OpenOptionProps>`
	position: relative;
	cursor: ${p => (p.$isSelected || p.$isDisabled) ? 'not-allowed' : 'pointer'};
	background-color: transparent;

	& + & {
		border: 1px solid ${p => p.theme.color.bgComponent3};
	}
`;

const OpenOptionIndicator = tStyled.div<OpenOptionProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 6px;
	border-radius: 3px;
	height: 100%;
	background-color: ${p => p.$isSelected ? p.theme.color.accentFillOnBackground : 'transparent'};
`;

const regularTextOptionSpacing = `${spacing.medium.value} ${spacing.large.value}`;