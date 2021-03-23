import { Block, Spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { IconSize, SizedIcon, SVGIconType } from '@/core/symbol/icon';
import { Heading3 } from '@/core/symbol/text';
import { FlexColumn, FlexRow } from '@messman/react-common';
import { IPost } from 'oftheday-shared';
import * as React from 'react';

export interface PostElementProps {
	post: IPost;
	isForArchive: boolean;
	hideTitle: boolean;
}

export interface PostElementCardProps extends PostElementProps {
	elementTitleName: string | null;
	icon: SVGIconType | null;
}

export const PostElementCard: React.FC<PostElementCardProps> = (props) => {
	const { elementTitleName, isForArchive, hideTitle, post, icon, children } = props;

	let subtitleRender: JSX.Element | null = null;
	if (isForArchive && post) {
		const { date, dayNumber } = post;

		subtitleRender = <>{date}&nbsp;&middot;&nbsp;Day {dayNumber}</>;
	}

	const optionalTitle = hideTitle ? null : elementTitleName;

	return (
		<CardContainer>
			<Background>
				<TopCardPadding>
					<Title title={optionalTitle} icon={icon} />
					{subtitleRender}
				</TopCardPadding>
				<Block.Elf24 />
				{children}
				<Block.Dog16 />
			</Background>
		</CardContainer>
	);
};

const CardContainer = tStyled(FlexColumn)`
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


