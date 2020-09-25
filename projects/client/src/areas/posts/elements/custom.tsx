import * as React from 'react';
import { IPostCustom } from 'oftheday-shared';
import { spacing, ApplicationMaxWidth, Spacing, LayoutAlign } from '@/core/layout/common';
import { RegularText, Subtitle, SmallText } from '@/core/symbol/text';
import { OutLink, ActionLink } from '@/core/link';
import { ElementRoot } from '../post';
import { tStyled } from '@/core/style/styled';
import { borderRadiusStyle } from '@/core/style/common';

export interface CustomProps {
	custom: IPostCustom;
}

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

export const Custom: React.FC<CustomProps> = (props) => {
	const { custom } = props;
	const { value, title, link, linkText, hiddenValue } = custom;

	const [isShowingHiddenValue, setIsShowingHiddenValue] = React.useState(false);

	if (!value || !title) {
		return null;
	}

	function onClick() {
		setIsShowingHiddenValue((p) => {
			return !p;
		});
	}

	const revealText = isShowingHiddenValue ? 'Hide' : 'Reveal';

	return (
		<ElementRoot>
			<ApplicationMaxWidth>
				<LayoutAlign>
					<Subtitle margin={spacing.medium.bottom}>{title}</Subtitle>
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
				</LayoutAlign>
			</ApplicationMaxWidth>
		</ElementRoot>
	);
};



const HiddenArea = tStyled.div`
	padding: ${spacing.medium.value};
	${borderRadiusStyle}
`;