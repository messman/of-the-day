import { IPost, IPostElementType, isValidPostElement } from 'oftheday-shared';
import * as React from 'react';
import { Custom } from '@/areas/posts/elements/custom';
import { Image } from '@/areas/posts/elements/image';
import { Music } from '@/areas/posts/elements/music';
import { Quote } from '@/areas/posts/elements/quote/quote';
import { Video } from '@/areas/posts/elements/video';
import { tStyled } from '@/core/style/styled';
import { Paragraph } from '@/core/symbol/text';
import { Personal } from './elements/personal';
import { PostElementProps } from './card/card';
import { FontWeight } from '@/core/style/theme';

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
}

export function useValidatedPosts(posts: IPost[], includePersonal: boolean): ValidatedPostsInfo {
	return React.useMemo(() => {
		if (posts.length === 0) {
			return {
				validPosts: [],
				elementsCount: 0
			};
		}
		let elementsCount = 0;
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
			elementsCount: elementsCount
		};
	}, [posts, includePersonal]);
}

export interface PostElementsCountSummaryProps {
	postsCount: number;
	elementsCount: number;
}

export const PostElementsCountSummary: React.FC<PostElementsCountSummaryProps> = (props) => {
	const { elementsCount, postsCount } = props;
	return (
		<Paragraph>
			<span>Showing </span>
			<EmphasizedCountValue>{elementsCount} </EmphasizedCountValue>
			<span>{elementsCount === 1 ? 'item' : 'items'} across </span>
			<EmphasizedCountValue>{postsCount} </EmphasizedCountValue>
			<span>{postsCount === 1 ? 'day' : 'days'}.</span>
		</Paragraph>
	);
};

const EmphasizedCountValue = tStyled.span`
	color: ${p => p.theme.textDistinct};
	font-weight: ${FontWeight.medium};
`;