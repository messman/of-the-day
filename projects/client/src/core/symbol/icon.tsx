import * as React from 'react';
import { styled, StyledFC } from '@/core/style/styled';
import { ThemePickColor } from '../style/theme';
import { css } from 'styled-components';

export type SVGIconType = React.FC<React.SVGAttributes<SVGElement>>;

// These SVG files are processed by webpack to become actual SVG code in the final code package.
export const iconTypes = {
	reactionSmile: require('@/static/icons/reaction-smile.svg').default as SVGIconType,
	reactionText: require('@/static/icons/reaction-text.svg').default as SVGIconType,
	quotationOpen: require('@/static/icons/quotation-open.svg').default as SVGIconType,
	quotationClose: require('@/static/icons/quotation-close.svg').default as SVGIconType,
	collapse: require('@/static/icons/collapse.svg').default as SVGIconType,
	todoIncomplete: require('@/static/icons/todo-incomplete.svg').default as SVGIconType,
	todoComplete: require('@/static/icons/todo-complete.svg').default as SVGIconType,
	alert: require('@/static/icons/alert.svg').default as SVGIconType,
	question: require('@/static/icons/question.svg').default as SVGIconType,
	gear: require('@/static/icons/gear.svg').default as SVGIconType,
	refresh: require('@/static/icons/refresh.svg').default as SVGIconType,
	compass: require('@/static/icons/compass.svg').default as SVGIconType,
	out: require('@/static/icons/out.svg').default as SVGIconType,
	calendar: require('@/static/icons/calendar.svg').default as SVGIconType,
	image: require('@/static/icons/image.svg').default as SVGIconType,
	music: require('@/static/icons/music.svg').default as SVGIconType,
	quote: require('@/static/icons/quote.svg').default as SVGIconType,
	thought: require('@/static/icons/thought.svg').default as SVGIconType,
	video: require('@/static/icons/video.svg').default as SVGIconType
};

export interface IconProps {
	type: SVGIconType;
	/** If set, overrides the default text icon color for icons that allow it. */
	defaultColor?: ThemePickColor;
	/** If set, overrides all colors in the icon. */
	fillColor?: ThemePickColor;
	width?: string;
	height?: string;
}

export const Icon: StyledFC<IconProps> = (props) => {
	/*
		Fill and color:
		SVGs are exported from Sketch. We want the icons to have multiple colors, where one of those colors is dynamic
		(can be changed by CSS). If we used CSS Fill, it would change all our multiple colors; so instead, we use the 'currentColor'.
		During build, we use the replaceAttrValues option of svgr (https://github.com/gregberge/svgr/issues/163) to replace all 
		'#000' colors with 'currentColor'. Then, here, we set the currentColor via CSS 'color'.
		So in summary: Fill will override all the colors coming from Sketch; color will just set the one color we want to change.
	*/

	const { className, type, defaultColor, fillColor, width, height } = props;

	const SVGIcon = type;


	// Note - Safari SVG does not accept 'rem' width/height - so use percent and scale using wrapper.
	const setValue = !!width ? 'width' : 'height';
	const iconProp = { [setValue]: '100%' };

	return (
		<SVGWrapper className={className} svgColor={defaultColor} svgFill={fillColor} wrapperWidth={width} wrapperHeight={height}>
			<SVGIcon {...iconProp} />
		</SVGWrapper>
	);
};

interface SVGWrapperProps {
	wrapperWidth?: string;
	wrapperHeight?: string;
	svgColor?: ThemePickColor;
	svgFill?: ThemePickColor;
}

const SVGWrapper = styled.span<SVGWrapperProps>`
	display: inline-block;
	width: ${p => p.wrapperWidth || 'unset'};
	height: ${p => p.wrapperHeight || 'unset'}; 

	svg, svg path {
		color: ${p => (p.svgColor ? p.svgColor!(p.theme.color) : p.theme.color.text)};
		${p => !!p.svgFill && css({
	fill: p.svgFill!(p.theme.color)
})}
	}
`;