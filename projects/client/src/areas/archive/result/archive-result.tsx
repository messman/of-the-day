import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Music } from '@/areas/posts/elements/music';
import { Video } from '@/areas/posts/elements/video';
import { Image } from '@/areas/posts/elements/image';
import { Quote } from '@/areas/posts/elements/quote/quote';
import { Custom } from '@/areas/posts/elements/custom';
import { Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { CardContainer } from '@/core/card/card';

export interface ArchiveResultProps {
	post: IPost;
	hideTitles: boolean;
}

/**
 * Like a Post rendering, but only shows the valid archive elements (no notes, schedule, etc)
 * and shows them in 'archive mode', where links to archives are hidden and titles are potentially hidden too.
 */
export const ArchiveResult: React.FC<ArchiveResultProps> = (props) => {
	const { post, hideTitles } = props;

	return (
		<ArchiveResultContainer>
			<Music value={post.music} isForArchive={true} archivePost={post} hideTitle={hideTitles} />
			<Video value={post.video} isForArchive={true} archivePost={post} hideTitle={hideTitles} />
			<Image value={post.image} isForArchive={true} archivePost={post} hideTitle={hideTitles} />
			<Quote value={post.quote} isForArchive={true} archivePost={post} hideTitle={hideTitles} />
			<Custom value={post.custom} isForArchive={true} archivePost={post} hideTitle={hideTitles} />
		</ArchiveResultContainer>
	);
};

const ArchiveResultContainer = tStyled.div`
	${CardContainer} {
		margin-top: ${Spacing.elf24};
	}
`;