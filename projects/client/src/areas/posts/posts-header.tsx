import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { IPost, IPostDayReference } from 'oftheday-shared';
import { Title, RegularText, titleHeight } from '@/core/symbol/text';
import { TextAlign } from '@/core/style/common';
import { FlexRow, Sticky, useSticky } from '@messman/react-common';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { spacing } from '@/core/layout/common';

export interface PostsHeaderProps {
	rootRef: React.RefObject<any>;
	offsetPixels: number;
	isUpper: boolean;
	activePostIndex: number;
	posts: IPost[];
	onPostChosen: (newActivePostIndex: number) => void;
}

const dayReferencesText: Record<keyof typeof IPostDayReference, string> = {
	other: '',
	tomorrow: 'Tomorrow',
	today: 'Today',
	yesterday: 'Yesterday'
};

export const PostsHeader: React.FC<PostsHeaderProps> = (props) => {
	const { onPostChosen, ...otherProps } = props;
	const { rootRef, offsetPixels, posts, activePostIndex } = otherProps;

	const stickyOutput = useSticky({
		rootRef: rootRef,
		offsetPixels: offsetPixels,
	});

	const post = posts[activePostIndex];
	const { dayReference, dateText, dayNumber } = post;

	let dayReferenceRender: JSX.Element | null = null;
	if (dayReference !== IPostDayReference.other) {
		const dayReferenceText = dayReferencesText[IPostDayReference[dayReference] as keyof typeof IPostDayReference];
		dayReferenceRender = <>{dayReferenceText}&nbsp;&middot;&nbsp;</>;
	}

	return (
		<Sticky isSticky={true} output={stickyOutput} zIndex={1} >
			<PostsHeaderContainer {...otherProps} flex='none' justifyContent='center' alignItems='center'>
				<LeftIcon>
					<Icon type={iconTypes.calendar} fillColor={c => c.secondary} height={titleHeight} />
				</LeftIcon>
				<LeftIcon>
					<Icon type={iconTypes.left} fillColor={c => c.secondary} height={titleHeight} />
				</LeftIcon>
				<TextAlign align='center'>
					<RegularText margin={spacing.nudge.bottom} color={c => c.textSubtle}>{dayReferenceRender}Day {dayNumber}</RegularText>
					<Title isBold={true}>{dateText}</Title>
				</TextAlign>
				<RightIcon>
					<Icon type={iconTypes.right} fillColor={c => c.secondary} height={titleHeight} />
				</RightIcon>
				<RightIcon>
					<Icon type={iconTypes.top} fillColor={c => c.secondary} height={titleHeight} />
				</RightIcon>
			</PostsHeaderContainer>
		</Sticky>
	);
};

const PostsHeaderContainer = tStyled(FlexRow) <PostsHeaderProps>`
	padding: ${spacing.medium.vertical};
	position: relative;
	background-color: ${p => p.isUpper ? p.theme.color.backgroundC : p.theme.color.backgroundB};
`;

const LeftIcon = tStyled.div`
	margin-right: ${spacing.large.value};
`;

const RightIcon = tStyled.div`
	margin-left: ${spacing.large.value};
`;