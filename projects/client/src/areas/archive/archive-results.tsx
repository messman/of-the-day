import { spacing, Spacing, useResponsiveEdgeSpacing } from '@/core/layout/common';
import { ActionLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { FontWeight } from '@/core/style/theme';
import { ClickableIcon, iconTypes } from '@/core/symbol/icon';
import { RegularText } from '@/core/symbol/text';
import { Flex, FlexRow, Sticky, useSticky } from '@messman/react-common';
import { IArchiveFilter, isFilterSemanticallyEqual, isFilterSortSemanticallyEqual } from 'oftheday-shared';
import * as React from 'react';
import { postsTestData } from '../posts/posts-test';
import { FilterDescription } from './filter/filter-common';
import { ArchiveResult } from './result/archive-result';

export interface ArchiveResultsProps {
	filter: IArchiveFilter;
	onClickEditFilter: () => void;
	offsetPixels: number;
	rootElement: HTMLElement | null;
	onScrollTop: () => void;
}

export const ArchiveResults: React.FC<ArchiveResultsProps> = (props) => {
	const { filter } = props;

	const edgeSpacing = useResponsiveEdgeSpacing();
	const [localFilter, setLocalFilter] = React.useState(filter);
	const [requests, setRequests] = React.useState(0);
	const [renders, setRenders] = React.useState(0);

	React.useEffect(() => {
		if (localFilter === filter) {
			return;
		}
		const isEqual = isFilterSemanticallyEqual(filter, localFilter);
		const isSortEqual = isFilterSortSemanticallyEqual(filter, localFilter);
		setLocalFilter(filter);

		if (!isEqual) {
			setRequests(p => p + 1);
			setRenders(p => p + 1);
		}
		else if (!isSortEqual) {
			setRenders(p => p + 1);
		}
	}, [filter]);

	console.log(requests, renders);

	const posts = postsTestData;

	const postsRender = posts.map((post) => {
		return (
			<ArchiveResult post={post} key={post.dayNumber} />
		);
	});

	let postsCount: number | null = null;
	let resultsCount: number | null = null;
	if (posts) {
		postsCount = posts.length;
		resultsCount = 0;
		posts.forEach((post) => {
			resultsCount! += [post.music, post.video, post.image, post.quote, post.custom].filter((x) => !!x).length;
		});
	}

	return (
		<>
			<ArchiveResultsHeader {...props} resultsCount={resultsCount} />
			<Spacing margin={edgeSpacing.horizontal}>
				<Spacing margin={spacing.large.vertical}>
					<FilterDescription filter={filter} />
					<RegularText margin={spacing.medium.top}>
						Showing
					<RegularText isInline={true} fontWeight={FontWeight.bold}>&nbsp;{resultsCount}&nbsp;</RegularText>
							items across
								<RegularText isInline={true} fontWeight={FontWeight.bold}>&nbsp;{postsCount}&nbsp;</RegularText>
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