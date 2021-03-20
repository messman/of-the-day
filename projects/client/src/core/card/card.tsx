import { FlexColumn, FlexRow } from '@messman/react-common';
import * as React from 'react';
import { Block, Spacing } from '../layout/common';
import { borderRadiusStyle } from '../style/common';
import { tStyled } from '../style/styled';
import { Icon, SVGIconType } from '../symbol/icon';
import { FontSize, Heading2, RegularText } from '../symbol/text';

export interface CardProps {
	title?: string | null;
	subtitle?: JSX.Element | string | null;
	icon?: SVGIconType | null;
}

export const Card: React.FC<CardProps> = (props) => {
	const { title, subtitle, icon, children } = props;

	const subtitleMarginTop = title && subtitle ? <Block.Bat08 /> : null;
	const subtitleRender = subtitle ? (
		<>
			{subtitleMarginTop}
			<RegularText>{subtitle}</RegularText>
		</>
	) : null;

	const childrenRender = children ? (
		<>
			<Block.Elf24 />
			{children}
			<Block.Dog16 />
		</>
	) : null;

	return (
		<CardContainer>
			<Background>
				<TopCardPadding>
					<Title title={title} icon={icon} />
					{subtitleRender}
				</TopCardPadding>
				{childrenRender}
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
	padding: ${Spacing.dog16};
`;

const TopCardPadding = tStyled.div`
	padding: ${Spacing.dog16};
	padding-bottom: 0;
`;

interface TitleProps {
	title?: string | null;
	icon?: SVGIconType | null;
}

const Title: React.FC<TitleProps> = (props) => {
	const { title, icon } = props;
	if (!title) {
		return null;
	}

	const iconRender = icon ? (
		<Icon type={icon} height={FontSize.heading2} fillColor={c => c.textHeading2} />
	) : null;

	return (
		<FlexRow justifyContent='space-between' alignItems='center'>
			<Heading2>{title}</Heading2>
			{iconRender}
		</FlexRow>
	);
};

export const SubtleCard: React.FC<CardProps> = (props) => {
	const { title, children } = props;

	const childrenRender = children ? (
		<>
			<Block.Bat08 />
			{children}
		</>
	) : null;

	return (
		<CardContainer>
			<TopCardPadding>
				<Title title={title} />
			</TopCardPadding>
			{childrenRender}
		</CardContainer>
	);
};