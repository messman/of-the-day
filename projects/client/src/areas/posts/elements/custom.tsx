import * as React from 'react';
import { IPostElementType } from 'oftheday-shared';
import { Spacing, Block, Padding } from '@/core/layout/common';
import { RegularText, SmallText } from '@/core/symbol/text';
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
	const { isForArchive, hideTitle, post } = props;
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
				<RegularText>
					{hiddenValue}
				</RegularText>
			</HiddenArea>
		</>
	) : null;

	const elementActionsRender = (!isForArchive) ? (
		<>
			<Block.Elf24 />
			<ElementActions isViewingArchive={isForArchive} elementType={IPostElementType.custom} isTop={isTop} />
		</>
	) : null;

	return (
		<PostElementCard elementTitleName={title} icon={iconType} isForArchive={isForArchive} hideTitle={hideTitle} post={post}>
			<Padding.Dog16>
				<TagList tags={tagsStrings} />
				{linkRender}
				<Block.Dog16 />
				{value}
				{revealButton}
				{hiddenValueRender}
				{elementActionsRender}
			</Padding.Dog16>
		</PostElementCard>
	);
};

const HiddenArea = tStyled.div`
	padding: ${Spacing.dog16};
	background-color: ${p => p.theme.subtleFill.b1Card};
	border: 1px solid ${p => p.theme.outlineDistinct};
	${borderRadiusStyle}
`;