import { TagProps } from './tag';
import { Theme } from '@/core/style/theme';
import { iconTypes, SVGIconType } from '@/core/symbol/icon';

type ThemePickColor = (theme: Theme) => string;

interface DynamicTagProps {
	foregroundColor: ThemePickColor;
	backgroundColor: ThemePickColor;
	icon?: SVGIconType;
}

const defaultTag: DynamicTagProps = {
	foregroundColor: c => c.textOnAccentFill,
	backgroundColor: c => c.accent.aMain
};

const commonTagProps: { [key: string]: DynamicTagProps; } = {
	nsfw: {
		foregroundColor: c => c.system.tagNSFWFore,
		backgroundColor: c => c.system.tagNSFWBack
	},
	top: {
		foregroundColor: c => c.system.tagTopFore,
		backgroundColor: c => c.system.tagTopBack,
		icon: iconTypes.tagTop
	},
	work: defaultTag,
	relaxation: defaultTag,
	adventure: defaultTag,
	party: defaultTag,
	travel: defaultTag,
	'turn it up': defaultTag,
	'check the lyrics': defaultTag,
	'personally meaningful': defaultTag,
	'that\'s what i call music': defaultTag,
	educational: defaultTag,
	comedy: defaultTag,
	music: defaultTag,
	fun: defaultTag,
	impressive: defaultTag,
	art: defaultTag
};

export function createTagProps(tags: string[], theme: Theme): TagProps[] {
	return tags.map<TagProps>((tag) => {
		const dynamicTagProp = commonTagProps[tag.toLowerCase()] || defaultTag;
		return {
			value: tag,
			foregroundColor: dynamicTagProp.foregroundColor(theme),
			backgroundColor: dynamicTagProp.backgroundColor(theme),
			icon: dynamicTagProp.icon
		};
	});
}