import * as React from 'react';
import { IPostCustom, IPostElementType, isValidPostElement } from 'oftheday-shared';
import { spacing, Spacing, TopMargin } from '@/core/layout/common';
import { RegularText, SmallText } from '@/core/symbol/text';
import { OutLink, ActionLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { borderRadiusStyle } from '@/core/style/common';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement, PostCard } from './elements-common';
import { TagList, useTags } from './tag';
import { CardPadding } from '@/core/card/card';
import { ElementActions } from '../element-action-overlay';

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

export const Custom = createPostsElement<IPostCustom>((props) => {
	const { isForArchive, hideTitle, archivePost } = props;
	const { value, title, link, linkText, hiddenValue, isTop, isNSFW } = props.value;

	const tagsStrings = useTags(isTop, isNSFW);

	const [isShowingHiddenValue, setIsShowingHiddenValue] = React.useState(false);

	function onClick() {
		setIsShowingHiddenValue((p) => {
			return !p;
		});
	}

	React.useEffect(() => {
		setIsShowingHiddenValue(false);
	}, [props.value]);

	const revealText = isShowingHiddenValue ? 'Hide' : 'Reveal';

	const iconType = !!link ? iconTypes.link : iconTypes.speech;

	const revealButton = hiddenValue ? (
		<TopMargin.Medium>
			<SmallText>
				<ActionLink onClick={onClick}>{revealText}</ActionLink>
			</SmallText>
		</TopMargin.Medium>
	) : null;

	return (
		<PostCard title={title} icon={iconType} isForArchive={isForArchive} hideTitle={hideTitle} archivePost={archivePost}>
			<CardPadding>
				<TagList margin={spacing.large.vertical} tags={tagsStrings} />
				<Spacing show={link} margin={spacing.medium.top}>
					<OutLink href={link}>{linkText}</OutLink>
				</Spacing>
				<TopMargin.Medium>
					{value}
				</TopMargin.Medium>
				{revealButton}
				<Spacing show={hiddenValue && isShowingHiddenValue} margin={spacing.small.top}>
					<HiddenArea>
						<RegularText>
							{hiddenValue}
						</RegularText>
					</HiddenArea>
				</Spacing>
				<Spacing show={!isForArchive} margin={spacing.large.top}>
					<ElementActions isViewingArchive={isForArchive} elementType={IPostElementType.custom} isTop={isTop} />
				</Spacing>
			</CardPadding>
		</PostCard>
	);
}, IPostElementType.custom, isValidPostElement.custom);

const HiddenArea = tStyled.div`
	padding: ${spacing.medium.value};
	background-color: ${p => p.theme.color.bgComponent2};
	border: 1px solid ${p => p.theme.color.bgComponent3};
	${borderRadiusStyle}
`;