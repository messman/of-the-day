import { Spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { StyledFCProps, tCss, tStyled } from '@/core/style/styled';
import { IconSize, SizedIcon, SVGIconType } from '@/core/symbol/icon';
import { fontDeclarations } from '@/core/symbol/text';
import * as React from 'react';

export interface ButtonProps extends Pick<React.HTMLAttributes<HTMLButtonElement>, 'onClick' | 'title'> {
	isDisabled?: boolean;
	isSelected?: boolean;
	isSpecial?: boolean;
	iconBefore?: SVGIconType;
	iconAfter?: SVGIconType;
}

export const Button = tStyled((props: StyledFCProps<ButtonProps>) => {
	const { className, isDisabled, isSelected, isSpecial, iconBefore, iconAfter, onClick, title, children } = props;

	const iconRenderBefore = iconBefore ? <LeftIcon type={iconBefore} size={IconSize.a_medium} /> : null;
	const iconRenderAfter = iconAfter ? <RightIcon type={iconAfter} size={IconSize.a_medium} /> : null;

	return (
		<InnerButton
			className={className}
			disabled={!!isDisabled}
			$isDisabled={!!isDisabled}
			$isSelected={!!isSelected}
			$isSpecial={!!isSpecial}
			title={title}
			onClick={onClick}
		>
			<FlexSpan>
				{iconRenderBefore}
				{children}
				{iconRenderAfter}
			</FlexSpan>
		</InnerButton>
	);
})``;

const FlexSpan = tStyled.span`
	display: inline-flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const LeftIcon = tStyled(SizedIcon)`
	padding-right: ${Spacing.bat08};
`;

const RightIcon = tStyled(SizedIcon)`
	padding-left: ${Spacing.bat08};
`;

interface InnerButtonProps {
	$isDisabled: boolean;
	$isSelected: boolean;
	$isSpecial: boolean;
}

const regularButtonStyle = tCss`
	cursor: pointer;
	color: ${p => p.theme.textDistinct};
	background: ${p => p.theme.subtleFill.c2Button};
	border-color: ${p => p.theme.outlineDistinct};
`;

const selectedButtonStyle = tCss`
	cursor: pointer;
	color: ${p => p.theme.accent.distinct};
	background: ${p => p.theme.subtleFill.c2Button};
	border-color: ${p => p.theme.accent.distinct};
`;

const disabledButtonStyle = tCss`
	cursor: not-allowed;
	color: ${p => p.theme.textDisabled};
	background: ${p => p.theme.subtleFill.c2Button};
	border-color: ${p => p.theme.outlineDistinct};
`;

const specialButtonStyle = tCss`
	cursor: pointer;
	color: ${p => p.theme.textOnAccentFill};
	background: ${p => p.theme.accent.gradient};
	border-color: transparent;
`;

const InnerButton = tStyled.button<InnerButtonProps>`
	display: block;
	width: 100%;

	text-align: center;
	${fontDeclarations.regular}

	${borderRadiusStyle}
	padding: ${Spacing.dog16} ${Spacing.elf24};
	border: 1px solid transparent;
	box-shadow: ${p => p.theme.shadow.d3Nav};

	${p => p.$isDisabled ? disabledButtonStyle : (p.$isSpecial ? specialButtonStyle : (p.$isSelected ? selectedButtonStyle : regularButtonStyle))}
`;