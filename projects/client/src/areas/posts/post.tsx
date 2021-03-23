import { IPost, IPostElementType, isValidPostElement } from 'oftheday-shared';
import * as React from 'react';
import { Custom } from '@/areas/posts/elements/custom';
import { Image } from '@/areas/posts/elements/image';
import { Music } from '@/areas/posts/elements/music';
import { Quote } from '@/areas/posts/elements/quote/quote';
import { Video } from '@/areas/posts/elements/video';
import { tStyled } from '@/core/style/styled';
import { InlineWeight, Paragraph } from '@/core/symbol/text';
import { Personal } from './elements/personal';

interface PostProps {
	post: IPost;
	hideTitles: boolean;
	isForArchive: boolean;
}

/** Shows a post. Renders all the subcomponents (elements). */
export const Post: React.FC<PostProps> = (props) => {
	const { post, hideTitles, isForArchive } = props;

	return (
		<PostElementsContainer>
			<Personal isForArchive={isForArchive} post={post} hideTitle={hideTitles} />
			<Music isForArchive={isForArchive} post={post} hideTitle={hideTitles} />
			<Video isForArchive={isForArchive} post={post} hideTitle={hideTitles} />
			<Image isForArchive={isForArchive} post={post} hideTitle={hideTitles} />
			<Quote isForArchive={isForArchive} post={post} hideTitle={hideTitles} />
			<Custom isForArchive={isForArchive} post={post} hideTitle={hideTitles} />
		</PostElementsContainer>
	);
};

const PostElementsContainer = tStyled.div`
	
`;

export function usePostsList(posts: IPost[], isForArchive: boolean, singleElementType: IPostElementType | null) {
	return React.useMemo(() => {
		return posts.map((post) => {
			return (
				<Post post={post} key={post.dayNumber} isForArchive={isForArchive} hideTitles={singleElementType !== null} />
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
			<InlineWeight.Bold>{elementsCount} </InlineWeight.Bold>
			<span>{elementsCount === 1 ? 'item' : 'items'} across </span>
			<InlineWeight.Bold>{postsCount} </InlineWeight.Bold>
			<span>{postsCount === 1 ? 'day' : 'days'}.</span>
		</Paragraph>
	);
};