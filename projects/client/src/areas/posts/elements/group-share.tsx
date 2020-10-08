import * as React from 'react';
import { IPost, IPostCustom, IPostImage, IPostMusic, IPostQuote, IPostVideo } from 'oftheday-shared';
import { CardGroup } from '@/core/card/card-group';
import { ColumnCardFlow, useMaximumRowChildren } from '@/core/card/card-flow';
import { CardContainer } from '@/core/card/card';
import { ApplicationMaxWidth, useResponsiveEdgeSpacing } from '@/core/layout/common';
import { Music } from './music';
import { Video } from './video';
import { Image } from './image';
import { Quote } from './quote/quote';
import { Custom } from './custom';
import { PostsElementFC } from './elements-common';
import { tStyled } from '@/core/style/styled';
import { Flex, FlexRow } from '@messman/react-common';

interface PostProps {
	post: IPost;
}

export const ShareGroup: React.FC<PostProps> = (props) => {
	const { post } = props;

	const maximumRowChildren = Math.min(useMaximumRowChildren(), 2);
	const spacingBetween = useResponsiveEdgeSpacing();

	let cardFlowRender: JSX.Element = null!;
	if (maximumRowChildren === 1) {
		// Easy case - render as each item on its own row.
		cardFlowRender = (
			<ColumnCardFlow $spacing={spacingBetween.value}>
				<Music value={post.music} />
				<Video value={post.video} />
				<Image value={post.image} />
				<Quote value={post.quote} />
				<Custom value={post.custom} />
			</ColumnCardFlow>
		);
	}
	else {
		const music: ComponentTuple<IPostMusic> = [Music, post.music];
		const video: ComponentTuple<IPostVideo> = [Video, post.video];
		const image: ComponentTuple<IPostImage> = [Image, post.image];
		const quote: ComponentTuple<IPostQuote> = [Quote, post.quote];
		const custom: ComponentTuple<IPostCustom> = [Custom, post.custom];

		const hasQuoteAndCustom = !!post.quote && !!post.custom;

		const leftColumn: ComponentTuple<any>[] = [];
		const rightColumn: ComponentTuple<any>[] = [];

		[music, video, image, quote, custom].forEach((tuple) => {
			const value = tuple[1];
			if (value) {
				if (hasQuoteAndCustom && tuple === custom && leftColumn.length === rightColumn.length) {
					// Special case - we are rendering both quote and custom, the quote has already been placed, and the columns are roughly equal.
					// Because the custom and quote components are both small, in this case, put the custom in the same column as the quote.
					rightColumn.push(tuple);
				}
				else {
					// Normal behavior - split amongst the columns.
					const column = leftColumn.length === rightColumn.length ? leftColumn : rightColumn;
					column.push(tuple);
				}
			}
		});

		cardFlowRender = (
			<RowToColumnCardFlow $spacing={spacingBetween.value}>
				<ColumnFromRowCardFlow $spacing={spacingBetween.value}>
					<ShareGroupColumn postsElements={leftColumn} />
				</ColumnFromRowCardFlow>
				<ColumnFromRowCardFlow $spacing={spacingBetween.value}>
					<ShareGroupColumn postsElements={rightColumn} />
				</ColumnFromRowCardFlow>
			</RowToColumnCardFlow>
		);
	}

	return (
		<CardGroup isAutoAlternateBackground={true}>
			<ApplicationMaxWidth>
				{cardFlowRender}
			</ApplicationMaxWidth>
		</CardGroup>
	);
};

type ComponentTuple<T> = [PostsElementFC<T>, T | undefined];

interface ShareGroupColumnProps {
	postsElements: ComponentTuple<any>[];
}

const ShareGroupColumn: React.FC<ShareGroupColumnProps> = (props) => {
	const { postsElements } = props;

	let postsElementsRender = postsElements.map((tuple) => {
		const [Component, value] = tuple;
		return <Component value={value} key={Component.element} />;
	});

	return (
		<>
			{postsElementsRender}
		</>
	);
};

interface RowToColumnProps {
	$spacing: string;
}

const ColumnFromRowCardFlow = tStyled(Flex) <RowToColumnProps>`
	${CardContainer} + ${CardContainer} {
		margin-top: ${p => p.$spacing};
	}
`;

const RowToColumnCardFlow = tStyled(FlexRow) <RowToColumnProps>`
	margin: 0 ${p => p.$spacing};

	${ColumnFromRowCardFlow} {
		margin-left: ${p => p.$spacing}; 
	}

	${ColumnFromRowCardFlow}:first-child {
		margin-left: 0;
	}
`;