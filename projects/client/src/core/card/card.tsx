import { FlexColumn, FlexRow } from '@messman/react-common';
import * as React from 'react';
import { Spacing, spacing } from '../layout/common';
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
			<Icon type={icon} height={FontSize.heading1} fillColor={c => c.textHeading2} />
		);
	}

	return (
		<CardContainer>
			<BoxShadow>
				<ColorHeader />
				<Background>
					<FlexRow justifyContent='space-between' alignItems='center'>
						<Heading2>{title}</Heading2>
						{iconRender}
					</FlexRow>
					<Spacing show={!!children} margin={spacing.large.top}>
						<Spacing margin={spacing.small.bottom}>
							{children}
						</Spacing>
					</Spacing>
				</Background>
			</BoxShadow>
		</CardContainer>
	);
};

export const CardContainer = tStyled(FlexColumn)`
	position: relative;
`;

const BoxShadow = tStyled(FlexColumn)`
	box-shadow: 0 2px 8px 3px ${p => p.theme.color.bgComponentShadow1};
	overflow: hidden;
`;

const Background = tStyled.div`
	flex: 1;
	background-color: ${p => p.theme.color.bgComponent1};
	border: 1px solid ${p => p.theme.color.bgComponent3};
	border-top: none;
	padding: ${spacing.medium.value};
`;

const ColorHeader = tStyled.div`
	width: 100%;
	height: 4px;
	background: ${p => p.theme.color.accentGradient};
`;