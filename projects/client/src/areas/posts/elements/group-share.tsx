import * as React from 'react';
import { IPost } from 'oftheday-shared';
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
				<Music post={post} />
				<Video post={post} />
				<Image post={post} />
				<Quote post={post} />
				<Custom post={post} />
			</ColumnCardFlow>
		);
	}
	else {
		const leftColumn: PostsElementFC[] = [];
		const rightColumn: PostsElementFC[] = [];

		let nonNullCounter = 0;
		// The larger components are split up first.
		[Music, Video, Image].forEach((Component) => {
			if (nonNullCounter % 2 === 0) {
				leftColumn.push(Component);
			}
			else {
				rightColumn.push(Component);
			}

			if (Component.shouldRender(post)) {
				nonNullCounter++;
			}
		});

		// If we've rendered 0 or 2 of the larger components, split the quote and custom.
		// Otherwise, combine them to achieve better balance.
		// If this were higher-stakes, we'd actually record heights, etc.
		const splitSmallerPieces = nonNullCounter % 2 === 0;
		if (nonNullCounter % 2 === 0) {
			leftColumn.push(Quote);
			leftColumn.push(Quote);
		}

		[Quote, Custom].forEach((Component) => {
			if (nonNullCounter % 2 === 0) {
				leftColumn.push(Component);
			}
			else {
				rightColumn.push(Component);
			}

			if (Component.shouldRender(post) && splitSmallerPieces) {
				nonNullCounter++;
			}
		});

		cardFlowRender = (
			<RowToColumnCardFlow $spacing={spacingBetween.value}>
				<ColumnFromRowCardFlow $spacing={spacingBetween.value}>
					<ShareGroupColumn post={post} postsElements={leftColumn} />
				</ColumnFromRowCardFlow>
				<ColumnFromRowCardFlow $spacing={spacingBetween.value}>
					<ShareGroupColumn post={post} postsElements={rightColumn} />
				</ColumnFromRowCardFlow>
			</RowToColumnCardFlow>
		);
	}

	return (
		<CardGroup>
			<ApplicationMaxWidth>
				{cardFlowRender}
			</ApplicationMaxWidth>
		</CardGroup>
	);
};

interface ShareGroupColumnProps {
	post: IPost;
	postsElements: PostsElementFC[];
}

const ShareGroupColumn: React.FC<ShareGroupColumnProps> = (props) => {
	const { post, postsElements } = props;

	let postsElementsRender = postsElements.map((Component) => {
		return <Component post={post} key={Component.element} />;
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