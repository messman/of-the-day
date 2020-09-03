import * as React from 'react';
import { styled, StyledFC } from '@/core/style/styled';

export type SVGIconType = React.FC<React.SVGAttributes<SVGElement>>;

// These SVG files are processed by webpack to become actual SVG code in the final code package.
const ReactionSmile = require('@/static/icons/reaction-smile.svg').default as SVGIconType;
const ReactionText = require('@/static/icons/reaction-text.svg').default as SVGIconType;
const QuotationOpen = require('@/static/icons/quotation-open.svg').default as SVGIconType;
const QuotationClose = require('@/static/icons/quotation-close.svg').default as SVGIconType;
const Collapse = require('@/static/icons/collapse.svg').default as SVGIconType;
const TodoIncomplete = require('@/static/icons/todo-incomplete.svg').default as SVGIconType;
const TodoComplete = require('@/static/icons/todo-complete.svg').default as SVGIconType;
const Alert = require('@/static/icons/alert.svg').default as SVGIconType;
const Question = require('@/static/icons/question.svg').default as SVGIconType;
const Gear = require('@/static/icons/gear.svg').default as SVGIconType;
const Refresh = require('@/static/icons/refresh.svg').default as SVGIconType;
const Compass = require('@/static/icons/compass.svg').default as SVGIconType;
const Out = require('@/static/icons/out.svg').default as SVGIconType;

export const iconTypes = {
	reactionSmile: ReactionSmile,
	reactionText: ReactionText,
	quotationOpen: QuotationOpen,
	quotationClose: QuotationClose,
	collapse: Collapse,
	todoIncomplete: TodoIncomplete,
	todoComplete: TodoComplete,
	alert: Alert,
	question: Question,
	gear: Gear,
	refresh: Refresh,
	compass: Compass,
	out: Out
};

export interface IconProps {
	type: SVGIconType,
	/** If set, overrides the default text icon color for icons that allow it. */
	defaultColor?: string;
	/** If set, overrides all colors in the icon. */
	fillColor?: string;
	width?: string,
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

	const color = defaultColor;
	const SVGIcon = type;


	// Note - Safari SVG does not accept 'rem' width/height - so use percent and scale using wrapper.
	const setValue = !!width ? 'width' : 'height';
	const iconProp = { [setValue]: '100%' };

	return (
		<SVGWrapper className={className} svgColor={color} svgFill={fillColor} wrapperWidth={width} wrapperHeight={height}>
			<SVGIcon {...iconProp} />
		</SVGWrapper>
	);
};

interface SVGWrapperProps {
	wrapperWidth?: string,
	wrapperHeight?: string,
	svgColor?: string;
	svgFill?: string;
}

const SVGWrapper = styled.span<SVGWrapperProps>`
	display: inline-block;
	width: ${p => p.wrapperWidth || 'unset'};
	height: ${p => p.wrapperHeight || 'unset'}; 

	svg, svg path {
		color: ${p => (p.svgColor || p.theme.color.text)};
		${p => p.svgFill && ({
		fill: p.svgFill!
	})}
	}
`;