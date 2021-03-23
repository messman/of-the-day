import { Block, contentMaxWidthValue, Spacing } from '@/core/layout/common';
import { ActionLink, OutLink } from '@/core/link';
import { EmptySpaceHack } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { ClickableIcon, iconTypes } from '@/core/symbol/icon';
import { fontDeclarations, InlineWeight, Paragraph } from '@/core/symbol/text';
import { useMeta } from '@/services/data/data-context';
import { DataLoad } from '@/services/data/data-load';
import { Flex, FlexRow, PromiseOutput, Sticky, useSticky } from '@messman/react-common';
import { IArchiveFilter, IArchiveResponse, IPost, IPostElementType, keysOfIPostElementType } from 'oftheday-shared';
import * as React from 'react';
import { PostElementsCountSummary, usePostsList, useValidatedPosts } from '../posts/post';
import { FilterDescription } from './filter/filter-common';

export interface ArchiveResultsProps {
	filter: IArchiveFilter;
	promise: PromiseOutput<IArchiveResponse>;
	onClickEditFilter: () => void;
	offsetPixels: number;
	rootElement: HTMLElement | null;
	onScrollToHeader: () => void;
}

/**
 * Shows the results view for the archives, including the header and description.
 */
export const ArchiveResults: React.FC<ArchiveResultsProps> = (props) => {
	const { filter, promise } = props;
	const { data, isStarted, error } = promise;

	const meta = useMeta();
	let posts: IPost[] = [];
	if (data && meta && !meta.shutdown.length) {
		posts = data.posts;
	}
	const { validPosts, elementsCount } = useValidatedPosts(posts, false);

	const [singleElementType, setSingleElementType] = React.useState<IPostElementType | null>(null);

	// When we get a new filter, figure out if it's a filter that only has one type of element (music, video) selected.
	// If so, we can hide titles in the cards to remove redundancy.
	React.useEffect(() => {
		const activeFilterTypes = keysOfIPostElementType.filter((key) => {
			return !!filter.types[key];
		});
		if (activeFilterTypes.length === 1) {
			const activeFilterType = activeFilterTypes[0];
			setSingleElementType(IPostElementType[activeFilterType]);
		}
		else {
			setSingleElementType(null);
		}
	}, [filter]);

	// I'm not sure yet if this is a good idea or something that will cause a bug.
	// but, only re-render our posts (there could be hundreds) if those posts really change.
	const postsRender = usePostsList(validPosts, true, singleElementType);

	if (isStarted || error) {
		return <DataLoad promise={promise} />;
	}

	// When we get the meta information (it is loaded during requests) we can update with links to playlists.
	let metaPlaylistRender: JSX.Element | null = null;
	const isMusicOnly = singleElementType === IPostElementType.music;
	const isVideoOnly = singleElementType === IPostElementType.video;
	if (meta && ((isMusicOnly && meta.spotifyLink) || (isVideoOnly && meta.youTubeLink))) {
		if (isMusicOnly) {
			metaPlaylistRender = (
				<Paragraph>
					You can view all songs on <OutLink href={meta.spotifyLink}>this Spotify Playlist</OutLink>.
				</Paragraph>
			);
		}
		else {
			metaPlaylistRender = (
				<Paragraph>
					You can view all videos on <OutLink href={meta.youTubeLink}>this YouTube Playlist</OutLink>.
				</Paragraph>
			);
		}
	}

	return (
		<ArchiveResultsContainer>
			<ArchiveResultsHeader {...props} resultsCount={elementsCount} />
			<ArchiveResultsContentContainer>
				<Block.Elf24 />
				<FilterDescription filter={filter} />
				<PostElementsCountSummary
					elementsCount={elementsCount}
					postsCount={validPosts.length}
				/>
				{metaPlaylistRender}
			</ArchiveResultsContentContainer>
			{postsRender}
		</ArchiveResultsContainer>
	);
};

// No padding here, since we have a full-width header inside.
const ArchiveResultsContainer = tStyled.div`
	max-width: ${contentMaxWidthValue};
	margin: auto;
`;

const ArchiveResultsContentContainer = tStyled.div`
	margin: 0 ${Spacing.dog16};
`;

interface ArchiveResultsHeaderProps extends ArchiveResultsProps {
	resultsCount: number | null;
}

/**
 * Header for the archive results. Sticky, so it scrolls with the screen.
 * Shows the number of items, a button to scroll to top, and a button to edit the filter.
 */
export const ArchiveResultsHeader: React.FC<ArchiveResultsHeaderProps> = (props) => {
	const { rootElement, onScrollToHeader, onClickEditFilter, offsetPixels, resultsCount } = props;

	const stickyOutput = useSticky({
		rootElement: rootElement,
		offsetPixels: offsetPixels
	});
	const { isAtFirst } = stickyOutput;

	return (
		<>
			<Sticky isSticky={true} output={stickyOutput} zIndex={1} >
				<EmptySpaceHack height={offsetPixels} showBackground={isAtFirst} />
				<ArchiveResultsHeaderContainer flex='none' justifyContent='space-between' alignItems='center'>
					<Flex>
						<LeftResultsCountText>
							<InlineWeight.Bold>{resultsCount} </InlineWeight.Bold>
							<span>{resultsCount === 1 ? 'item' : 'items'}</span>
						</LeftResultsCountText>
					</Flex>
					<Flex>
						<TextCenter>
							<ActionLink onClick={onClickEditFilter}>Edit Filter</ActionLink>
						</TextCenter>
					</Flex>
					<Flex>
						<RightScrollIconContainer>
							<ClickableIcon type={iconTypes.top} isDisabled={!isAtFirst} onClick={onScrollToHeader} />
						</RightScrollIconContainer>
					</Flex>
				</ArchiveResultsHeaderContainer>
			</Sticky>
		</>
	);
};

const ArchiveResultsHeaderContainer = tStyled(FlexRow)`
	position: relative;
	padding: ${Spacing.bat08} 0;
	border-bottom: 1px solid ${p => p.theme.outlineDistinct};
	background-color: ${p => p.theme.bg};
`;

const LeftResultsCountText = tStyled.div`
	${fontDeclarations.regular};
	margin-left: ${Spacing.dog16};
`;

const TextCenter = tStyled.div`
	text-align: center;
`;

const RightScrollIconContainer = tStyled.div`
	text-align: right;
	margin-right: ${Spacing.dog16};
`;