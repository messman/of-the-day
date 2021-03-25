import { IPost, IPostDayReference, IPostElementType, isValidPostElement } from 'oftheday-shared';
import * as React from 'react';
import { Custom } from '@/areas/posts/elements/custom';
import { Image } from '@/areas/posts/elements/image';
import { Music } from '@/areas/posts/elements/music';
import { Quote } from '@/areas/posts/elements/quote/quote';
import { Video } from '@/areas/posts/elements/video';
import { tStyled } from '@/core/style/styled';
import { EmphasizedSpan, Paragraph, ParagraphCenter } from '@/core/symbol/text';
import { Personal } from './elements/personal';
import { PostElementProps } from './card/card';

/** Shows a post. Renders all the subcomponents (elements). */
export const Post: React.FC<PostElementProps> = (props) => {
	const { post } = props;

	return (
		<PostElementsContainer>
			{post.personal ? <Personal {...props} /> : null}
			{post.music ? <Music {...props} /> : null}
			{post.video ? <Video {...props} /> : null}
			{post.image ? <Image {...props} /> : null}
			{post.quote ? <Quote {...props} /> : null}
			{post.custom ? <Custom {...props} /> : null}
		</PostElementsContainer>
	);
};

const PostElementsContainer = tStyled.div`
	
`;

export function usePostsList(posts: IPost[], isForArchive: boolean, singleElementType: IPostElementType | null, isShowingEmbeddedByDefault: boolean) {
	return React.useMemo(() => {
		return posts.map((post) => {
			return (
				<Post
					post={post}
					key={post.dayNumber}
					isForArchive={isForArchive}
					isOfSameElement={singleElementType !== null}
					isShowingEmbeddedByDefault={isShowingEmbeddedByDefault}
				/>
			);
		});
	}, [posts, singleElementType]);
}

export interface ValidatedPostsInfo {
	validPosts: IPost[];
	elementsCount: number;
	elementsCountToday: number;
}

export function useValidatedPosts(posts: IPost[], includePersonal: boolean): ValidatedPostsInfo {
	return React.useMemo(() => {
		if (posts.length === 0) {
			return {
				validPosts: [],
				elementsCount: 0,
				elementsCountToday: 0
			};
		}
		let elementsCount = 0;
		let elementsCountToday = 0;
		const validatedPosts = posts.map<IPost | null>((post) => {
			if (!post) {
				return null;
			}

			const personal = includePersonal && isValidPostElement.personal(post.personal) ? post.personal! : undefined;
			const music = isValidPostElement.music(post.music) ? post.music! : undefined;
			const video = isValidPostElement.video(post.video) ? post.video! : undefined;
			const image = isValidPostElement.image(post.image) ? post.image! : undefined;
			const quote = isValidPostElement.quote(post.quote) ? post.quote! : undefined;
			const custom = isValidPostElement.custom(post.custom) ? post.custom! : undefined;

			const elements = [personal, music, video, image, quote, custom].filter(x => !!x).length;

			if (elements === 0) {
				return null;
			}
			elementsCount += elements;
			if (post.dayReference === IPostDayReference.today) {
				elementsCountToday += elements;
			}

			return {
				...post,
				personal: personal,
				music: music,
				video: video,
				image: image,
				quote: quote,
				custom: custom
			};
		}).filter(p => !!p) as IPost[];
		return {
			validPosts: validatedPosts,
			elementsCount: elementsCount,
			elementsCountToday: elementsCountToday
		};
	}, [posts, includePersonal]);
}

export interface PostElementsCountSummaryProps {
	postsCount: number;
	elementsCount: number;
	elementsCountToday: number;
	isForArchive: boolean;
}

export const PostElementsCountSummary: React.FC<PostElementsCountSummaryProps> = (props) => {
	const { elementsCount, postsCount, elementsCountToday, isForArchive } = props;

	/*
		Here is where we change the terms/nomenclature around.
		elements => posts, posts => days.
	*/
	const elementsText = elementsCount === 1 ? 'post' : 'posts';

	if (isForArchive) {
		const daysText = postsCount === 1 ? 'day' : 'days';
		return (
			<Paragraph>
				<span>Showing </span>
				<EmphasizedSpan>{elementsCount} </EmphasizedSpan>
				<span>{elementsText} across </span>
				<EmphasizedSpan>{postsCount} </EmphasizedSpan>
				<span>{daysText}.</span>
			</Paragraph>
		);
	}

	/*
		Scenarios:

		- new posts today, and that's all there is
		- new posts today and more from other days
		- no new posts today and more from other days
		(- no new, no others - covered elsewhere)

		Grammar:
		- There are no new posts today. There are 5 posts from
			the last two weeks.
		- There are 2 new posts today.
		- There are 2 new posts today and 4 total posts from 
			the last two weeks.
	*/

	const newPostsIsAre = elementsCountToday === 1 ? 'is' : 'are';
	const newPostsPlural = elementsCountToday === 1 ? 'post' : 'posts';
	let newPostsCountRender: JSX.Element = null!;
	if (elementsCountToday === 0) {
		newPostsCountRender = <span>no </span>;
	}
	else {
		newPostsCountRender = <EmphasizedSpan>{elementsCountToday} </EmphasizedSpan>;
	}

	const newPostsRender = (
		<>
			<span>There {newPostsIsAre} </span>
			{newPostsCountRender}
			<span>new {newPostsPlural} today</span>
		</>
	);

	const slackerMessageRender = (elementsCount === 0) ? (
		<LineBreak>
			It looks like Andrew has nothing to share right now.
		</LineBreak>
	) : null;

	if (elementsCountToday === elementsCount) {
		// These new posts are the only ones.
		return (
			<ParagraphCenter>
				{newPostsRender}.
				{slackerMessageRender}
			</ParagraphCenter>
		);
	}

	const totalPostsPlural = elementsCount === 1 ? 'post' : 'posts';
	const totalPostsIsAre = elementsCount === 1 ? 'is' : 'are';
	return (
		<ParagraphCenter>
			<LineBreak>{newPostsRender}.</LineBreak>
			<span>There {totalPostsIsAre} </span>
			<EmphasizedSpan>{elementsCount} </EmphasizedSpan>
			<span>{totalPostsPlural} from the last two weeks.</span>
		</ParagraphCenter>
	);
};

// To get around that 'can't have div in p' problem
const LineBreak = tStyled.span`
	display: block;
`;