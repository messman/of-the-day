import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Music } from '@/areas/posts/elements/music';
import { Video } from '@/areas/posts/elements/video';
import { Image } from '@/areas/posts/elements/image';
import { Quote } from '@/areas/posts/elements/quote/quote';
import { Custom } from '@/areas/posts/elements/custom';
import { Spacing, useResponsiveEdgeSpacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { CardContainer } from '@/core/card/card';

export interface ArchiveResultProps {
	post: IPost;
	hideTitles: boolean;
}

export const ArchiveResult: React.FC<ArchiveResultProps> = (props) => {
	const { post, hideTitles } = props;

	const edgeSpacing = useResponsiveEdgeSpacing();

	return (
		<ArchiveResultContainer $spacing={edgeSpacing}>
			<Music value={post.music} isForArchive={true} archivePost={post} hideTitle={hideTitles} />
			<Video value={post.video} isForArchive={true} archivePost={post} hideTitle={hideTitles} />
			<Image value={post.image} isForArchive={true} archivePost={post} hideTitle={hideTitles} />
			<Quote value={post.quote} isForArchive={true} archivePost={post} hideTitle={hideTitles} />
			<Custom value={post.custom} isForArchive={true} archivePost={post} hideTitle={hideTitles} />
		</ArchiveResultContainer>
	);
};

interface ArchiveResultContainerProps {
	$spacing: Spacing;
}

const ArchiveResultContainer = tStyled.div<ArchiveResultContainerProps>`
	${CardContainer} {
		margin-top: ${p => p.$spacing.value};
	}
`;