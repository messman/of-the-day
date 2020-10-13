import { spacing, Spacing, useResponsiveEdgeSpacing } from '@/core/layout/common';
import { ActionLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { FontWeight } from '@/core/style/theme';
import { ClickableIcon, iconTypes } from '@/core/symbol/icon';
import { RegularText } from '@/core/symbol/text';
import { DataLoad } from '@/services/data/data-load';
import { Flex, FlexRow, PromiseOutput, Sticky, useSticky } from '@messman/react-common';
import { IArchiveFilter, IArchiveResponse, IPost, keysOfIPostElementType } from 'oftheday-shared';
import * as React from 'react';
import { FilterDescription } from './filter/filter-common';
import { ArchiveResult } from './result/archive-result';

export interface ArchiveResultsProps {
	filter: IArchiveFilter;
	promise: PromiseOutput<IArchiveResponse>;
	onClickEditFilter: () => void;
	offsetPixels: number;
	rootElement: HTMLElement | null;
	onScrollTop: () => void;
}

interface PostsState {
	posts: IPost[];
	results: number;
}

export const ArchiveResults: React.FC<ArchiveResultsProps> = (props) => {
	const { filter, promise } = props;
	const { data, isStarted, error } = promise;

	const edgeSpacing = useResponsiveEdgeSpacing();

	const [postsState, setPostsState] = React.useState<PostsState>({
		posts: [],
		results: 0
	});

	const [isHidingTitles, setIsHidingTitles] = React.useState(false);

	React.useEffect(() => {

		const numberOfTypesInFilter = keysOfIPostElementType.filter((key) => {
			return !!filter.types[key];
		}).length;
		setIsHidingTitles(numberOfTypesInFilter === 1);
	}, [filter]);

	React.useEffect(() => {
		if (!data) {
			setPostsState({
				posts: [],
				results: 0
			});
			return;
		}
		const { posts } = data;
		let resultsCount = 0;
		posts.forEach((post) => {
			resultsCount! += [post.music, post.video, post.image, post.quote, post.custom].filter((x) => !!x).length;
		});

		setPostsState({
			posts: posts,
			results: resultsCount
		});
	}, [data]);

	const { posts, results } = postsState;

	const postsRender = React.useMemo(() => {
		return posts.map((post) => {
			return (
				<ArchiveResult post={post} key={post.dayNumber} hideTitles={isHidingTitles} />
			);
		});
	}, [posts, isHidingTitles]);

	if (isStarted || error) {
		return <DataLoad promise={promise} />;
	}

	return (
		<>
			<ArchiveResultsHeader {...props} resultsCount={results} />
			<Spacing margin={edgeSpacing.horizontal}>
				<Spacing margin={spacing.large.vertical}>
					<FilterDescription filter={filter} />
					<RegularText margin={spacing.medium.top}>
						Showing
					<RegularText isInline={true} fontWeight={FontWeight.bold}>&nbsp;{results}&nbsp;</RegularText>
							items across
								<RegularText isInline={true} fontWeight={FontWeight.bold}>&nbsp;{posts.length}&nbsp;</RegularText>
							days
						</RegularText>
				</Spacing>
				{postsRender}
			</Spacing>
		</>
	);
};

interface ArchiveResultsHeaderProps extends ArchiveResultsProps {
	resultsCount: number | null;
}

export const ArchiveResultsHeader: React.FC<ArchiveResultsHeaderProps> = (props) => {
	const { rootElement, onScrollTop, onClickEditFilter, offsetPixels, resultsCount } = props;

	const stickyOutput = useSticky({
		rootElement: rootElement
	});
	const { isAtFirst } = stickyOutput;

	return (
		<>
			<Sticky isSticky={true} output={stickyOutput} zIndex={1} >
				<ArchiveResultsHeaderEmptySpace dataHeightPixels={offsetPixels} />
				<ArchiveResultsHeaderContainer flex='none' justifyContent='space-between' alignItems='center'>
					<Flex>
						<Spacing margin={spacing.medium.left}>
							<RegularText>
								<RegularText isInline={true} fontWeight={FontWeight.bold}>{resultsCount}&nbsp;</RegularText>
							Items
						</RegularText>
						</Spacing>
					</Flex>
					<Flex>
						<Spacing textAlign='center'>
							<ActionLink onClick={onClickEditFilter}>Edit Filter</ActionLink>
						</Spacing>
					</Flex>
					<Flex>
						<Spacing textAlign='right' margin={spacing.medium.right}>

							<ClickableIcon type={iconTypes.top} isDisabled={!isAtFirst} onClick={onScrollTop} />
						</Spacing>
					</Flex>
				</ArchiveResultsHeaderContainer>
			</Sticky>
			<Spacing margin={spacing.large.bottom} />
		</>
	);
};

interface ArchiveResultsHeaderEmptySpaceProps {
	dataHeightPixels: number;
}

const ArchiveResultsHeaderEmptySpace = tStyled.div<ArchiveResultsHeaderEmptySpaceProps>`
	height: ${p => p.dataHeightPixels}px;
	background-color: ${p => p.theme.color.bg1};
`;

const ArchiveResultsHeaderContainer = tStyled(FlexRow)`
	position: relative;
	padding: ${spacing.small.vertical};
	background-color: ${p => p.theme.color.bg1};
	border-bottom: 1px solid ${p => p.theme.color.bgComponent3};
`;