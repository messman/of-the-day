import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { borderRadiusStyle } from '@/core/style/common';
import { FontSize } from '@/core/symbol/text';
import { spacing, Spacing } from '@/core/layout/common';
import { useCurrentTheme } from '@/core/style/theme';
import { createTagProps } from './tag-definitions';


export interface TagProps extends TagContainerProps {
	value: string;
}

export const Tag: React.FC<TagProps> = (props) => {
	const { value, backgroundColor, foregroundColor } = props;

	return (
		<TagContainer backgroundColor={backgroundColor} foregroundColor={foregroundColor}>
			{value}
		</TagContainer>
	);
};

interface TagContainerProps {
	foregroundColor: string;
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
	font-size: ${FontSize.textSmall};
	color: ${p => p.foregroundColor};
	background-color: ${p => p.backgroundColor};

	&:last-child {
		margin-right: 0;
	}
`;

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