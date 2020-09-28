import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FlexRow, useWindowLayout } from '@messman/react-common';
import * as React from 'react';
import { Spacing, spacing } from '../layout/common';
import { borderRadiusStyle, borderRadiusValue } from '../style/common';
import { tStyled } from '../style/styled';
import { Icon, SVGIconType } from '../symbol/icon';
import { FontSize, Heading1 } from '../symbol/text';

interface CardProps {
	title: string;
	icon: SVGIconType | null;
}

export const Card: React.FC<CardProps> = (props) => {
	const { title, icon, children } = props;

	const { widthBreakpoint } = useWindowLayout();
	let iconRender: JSX.Element | null = null;
	if (icon && widthBreakpoint >= LayoutBreakpoint.mobileRegular) {
		iconRender = (
			<Icon type={icon} height={FontSize.heading1} fillColor={c => c.textHeading1} />
		);
	}

	return (
		<Container>
			<ColorHeader />
			<Background>
				<FlexRow justifyContent='space-between'>
					<Heading1>{title}</Heading1>
					<Heading1>{iconRender}</Heading1>
				</FlexRow>
				<Spacing show={!!children} margin={spacing.large.top}>
					<Spacing margin={spacing.medium.bottom}>
						{children}
					</Spacing>
				</Spacing>
			</Background>
		</Container>
	);
};

const Container = tStyled.div`
	position: relative;
	${borderRadiusStyle}
	overflow: hidden;
	box-shadow: 0 2px 8px 0 ${p => p.theme.color.bgComponentShadow1};
`;

const Background = tStyled.div`
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