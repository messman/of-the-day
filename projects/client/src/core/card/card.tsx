import { FlexColumn, FlexRow } from '@messman/react-common';
import * as React from 'react';
import { Spacing, spacing } from '../layout/common';
import { borderRadiusStyle, borderRadiusValue } from '../style/common';
import { tStyled } from '../style/styled';
import { Icon, SVGIconType } from '../symbol/icon';
import { FontSize, Heading2 } from '../symbol/text';

export interface CardProps {
	title: string;
	icon: SVGIconType | null;
}

export const Card: React.FC<CardProps> = (props) => {
	const { title, icon, children } = props;

	let iconRender: JSX.Element | null = null;
	if (icon) {
		iconRender = (
			<Heading2>
				<Icon type={icon} height={FontSize.heading2} fillColor={c => c.textHeading2} />
			</Heading2>
		);
	}

	return (
		<CardContainer>
			<ColorHeader />
			<Background>
				<FlexRow justifyContent='space-between'>
					<Heading2>{title}</Heading2>
					{iconRender}
				</FlexRow>
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
	${borderRadiusStyle}
	overflow: hidden;
	box-shadow: 0 2px 8px 0 ${p => p.theme.color.bgComponentShadow1};
`;

const Background = tStyled.div`
	flex: 1;
	background-color: ${p => p.theme.color.bgComponent1};
	border: 1px solid ${p => p.theme.color.bgComponent3};
	border-top: none;
	padding: ${spacing.medium.value};
	border-bottom-left-radius: ${borderRadiusValue};
	border-bottom-right-radius: ${borderRadiusValue};
`;

const ColorHeader = tStyled.div`
	width: 100%;
	height: 6px;
	background: ${p => p.theme.color.accentGradient};
`;