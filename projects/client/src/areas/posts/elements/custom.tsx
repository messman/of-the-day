import * as React from 'react';
import { IPostCustom, IPostElementType, isValidPostElement } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { RegularText, SmallText } from '@/core/symbol/text';
import { OutLink, ActionLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { borderRadiusStyle } from '@/core/style/common';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement } from './elements-common';
import { TagList, useTags } from './tag';

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
	const { value, title, link, linkText, hiddenValue, isTop, isNSFW } = props.value;

	const tagsStrings = useTags(isTop, isNSFW);

	const [isShowingHiddenValue, setIsShowingHiddenValue] = React.useState(false);

	function onClick() {
		setIsShowingHiddenValue((p) => {
			return !p;
		});
	}

	const revealText = isShowingHiddenValue ? 'Hide' : 'Reveal';

	const iconType = !!link ? iconTypes.link : iconTypes.speech;

	return (
		<Card title={title} icon={iconType}>
			<TagList margin={spacing.medium.vertical} tags={tagsStrings} />
			<RegularText show={link} margin={spacing.medium.top}>
				<OutLink href={link}>{linkText}</OutLink>
			</RegularText>
			<RegularText margin={spacing.medium.top}>
				{value}
			</RegularText>
			<SmallText show={hiddenValue} margin={spacing.medium.top}>
				<ActionLink onClick={onClick}>{revealText}</ActionLink>
			</SmallText>
			<Spacing show={hiddenValue && isShowingHiddenValue} margin={spacing.small.top}>
				<HiddenArea>
					<RegularText>
						{hiddenValue}
					</RegularText>
				</HiddenArea>
			</Spacing>
		</Card>
	);
}, IPostElementType.custom, isValidPostElement.custom);

const HiddenArea = tStyled.div`
	padding: ${spacing.medium.value};
	background-color: ${p => p.theme.color.bgComponent2};
	border: 1px solid ${p => p.theme.color.bgComponent3};
	${borderRadiusStyle}
`;