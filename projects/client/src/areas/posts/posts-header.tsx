import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { IPost, IPostDayReference } from 'oftheday-shared';
import { subtitleHeight, regularTextHeight } from '@/core/symbol/text';
import { TextAlign } from '@/core/style/common';
import { FlexRow, Sticky, useSticky, useWindowLayout } from '@messman/react-common';
import { Icon, iconTypes, SVGIconType } from '@/core/symbol/icon';
import { spacing } from '@/core/layout/common';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { fontWeights } from '@/core/style/theme';

export interface PostsHeaderProps {
	rootElement: HTMLElement | null;
	offsetPixels: number;
	isUpper: boolean;
	activePostIndex: number;
	posts: IPost[];
	onPostChosen: (newActivePostIndex: number) => void;
	onScrollTop: () => void;
}

const dayReferencesText: Record<keyof typeof IPostDayReference, string> = {
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

	function onClickCalendar() {

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
	);
};

interface PostsHeaderEmptySpaceProps {
	dataHeightPixels: number;
}

const PostsHeaderEmptySpace = tStyled.div<PostsHeaderEmptySpaceProps>`
	height: ${p => p.dataHeightPixels}px;
	background-color: ${p => p.theme.color.backgroundA};
`;

interface PostsHeaderContainerProps {
	isSticking: boolean;
}

const PostsHeaderContainer = tStyled(FlexRow) <PostsHeaderContainerProps>`
	position: relative;
	padding: ${spacing.small.vertical};
	background-color: ${p => p.theme.color.backgroundA};
	border-bottom: 1px solid ${p => p.isSticking ? p.theme.color.backgroundC : 'transparent'};
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
	if (dayReference !== IPostDayReference.other) {
		const dayReferenceText = dayReferencesText[IPostDayReference[dayReference] as keyof typeof IPostDayReference];
		dayReferenceRender = <>{dayReferenceText}&nbsp;&middot;&nbsp;</>;
	}

	// Mobile
	let subtitleFontSize = '.875rem';
	let titleFontSize = '1.2rem';
	if (widthBreakpoint >= LayoutBreakpoint.tablet) {
		subtitleFontSize = regularTextHeight;
		titleFontSize = '1.75rem';
	}
	else if (widthBreakpoint >= LayoutBreakpoint.mobileRegular) {
		subtitleFontSize = regularTextHeight;
		titleFontSize = subtitleHeight;
	}

	return (
		<TextAlign dataAlign='center'>
			<PostDaySubtitleText fontSize={subtitleFontSize}>{dayReferenceRender}Day {dayNumber}</PostDaySubtitleText>
			<PostDayTitleText fontSize={titleFontSize}>{dateText}</PostDayTitleText>
		</TextAlign>
	);
};

interface PostDayTitleTextProps {
	fontSize: string;
}

const PostDayTitleText = tStyled.div<PostDayTitleTextProps>`
	font-size: ${p => p.fontSize};
	font-weight: ${fontWeights.bold};
	color: ${p => p.theme.color.textTitle};
`;

interface PostDaySubtitleTextProps {
	fontSize: string;
}

const PostDaySubtitleText = tStyled.div<PostDaySubtitleTextProps>`
	font-size: ${p => p.fontSize};
	font-weight: ${fontWeights.medium};
	color: ${p => p.theme.color.textInactive};
	margin: ${spacing.nudge.bottom};
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
			<Icon type={type} height={subtitleHeight} fillColor={c => isDisabled ? c.textDisabled : c.accent} />
		</InnerClickableIcon>
	);
};

interface InnerClickableIconProps {
	isDisabled: boolean;
}

const InnerClickableIcon = tStyled.span<InnerClickableIconProps>`
	cursor: ${p => p.isDisabled ? 'not-allowed' : 'pointer'};
`;