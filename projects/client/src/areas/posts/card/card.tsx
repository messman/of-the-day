import { Block, Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { FontWeight } from '@/core/style/theme';
import { IconSize, iconTypes, SizedIcon, SVGIconType } from '@/core/symbol/icon';
import { fontDeclarations, SmallText } from '@/core/symbol/text';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { FlexRow, useWindowMediaLayout } from '@messman/react-common';
import { IPost, IPostDayReference } from 'oftheday-shared';
import * as React from 'react';

export interface PostElementProps {
	post: IPost;
	isForArchive: boolean;
	hideTitle: boolean;
}

export interface PostElementCardProps extends PostElementProps {
	icon: SVGIconType | null;
}

export const PostElementCard: React.FC<PostElementCardProps> = (props) => {
	const { post, icon } = props;

	const { widthBreakpoint } = useWindowMediaLayout();
	// This is everything from 0rem to 30rem (480px). Pretty much all mobile.
	const isCompactView = widthBreakpoint <= LayoutBreakpointRem.b20Min;

	const contentRender = <PostElementCardContent {...props} />;

	let render: JSX.Element = null!;
	if (isCompactView) {
		render = (
			<>
				<FlexRow>
					<Block.Dog16 />
					<SizedIcon type={icon || iconTypes.alert} size={IconSize.b_large} />
					<PostDate isCompactView={isCompactView} post={post} />
					<Block.Dog16 />
				</FlexRow>
				<Block.Dog16 />
				<SidePadding>
					{contentRender}
				</SidePadding>
			</>
		);
	}
	else {
		render = (
			<SidePadding>
				<PostDate isCompactView={isCompactView} post={post} />
				<FlexRow>
					<SizedIcon type={icon || iconTypes.alert} size={IconSize.b_large} />
					<Block.Dog16 />
					<div>
						{contentRender}
					</div>
				</FlexRow>
			</SidePadding>
		);
	}

	return (
		<Container>
			{render}
			<Block.Elf24 />
		</Container>
	);
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

const Container = tStyled.div`
	border-top: 1px solid ${p => p.theme.outlineDistinct};
	padding-top: ${Spacing.dog16};
`;

const SidePadding = tStyled.div`
	padding: 0 ${Spacing.dog16};
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

interface PostDateProps {
	isCompactView: boolean;
	post: IPost;
}

const PostDate: React.FC<PostDateProps> = (props) => {
	const { isCompactView, post } = props;
	const { date, dayNumber, dateText, dayReference } = post;

	let dayReferenceString = dateText;
	if (dayReference !== IPostDayReference.other) {
		dayReferenceString = dayReferencesText[IPostDayReference[dayReference] as keyof typeof IPostDayReference];
	}

	if (dayReferenceString) {
		return null;
	}

	let render: JSX.Element = null!;
	if (isCompactView) {
		render = (
			<div title={date}>
				<SmallText>{dayReferenceString}</SmallText>
				<Block.Ant04 />
				<SmallText>Day {dayNumber}</SmallText>
			</div>
		);
	}
	else {
		render = (
			<SmallText title={date}>
				{dayReferenceString}&nbsp;&middot;&nbsp;Day {dayNumber}
			</SmallText>
		);
	}

	return (
		<FlexRow justifyContent='flex-end'>
			{render}
		</FlexRow>
	);
};

const dayReferencesText: Record<keyof typeof IPostDayReference, string> = {
	other: '',
	tomorrow: 'Tomorrow',
	today: 'Today',
	yesterday: 'Yesterday'
};