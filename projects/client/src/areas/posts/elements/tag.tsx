import * as React from 'react';
import { styled } from '@/core/style/styled';
import { SVGIconType, Icon } from '@/core/symbol/icon';
import { smallerSpacingValue, borderRadiusStyle } from '@/core/style/common';
import { SmallText, smallTextHeight } from '@/core/symbol/text';
import { DynamicMargin } from '@/core/layout/common';
import { useCurrentTheme } from '@/core/style/theme';
import { createTagProps } from './tag-definitions';


export interface TagProps extends TagContainerProps {
	value?: string;
	icon?: SVGIconType;
}

export const Tag: React.FC<TagProps> = (props) => {
	const { value, icon, darkColor, lightColor, useDarkColorForBackground } = props;

	const iconFillColor = useDarkColorForBackground ? lightColor : darkColor;
	const iconRender = icon ? <Icon type={icon} fillColor={iconFillColor} height={smallTextHeight} /> : null;
	const valueRender = value || '';
	const paddingRender = (icon && value) ? <InlinePadding /> : null;

	return (
		<TagContainer darkColor={darkColor} lightColor={lightColor} useDarkColorForBackground={useDarkColorForBackground}>
			<SmallText>
				{iconRender}
				{paddingRender}
				{valueRender}
			</SmallText>
		</TagContainer>
	);
};

interface TagContainerProps {
	darkColor: string;
	lightColor: string;
	useDarkColorForBackground: boolean;
}

const TagContainer = styled.div<TagContainerProps>`
	${borderRadiusStyle};
	display: inline-block;
	padding: calc(${smallerSpacingValue} / 4) ${smallerSpacingValue};
	white-space: nowrap;
	border: 1px solid ${p => p.darkColor};
	background-color: ${p => p.useDarkColorForBackground ? p.darkColor : p.lightColor};
	color: ${p => p.useDarkColorForBackground ? p.lightColor : p.darkColor};
	margin-left: none;

	& + & {
		margin-left: ${smallerSpacingValue};
	}

`;

const InlinePadding = styled.div`
	display: inline-block;
	margin: 3px;
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
	}, [tags]);

	const tagsRender = tagProps.map((tagProps, i) => {
		return (
			<Tag
				key={tagProps.value || i}
				{...tagProps}
			/>
		);
	});

	return (
		<DynamicMargin margin={margin} >
			{tagsRender}
		</DynamicMargin>
	);
};