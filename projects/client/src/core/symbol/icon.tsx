import * as React from 'react';
import { styled, StyledFC } from '@/core/style/styled';

export type SVGIconType = React.FC<React.SVGAttributes<SVGElement>>;

// These SVG files are processed by webpack to become actual SVG code in the final code package.
const ReactionSmile = require('@/static/icons/reaction-smile.svg').default as SVGIconType;
const ReactionText = require('@/static/icons/reaction-text.svg').default as SVGIconType;
const Collapse = require('@/static/icons/collapse.svg').default as SVGIconType;
const TodoIncomplete = require('@/static/icons/todo-incomplete.svg').default as SVGIconType;
const TodoComplete = require('@/static/icons/todo-complete.svg').default as SVGIconType;
const Alert = require('@/static/icons/alert.svg').default as SVGIconType;
const Question = require('@/static/icons/question.svg').default as SVGIconType;
const Gear = require('@/static/icons/gear.svg').default as SVGIconType;
const Refresh = require('@/static/icons/refresh.svg').default as SVGIconType;

export const iconTypes = {
	reactionSmile: ReactionSmile,
	reactionText: ReactionText,
	collapse: Collapse,
	todoIncomplete: TodoIncomplete,
	todoComplete: TodoComplete,
	alert: Alert,
	question: Question,
	gear: Gear,
	refresh: Refresh
};

export interface IconProps {
	type: SVGIconType,
	fill?: string,
	width?: string,
	height?: string;
}

export const Icon: StyledFC<IconProps> = (props) => {
	// Get the width and height props separately. 
	const { type, fill, width, height } = props;
	// Note - Safari SVG does not accept 'rem' width/height - so use percent and scale using wrapper.
	const setValue = !!width ? 'width' : 'height';
	const iconProp = { [setValue]: '100%' };
	const SVGIcon = type;

	return (
		<SVGWrapper className={props.className} svgFill={fill} wrapperWidth={width} wrapperHeight={height}>
			<SVGIcon {...iconProp} />
		</SVGWrapper>
	);
};

interface SVGWrapperProps {
	wrapperWidth?: string,
	wrapperHeight?: string,
	svgFill?: string;
}

const SVGWrapper = styled.span<SVGWrapperProps>`
	display: inline-block;
	width: ${p => p.wrapperWidth || 'unset'};
	height: ${p => p.wrapperHeight || 'unset'}; 

	svg, svg path {
		fill: ${p => (p.svgFill || p.theme.color.textAndIcon)};
	}
`;