import * as React from 'react';
import { styled } from '@/core/style/styled';
import { IPost, IPostDayReference } from 'oftheday-shared';
import { Title, Text, titleHeight } from '@/core/symbol/text';
import { spacing, Center } from '@/core/style/common';
import { FlexRow, Sticky, useSticky } from '@messman/react-common';
import { Icon, iconTypes } from '@/core/symbol/icon';

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
	const { rootRef, offsetPixels, posts, activePostIndex } = props;

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
			<PostsHeaderContainer {...props} flex='none' justifyContent='center' alignItems='center'>
				<LeftIcon>
					<Icon type={iconTypes.calendar} fillColor={c => c.secondary} height={titleHeight} />
				</LeftIcon>
				<LeftIcon>
					<Icon type={iconTypes.left} fillColor={c => c.secondary} height={titleHeight} />
				</LeftIcon>
				<Center>
					<Text margin={spacing.nudge.bottom} dataColor={c => c.textSubtle}>{dayReferenceRender}Day {dayNumber}</Text>
					<Title isBold={true}>{dateText}</Title>
				</Center>
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

const PostsHeaderContainer = styled(FlexRow) <PostsHeaderProps>`
	padding: ${spacing.medium.vertical};
	position: relative;
	background-color: ${p => p.isUpper ? p.theme.color.backgroundB : p.theme.color.backgroundB};
`;

const LeftIcon = styled.div`
	margin-right: ${spacing.large.value};
`;

const RightIcon = styled.div`
	margin-left: ${spacing.large.value};
`;