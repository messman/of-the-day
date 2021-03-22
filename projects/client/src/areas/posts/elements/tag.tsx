import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { borderRadiusStyle } from '@/core/style/common';
import { fontDeclarations, FontSize } from '@/core/symbol/text';
import { Spacing } from '@/core/layout/common';
import { FontWeight, useCurrentTheme } from '@/core/style/theme';
import { createTagProps } from './tag-definitions';
import { SizedIcon, SVGIconType } from '@/core/symbol/icon';
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
		<PaddedIcon type={icon} size={FontSize.small} />
	) : null;

	return (
		<TagContainer foregroundColor={foregroundColor} backgroundColor={backgroundColor}>
			<FlexRow alignItems='center'>
				{iconRender}
				<TagText>{value}</TagText>
			</FlexRow>
		</TagContainer>
	);
};

const TagText = tStyled.span`
	display: inline-block;
	${fontDeclarations.small}
	font-weight: ${FontWeight.bold};
	color: inherit;
`;

const PaddedIcon = tStyled(SizedIcon)`
	margin-right: ${Spacing.ant04};
`;

interface TagContainerProps {
	backgroundColor: string;
	foregroundColor: string;
}

const TagContainer = tStyled.div<TagContainerProps>`
	${borderRadiusStyle};
	display: inline-block;
	padding: ${Spacing.ant04} ${Spacing.bat08};
	margin-top: ${Spacing.bat08};
	margin-right: ${Spacing.bat08};
	white-space: nowrap;
	border: none;
	color: ${p => p.foregroundColor};
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
	tags: string[];
}

export const TagList: React.FC<TagListProps> = (props) => {
	const { tags } = props;

	const theme = useCurrentTheme();

	const tagProps = React.useMemo(() => {
		return createTagProps(tags, theme);
	}, [tags, theme]);

	if (!tags.length) {
		return null;
	}

	const tagsRender = tagProps.map((tagProps) => {
		return (
			<Tag
				key={tagProps.value}
				{...tagProps}
			/>
		);
	});


	return (
		<TagsContainer>
			{tagsRender}
		</TagsContainer>
	);
};

const TagsContainer = tStyled.div`
	margin-top: ${Spacing.bat08};
`;