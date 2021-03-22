import { FlexColumn, FlexRow } from '@messman/react-common';
import * as React from 'react';
import { Block, Spacing } from '../layout/common';
import { borderRadiusStyle } from '../style/common';
import { tStyled } from '../style/styled';
import { IconSize, SizedIcon, SVGIconType } from '../symbol/icon';
import { Heading3, RegularText } from '../symbol/text';

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
	overflow: hidden;
	border: 1px solid ${p => p.theme.outlineDistinct};
	background-color: ${p => p.theme.subtleFill.b1Card};
	box-shadow: ${p => p.theme.shadow.b1Card};
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
		<SizedIcon type={icon} size={IconSize.b_large} />
	) : null;

	return (
		<FlexRow justifyContent='space-between' alignItems='center'>
			<Heading3>{title}</Heading3>
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