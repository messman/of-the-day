import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { borderRadiusStyle } from '@/core/style/common';
import { FontSize, SmallText } from '@/core/symbol/text';
import { spacing, Spacing } from '@/core/layout/common';
import { FontWeight, useCurrentTheme } from '@/core/style/theme';
import { createTagProps } from './tag-definitions';
import { Icon, SVGIconType } from '@/core/symbol/icon';
import { FlexRow } from '@messman/react-common';

export interface TagProps {
	value: string;
	foregroundColor: string;
	backgroundColor: string;
	icon?: SVGIconType;
}

export const Tag: React.FC<TagProps> = (props) => {
	const { value, backgroundColor, foregroundColor, icon } = props;

	const iconRender = icon ? (
		<PaddedIcon type={icon} height={FontSize.textSmall} fillColor={() => foregroundColor} />
	) : null;

	return (
		<TagContainer backgroundColor={backgroundColor}>
			<FlexRow alignItems='center'>
				{iconRender}
				<TagText foregroundColor={foregroundColor}>{value}</TagText>
			</FlexRow>
		</TagContainer>
	);
};

interface TagTextProps {
	foregroundColor: string;
}

const TagText = tStyled(SmallText) <TagTextProps>`
	font-weight: ${FontWeight.bold};
	color: ${p => p.foregroundColor};
`;

const PaddedIcon = tStyled(Icon)`
	margin-right: ${spacing.nudge.value};
`;

interface TagContainerProps {
	backgroundColor: string;
}

const negativeTopMargin = `-${spacing.small.value} 0 0 0`;

const TagContainer = tStyled.div<TagContainerProps>`
	${borderRadiusStyle};
	display: inline-block;
	padding: ${spacing.nudge.value} ${spacing.small.value};
	margin-top: ${spacing.small.value};
	margin-right: ${spacing.small.value};
	white-space: nowrap;
	border: none;
	background-color: ${p => p.backgroundColor};

	&:last-child {
		margin-right: 0;
	}
`;

export function useTags(isTop: boolean, isNSFW: boolean, additionalTags?: string[]): string[] {
	return React.useMemo(() => {
		return ([isTop ? 'Top' : '', isNSFW ? 'NSFW' : '', ...(additionalTags || [])]).filter(x => !!x);
	}, [isTop, isNSFW, additionalTags]);
}

export interface TagListProps {
	margin?: string | null;
	tags: string[];
}

export const TagList: React.FC<TagListProps> = (props) => {
	const { margin, tags } = props;

	const theme = useCurrentTheme();

	const tagProps = React.useMemo(() => {
		return createTagProps(tags, theme);
	}, [tags, theme]);

	const tagsRender = tagProps.map((tagProps) => {
		return (
			<Tag
				key={tagProps.value}
				{...tagProps}
			/>
		);
	});

	return (
		<Spacing show={tags.length} margin={margin}>
			<Spacing margin={negativeTopMargin}>
				{tagsRender}
			</Spacing>
		</Spacing>
	);
};