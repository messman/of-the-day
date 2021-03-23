import { Block, Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { FontWeight } from '@/core/style/theme';
import { IconSize, SizedIcon, SVGIconType } from '@/core/symbol/icon';
import { fontDeclarations, SmallText } from '@/core/symbol/text';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { Flex, FlexRow, useWindowMediaLayout } from '@messman/react-common';
import { IPost, IPostDayReference } from 'oftheday-shared';
import * as React from 'react';

export interface PostElementProps {
	post: IPost;
	isOfSameElement: boolean;
	isForArchive: boolean;
}

export interface PostElementCardProps extends PostElementProps {
	icon: SVGIconType;
	title: string | null;
	actionsRender: JSX.Element;
}

export const PostElementCard: React.FC<PostElementCardProps> = (props) => {
	const { icon, title, post, actionsRender, isOfSameElement } = props;

	const { widthBreakpoint } = useWindowMediaLayout();
	// This is everything from 0rem to 30rem (480px). Pretty much all mobile.
	const isCompactView = widthBreakpoint <= LayoutBreakpointRem.b20Min;

	const contentRender = <PostElementCardContent {...props} />;

	/*
		Usually, a title is required.
		But in compact view, with 'is of same element', you might not want to
		show the title for 'Image' or 'Quote'.

	*/
	const titleRender = title ? (
		<CardTitleDistinct>{title}</CardTitleDistinct>
	) : null;

	if (isCompactView) {
		return (
			<CompactContainer>
				<FlexRow justifyContent='space-between' alignItems='center'>
					<Flex>
						<SizedIcon type={icon} size={IconSize.b_large} />
					</Flex>
					<FlexRow justifyContent='flex-end' alignItems='center'>
						<PostDate post={post} />
						<Block.Elf24 />
						{actionsRender}
					</FlexRow>
				</FlexRow>
				<Block.Dog16 />
				{titleRender}
				{contentRender}
			</CompactContainer>
		);
	}
	else {

		const leftIcon = !isOfSameElement ? (
			<>
				<SizedIcon type={icon} size={IconSize.b_large} />
				<Block.Dog16 />
			</>
		) : null;

		return (
			<Container>
				<FlexRow>
					{leftIcon}
					<Flex>
						<div>
							<FloatItem alignItems='center' flex='none'>
								<Block.Elf24 />
								<PostDate post={post} />
								<Block.Elf24 />
								{actionsRender}
							</FloatItem>
							{titleRender}
						</div>
						<FloatClear />
						{contentRender}
					</Flex>
				</FlexRow>
			</Container>
		);
	}
};

// NOTE: This component uses React.memo for optimization.
const PostElementCardContent: React.FC<PostElementCardProps> = React.memo((props) => {
	const { children } = props;

	return (
		<>
			{children}
		</>
	);
});

const CompactContainer = tStyled.div`
	border-top: 4px solid ${p => p.theme.outlineDistinct};
	padding: ${Spacing.dog16};
	padding-bottom: ${Spacing.elf24};
`;

const Container = tStyled.div`
	border-top: 4px solid ${p => p.theme.outlineDistinct};
	padding: ${Spacing.dog16};
	padding-bottom: ${Spacing.elf24};
`;

export const CardTitle = tStyled.div`
	${fontDeclarations.heading3};
	color: ${p => p.theme.textSubtle};
	line-height: ${IconSize.b_large};
`;

export const CardTitleDistinct = tStyled.div`
	${fontDeclarations.heading3};
	color: ${p => p.theme.textDistinct};
	line-height: ${IconSize.b_large};
`;

export const CardTitleDistinctSpan = tStyled.span`
	display: inline;
	font-weight: ${FontWeight.bold};
	color: ${p => p.theme.textDistinct};
`;

const FloatItem = tStyled(FlexRow)`
	float: right;
`;

const FloatClear = tStyled.div`
	clear: both;
`;

interface PostDateProps {
	post: IPost;
}

const PostDate: React.FC<PostDateProps> = (props) => {
	const { post } = props;
	const { date, dayNumber, dateText, dayReference } = post;

	let dayReferenceString = dateText;
	if (dayReference !== IPostDayReference.other) {
		dayReferenceString = dayReferencesText[IPostDayReference[dayReference] as keyof typeof IPostDayReference];
	}

	const title = `${date} - Day ${dayNumber}`;
	return (
		<SmallText title={title}>{dayReferenceString}</SmallText>
	);
};

const dayReferencesText: Record<keyof typeof IPostDayReference, string> = {
	other: '',
	future: 'Future',
	today: 'Today',
	yesterday: 'Yesterday'
};