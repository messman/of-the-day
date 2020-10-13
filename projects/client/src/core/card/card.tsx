import { FlexColumn, FlexRow } from '@messman/react-common';
import * as React from 'react';
import { Spacing, spacing } from '../layout/common';
import { borderRadiusStyle } from '../style/common';
import { tStyled } from '../style/styled';
import { Icon, SVGIconType } from '../symbol/icon';
import { FontSize, Heading2, RegularText } from '../symbol/text';

export interface CardProps {
	title: string;
	subtitle?: JSX.Element | string | null;
	icon: SVGIconType | null;
}

export const Card: React.FC<CardProps> = (props) => {
	const { title, subtitle, icon, children } = props;

	let iconRender: JSX.Element | null = null;
	if (icon) {
		iconRender = (
			<Icon type={icon} height={FontSize.heading2} fillColor={c => c.textHeading2} />
		);
	}

	return (
		<CardContainer>
			<Background>
				<TopCardPadding>
					<FlexRow justifyContent='space-between' alignItems='center'>
						<Heading2>{title}</Heading2>
						{iconRender}
					</FlexRow>
					<Spacing show={!!subtitle} margin={spacing.small.top}>
						<RegularText>{subtitle}</RegularText>
					</Spacing>
				</TopCardPadding>
				<Spacing show={!!children} margin={spacing.large.top}>
					<Spacing margin={spacing.medium.bottom}>
						{children}
					</Spacing>
				</Spacing>
			</Background>
		</CardContainer>
	);
};

export const CardContainer = tStyled(FlexColumn)`
	position: relative;
`;

const Background = tStyled.div`
	flex: 1;
	box-shadow: 0 2px 4px 2px ${p => p.theme.color.bgComponentShadow1};
	overflow: hidden;
	background-color: ${p => p.theme.color.bgComponent1};
	border: 1px solid ${p => p.theme.color.bgComponent3};
	${borderRadiusStyle}
`;

export const CardPadding = tStyled.div`
	padding: ${spacing.medium.horizontal};
`;

const TopCardPadding = tStyled.div`
	padding: ${spacing.medium.value};
	padding-bottom: 0;
`;

// const ColorHeader = tStyled.div`
// 	width: 100%;
// 	height: 4px;
// 	background: ${p => p.theme.color.accentGradient};
// `;