import { IPost, IPostElementType } from 'oftheday-shared';
import * as React from 'react';
import { Custom } from '@/areas/posts/elements/custom';
import { Image } from '@/areas/posts/elements/image';
import { Music } from '@/areas/posts/elements/music';
import { Quote } from '@/areas/posts/elements/quote/quote';
import { Video } from '@/areas/posts/elements/video';
import { CardContainer } from '@/core/card/card';
import { Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';

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
			<Music value={post.music} isForArchive={isForArchive} archivePost={post} hideTitle={hideTitles} />
			<Video value={post.video} isForArchive={isForArchive} archivePost={post} hideTitle={hideTitles} />
			<Image value={post.image} isForArchive={isForArchive} archivePost={post} hideTitle={hideTitles} />
			<Quote value={post.quote} isForArchive={isForArchive} archivePost={post} hideTitle={hideTitles} />
			<Custom value={post.custom} isForArchive={isForArchive} archivePost={post} hideTitle={hideTitles} />
		</PostElementsContainer>
	);
};

const PostElementsContainer = tStyled.div`
	${CardContainer} {
		margin-top: ${Spacing.elf24};
	}
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