import * as React from 'react';
import { IPostElementType } from 'oftheday-shared';
import { Spacing, Block } from '@/core/layout/common';
import { fontDeclarations, lineHeights, ParagraphArray, SmallText } from '@/core/symbol/text';
import { OutLink, ActionLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { borderRadiusStyle } from '@/core/style/common';
import { iconTypes } from '@/core/symbol/icon';
import { TagList, useTags } from './tag';
import { ElementActions } from '../element-action-overlay';
import { PostElementCard, PostElementProps } from '../card/card';

/*
	Possible things in this section:
	- Jokes (using hidden section for punchline, or not)
	- Riddles (using hidden section for answer, or not)
	- Quiz Questions (using hidden section for answer)
	- Fact
	- Article (link)
	- Project (link)
	- Webpage (link)
	- Recommended Media (Movie, Show) (link)
*/

export const Custom: React.FC<PostElementProps> = (props) => {
	const { isForArchive, isOfSameElement, post } = props;
	const { value, title, link, linkText, hiddenValue, isTop, isNSFW } = post.custom!;

	const tagsStrings = useTags(isTop, isNSFW);

	const [isShowingHiddenValue, setIsShowingHiddenValue] = React.useState(false);

	function onClick() {
		setIsShowingHiddenValue((p) => {
			return !p;
		});
	}

	React.useEffect(() => {
		setIsShowingHiddenValue(false);
	}, [value]);

	const linkRender = link ? (
		<>
			<Block.Dog16 />
			<OutLink href={link}>{linkText}</OutLink>
		</>
	) : null;

	const revealText = isShowingHiddenValue ? 'Hide' : 'Reveal';

	const iconType = !!link ? iconTypes.link : iconTypes.speech;

	const revealButton = hiddenValue ? (
		<>
			<Block.Dog16 />
			<SmallText>
				<ActionLink onClick={onClick}>{revealText}</ActionLink>
			</SmallText>
		</>
	) : null;

	const hiddenValueRender = (hiddenValue && isShowingHiddenValue) ? (
		<>
			<Block.Bat08 />
			<HiddenArea>
				{hiddenValue}
			</HiddenArea>
		</>
	) : null;

	return (
		<PostElementCard
			title={title}
			icon={iconType}
			isForArchive={isForArchive}
			isOfSameElement={isOfSameElement}
			post={post}
			actionsRender={
				<ElementActions
					isForArchive={isForArchive}
					elementType={IPostElementType.custom}
					isTop={isTop}
				/>
			}
		>
			<TagList tags={tagsStrings} />
			{linkRender}
			<ParagraphArray value={value} />
			{revealButton}
			{hiddenValueRender}
		</PostElementCard>
	);
};

const HiddenArea = tStyled.div`
	padding: ${Spacing.dog16};
	background-color: ${p => p.theme.subtleFill.inset};
	box-shadow: ${p => p.theme.shadow.inset};
	border: 1px solid ${p => p.theme.outlineSubtle};
	${borderRadiusStyle}
	${fontDeclarations.regular}
	${lineHeights.body}
`;