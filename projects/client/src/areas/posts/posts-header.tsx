import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { IPost } from 'oftheday-shared';
import { FontSize, Heading1, SmallText } from '@/core/symbol/text';
import { FlexRow, Sticky, useSticky, useWindowLayout } from '@messman/react-common';
import { ClickableIcon, iconTypes } from '@/core/symbol/icon';
import { spacing, TopMargin } from '@/core/layout/common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { PostsSelectionOverlay } from './posts-selection-overlay';
import { getDayReferenceRender } from './post-common';

export interface PostsHeaderProps {
	rootElement: HTMLElement | null;
	offsetPixels: number;
	isUpper: boolean;
	activePostIndex: number;
	posts: IPost[];
	onPostChosen: (newActivePostIndex: number) => void;
	onScrollTop: () => void;
}

export const PostsHeader: React.FC<PostsHeaderProps> = (props) => {
	const { rootElement, posts, offsetPixels, activePostIndex, onPostChosen, onScrollTop } = props;

	const stickyOutput = useSticky({
		rootElement: rootElement
	});
	const { isAtFirst } = stickyOutput;

	const post = posts[activePostIndex];

	const [isChoosingPostFromOverlay, setIsChoosingPostFromOverlay] = React.useState(false);

	function onClickCalendar() {
		setIsChoosingPostFromOverlay(true);
	}
	function onClickCalendarArchives() {
		onCloseOverlay();
	}
	function onClickCalendarPost(newActivePostIndex: number) {
		onCloseOverlay();
		onPostChosen(newActivePostIndex);
	}
	function onCloseOverlay() {
		setIsChoosingPostFromOverlay(false);
	}

	const hasEarlierPost = activePostIndex < posts.length - 1;
	function onClickEarlierPost() {
		onPostChosen(activePostIndex + 1);
	}

	const hasLaterPost = activePostIndex > 0;
	function onClickLaterPost() {
		onPostChosen(activePostIndex - 1);
	}

	function onClickTop() {
		onScrollTop();
	}

	return (
		<>
			<Sticky isSticky={true} output={stickyOutput} zIndex={1} >
				<PostsHeaderEmptySpace dataHeightPixels={offsetPixels} />
				<PostsHeaderContainer isSticking={isAtFirst} flex='none' justifyContent='center'>
					<PostsHeaderCenterContainer justifyContent='space-evenly' alignItems='center'>
						<ClickableIcon type={iconTypes.calendar} isDisabled={false} onClick={onClickCalendar} />
						<ClickableIcon type={iconTypes.left} isDisabled={!hasEarlierPost} onClick={onClickEarlierPost} />
						<PostDayTitle post={post} />
						<ClickableIcon type={iconTypes.right} isDisabled={!hasLaterPost} onClick={onClickLaterPost} />
						<ClickableIcon type={iconTypes.top} isDisabled={!isAtFirst} onClick={onClickTop} />
					</PostsHeaderCenterContainer>
				</PostsHeaderContainer>
			</Sticky>
			<PostsSelectionOverlay
				activePostIndex={activePostIndex}
				posts={posts}
				isActive={isChoosingPostFromOverlay}
				onArchivesChosen={onClickCalendarArchives}
				onPostChosen={onClickCalendarPost}
				onSetInactive={onCloseOverlay}
			/>
		</>
	);
};

interface PostsHeaderEmptySpaceProps {
	dataHeightPixels: number;
}

const PostsHeaderEmptySpace = tStyled.div<PostsHeaderEmptySpaceProps>`
	height: ${p => p.dataHeightPixels}px;
	background-color: ${p => p.theme.color.bg1};
`;

interface PostsHeaderContainerProps {
	isSticking: boolean;
}

const PostsHeaderContainer = tStyled(FlexRow) <PostsHeaderContainerProps>`
	position: relative;
	padding: ${spacing.small.vertical};
	background-color: ${p => p.theme.color.bg1};
	border-bottom: 1px solid ${p => p.isSticking ? p.theme.color.bgComponent3 : 'transparent'};
`;

const PostsHeaderCenterContainer = tStyled(FlexRow)`
	max-width: ${LayoutBreakpoint.tablet}px;
`;

interface PostDayTitle {
	post: IPost;
}

const PostDayTitle: React.FC<PostDayTitle> = (props) => {
	const { post } = props;
	const { dayReference, dateText, dayNumber } = post;

	const { widthBreakpoint } = useWindowLayout();

	let dayReferenceRender: JSX.Element | null = null;
	if (widthBreakpoint >= LayoutBreakpoint.mobileRegular) {
		dayReferenceRender = getDayReferenceRender(dayReference);
	}

	// Mobile
	let titleFontSize = FontSize.heading3;
	let subtitleFontSize = FontSize.textSmall;
	let minContainerWidth = '120px';
	if (widthBreakpoint >= LayoutBreakpoint.mobileRegular) {
		titleFontSize = FontSize.heading2;
		subtitleFontSize = FontSize.textRegular;
		minContainerWidth = '180px';
	}

	return (
		<PostDayTitleContainer minContainerWidth={minContainerWidth}>
			<FreeSmallText fontSize={subtitleFontSize}>{dayReferenceRender}Day {dayNumber}</FreeSmallText>
			<TopMargin.Nudge>
				<FreeHeading1 fontSize={titleFontSize}>{dateText}</FreeHeading1>
			</TopMargin.Nudge>
		</PostDayTitleContainer>
	);
};

interface FreeTextProps {
	fontSize: string;
}

const FreeSmallText = tStyled(SmallText).attrs((props: FreeTextProps) => {
	const style: Partial<CSSStyleDeclaration> = {};
	style.fontSize = props.fontSize;
	return {
		style
	};
})`
	color: ${p => p.theme.color.textInactive};
`;

const FreeHeading1 = tStyled(Heading1).attrs((props: FreeTextProps) => {
	const style: Partial<CSSStyleDeclaration> = {};
	style.fontSize = props.fontSize;
	return {
		style
	};
})``;

interface PostDayTitleContainerProps {
	minContainerWidth: string;
}

const PostDayTitleContainer = tStyled.div<PostDayTitleContainerProps>`
	min-width: ${p => p.minContainerWidth};
	text-align: center;
`;