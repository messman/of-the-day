import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { RegularText, SmallText } from '@/core/symbol/text';
import { OutLink, ActionLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { borderRadiusStyle } from '@/core/style/common';
import { Card } from '@/core/card/card';
import { iconTypes } from '@/core/symbol/icon';
import { createPostsElement, PostsElement } from './elements-common';

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

function shouldRenderCustom(post: IPost): boolean {
	const { custom } = post;
	return !!custom.value && !!custom.title;
}

export const Custom = createPostsElement((props) => {
	const { post } = props;

	const [isShowingHiddenValue, setIsShowingHiddenValue] = React.useState(false);

	if (!shouldRenderCustom(post)) {
		return null;
	}

	const { custom } = post;
	const { value, title, link, linkText, hiddenValue } = custom;

	function onClick() {
		setIsShowingHiddenValue((p) => {
			return !p;
		});
	}

	const revealText = isShowingHiddenValue ? 'Hide' : 'Reveal';

	return (
		<Card title={title} icon={iconTypes.speech}>
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
}, PostsElement.custom, shouldRenderCustom);

const HiddenArea = tStyled.div`
	padding: ${spacing.medium.value};
	background-color: ${p => p.theme.color.bgComponent2};
	border: 1px solid ${p => p.theme.color.bgComponent3};
	${borderRadiusStyle}
`;