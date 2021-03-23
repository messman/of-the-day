import * as React from 'react';
import { tStyled, StyledFC } from '@/core/style/styled';

export type SVGIconType = React.FC<React.SVGAttributes<SVGElement>>;

// These SVG files are processed by webpack to become actual SVG code in the final code package.
export const iconTypes = {
	brand: require('@/static/icons/brand.svg').default as SVGIconType,
	quotationOpen: require('@/static/icons/quotation-open.svg').default as SVGIconType,
	quotationClose: require('@/static/icons/quotation-close.svg').default as SVGIconType,
	top: require('@/static/icons/top.svg').default as SVGIconType,
	left: require('@/static/icons/left.svg').default as SVGIconType,
	right: require('@/static/icons/right.svg').default as SVGIconType,
	bottom: require('@/static/icons/bottom.svg').default as SVGIconType,
	todoIncomplete: require('@/static/icons/todo-incomplete.svg').default as SVGIconType,
	todoComplete: require('@/static/icons/todo-complete.svg').default as SVGIconType,
	alert: require('@/static/icons/alert.svg').default as SVGIconType,
	gear: require('@/static/icons/gear.svg').default as SVGIconType,
	compass: require('@/static/icons/compass.svg').default as SVGIconType,
	out: require('@/static/icons/out.svg').default as SVGIconType,
	calendar: require('@/static/icons/calendar.svg').default as SVGIconType,
	image: require('@/static/icons/image.svg').default as SVGIconType,
	music: require('@/static/icons/music.svg').default as SVGIconType,
	quote: require('@/static/icons/quote.svg').default as SVGIconType,
	thought: require('@/static/icons/thought.svg').default as SVGIconType,
	video: require('@/static/icons/video.svg').default as SVGIconType,
	compassLarge: require('@/static/icons/compass-large.svg').default as SVGIconType,
	link: require('@/static/icons/link.svg').default as SVGIconType,
	project: require('@/static/icons/project.svg').default as SVGIconType,
	activity: require('@/static/icons/activity.svg').default as SVGIconType,
	note: require('@/static/icons/note.svg').default as SVGIconType,
	speech: require('@/static/icons/speech.svg').default as SVGIconType,
	bicycling: require('@/static/icons/bicycling.svg').default as SVGIconType,
	creator: require('@/static/icons/creator.svg').default as SVGIconType,
	tagTop: require('@/static/icons/tag-top.svg').default as SVGIconType,
	share: require('@/static/icons/share.svg').default as SVGIconType,
};

export interface IconProps {
	type: SVGIconType;
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

	const { className, type } = props;
	const IconComponent = type;

	return (
		<IconComponent className={className} />
	);
};

export enum IconSize {
	a_medium = '1.5rem',
	b_large = '2rem',
	c_small = '1rem'
}

export interface SizedIconProps extends IconProps {
	size: string;
}

/*
	Possibly out-of-date note:
	Apparently at some point in 2019/2020 there was an issue
	where Safari could not take 'rem' units for svg.
	In that case, you'd need to use a span wrapper element and 100% 
	width or height on the SVG.
*/
export const SizedIcon = tStyled(Icon) <SizedIconProps>`
	width: ${p => p.size};
	height: ${p => p.size};
	flex-shrink: 0;
`;

export interface ClickableIconProps {
	isDisabled: boolean;
	onClick: () => void;
	type: SVGIconType;
}

export const ClickableIcon: React.FC<ClickableIconProps> = (props) => {
	const { isDisabled, onClick, type } = props;

	function onIconClick() {
		if (!isDisabled) {
			onClick();
		}
	}

	return (
		<ClickableIconContainer onClick={onIconClick} isDisabled={isDisabled} >
			<SizedIcon type={type} size={IconSize.a_medium} />
		</ClickableIconContainer>
	);
};

interface ClickableIconContainerProps {
	isDisabled: boolean;
}

const ClickableIconContainer = tStyled.span<ClickableIconContainerProps>`
	cursor: ${p => p.isDisabled ? 'not-allowed' : 'pointer'};
	color: ${p => p.isDisabled ? p.theme.textDisabled : p.theme.accent.aMain};
`;