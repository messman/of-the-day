import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { IPost, IPostDayReference } from 'oftheday-shared';
import { FontSize, Heading1, SmallText } from '@/core/symbol/text';
import { FlexRow, Sticky, useSticky, useWindowLayout } from '@messman/react-common';
import { Icon, iconTypes, SVGIconType } from '@/core/symbol/icon';
import { spacing } from '@/core/layout/common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FontWeight } from '@/core/style/theme';
import { PostsSelectionOverlay } from './posts-selection-overlay';

export interface PostsHeaderProps {
	rootElement: HTMLElement | null;
	offsetPixels: number;
	isUpper: boolean;
	activePostIndex: number;
	posts: IPost[];
	onPostChosen: (newActivePostIndex: number) => void;
	onScrollTop: () => void;
}

export const dayReferencesText: Record<keyof typeof IPostDayReference, string> = {
	other: '',
	tomorrow: 'Tomorrow',
	today: 'Today',
	yesterday: 'Yesterday'
};

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
	if (widthBreakpoint >= LayoutBreakpoint.mobileRegular && dayReference !== IPostDayReference.other) {
		const dayReferenceText = dayReferencesText[IPostDayReference[dayReference] as keyof typeof IPostDayReference];
		dayReferenceRender = <>{dayReferenceText}&nbsp;&middot;&nbsp;</>;
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
			<SmallText
				fontSize={subtitleFontSize}
				fontWeight={FontWeight.medium}
				color={c => c.textInactive}
				margin={spacing.nudge.bottom}
			>
				{dayReferenceRender}Day {dayNumber}
			</SmallText>
			<Heading1
				fontSize={titleFontSize}
				fontWeight={FontWeight.bold}
			>
				{dateText}
			</Heading1>
		</PostDayTitleContainer>
	);
};

interface PostDayTitleContainerProps {
	minContainerWidth: string;
}

const PostDayTitleContainer = tStyled.div<PostDayTitleContainerProps>`
	min-width: ${p => p.minContainerWidth};
	text-align: center;
`;

interface ClickableIconProps {
	isDisabled: boolean;
	onClick: () => void;
	type: SVGIconType;
}

const ClickableIcon: React.FC<ClickableIconProps> = (props) => {
	const { isDisabled, onClick, type } = props;

	function onIconClick() {
		if (!isDisabled) {
			onClick();
		}
	}

	return (
		<InnerClickableIcon onClick={onIconClick} isDisabled={isDisabled} >
			<Icon type={type} height={FontSize.heading2} fillColor={c => isDisabled ? c.textDisabled : c.textAccentOnBackground} />
		</InnerClickableIcon>
	);
};

interface InnerClickableIconProps {
	isDisabled: boolean;
}

const InnerClickableIcon = tStyled.span<InnerClickableIconProps>`
	cursor: ${p => p.isDisabled ? 'not-allowed' : 'pointer'};
`;