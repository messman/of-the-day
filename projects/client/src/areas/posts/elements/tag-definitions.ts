import { TagProps } from './tag';
import { Theme, ThemePickColor } from '@/core/style/theme';

interface DynamicTagProps {
	foregroundColor: ThemePickColor;
	backgroundColor: ThemePickColor;
}

const defaultTag: DynamicTagProps = {
	foregroundColor: c => c.tagForeground,
	backgroundColor: c => c.accentAgainstDark
};

const commonTagProps: { [key: string]: DynamicTagProps; } = {
	nsfw: {
		foregroundColor: c => c.tagNSFWForeground,
		backgroundColor: c => c.tagNSFWBackground
	},
	top: {
		foregroundColor: c => c.tagTopForeground,
		backgroundColor: c => c.tagTopBackground
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
		const themeColor = theme.color;
		const dynamicTagProp = commonTagProps[tag.toLowerCase()] || defaultTag;
		return {
			value: tag,
			foregroundColor: dynamicTagProp.foregroundColor(themeColor),
			backgroundColor: dynamicTagProp.backgroundColor(themeColor),
		};
	});
}