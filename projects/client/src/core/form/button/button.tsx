import { spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tCss, tStyled } from '@/core/style/styled';
import { Icon, SVGIconType } from '@/core/symbol/icon';
import { FontSize } from '@/core/symbol/text';
import * as React from 'react';

export interface ButtonProps extends Pick<React.HTMLAttributes<HTMLButtonElement>, 'onClick' | 'title'> {
	isDisabled?: boolean;
	isSelected?: boolean;
	isSpecial?: boolean;
	iconBefore?: SVGIconType;
	iconAfter?: SVGIconType;
}

export const Button: React.FC<ButtonProps> = (props) => {
	const { isDisabled, isSelected, isSpecial, iconBefore, iconAfter, onClick, title, children } = props;

	const iconRenderBefore = iconBefore ? <LeftIcon type={iconBefore} height={FontSize.textRegular} /> : null;
	const iconRenderAfter = iconAfter ? <RightIcon type={iconAfter} height={FontSize.textRegular} /> : null;

	return (
		<InnerButton
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
};

const FlexSpan = tStyled.span`
	display: inline-flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const LeftIcon = tStyled(Icon)`
	padding-right: ${spacing.small.value};
`;

const RightIcon = tStyled(Icon)`
	padding-left: ${spacing.small.value};
`;

interface InnerButtonProps {
	$isDisabled: boolean;
	$isSelected: boolean;
	$isSpecial: boolean;
}

const regularButtonStyle = tCss`
	cursor: pointer;
	color: ${p => p.theme.color.textRegular};
	background: ${p => p.theme.color.bgComponent2};
	border-color: ${p => p.theme.color.bgComponent3};
`;

const selectedButtonStyle = tCss`
	cursor: pointer;
	color: ${p => p.theme.color.textAccentOnBackground};
	background: ${p => p.theme.color.bgComponent2};
	border-color: ${p => p.theme.color.textAccentOnBackground};
`;

const disabledButtonStyle = tCss`
	cursor: not-allowed;
	color: ${p => p.theme.color.textDisabled};
	background: ${p => p.theme.color.bgComponent2};
	border-color: ${p => p.theme.color.bgComponent3};
`;

const specialButtonStyle = tCss`
	cursor: pointer;
	color: ${p => p.theme.color.textDistinctOnAccent};
	background: ${p => p.theme.color.accentGradient};
	border-color: transparent;
`;

const InnerButton = tStyled.button<InnerButtonProps>`
	display: block;
	width: 100%;

	text-align: center;
	font-size: ${FontSize.textRegular};

	${borderRadiusStyle}
	padding: ${spacing.medium.value} ${spacing.large.value};
	border: 1px solid transparent;

	${p => p.$isDisabled ? disabledButtonStyle : (p.$isSpecial ? specialButtonStyle : (p.$isSelected ? selectedButtonStyle : regularButtonStyle))}
`;