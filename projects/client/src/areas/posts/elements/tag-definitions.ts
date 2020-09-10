import { TagProps } from './tag';
import { Theme, ThemePickColor } from '@/core/style/theme';

interface DynamicTagProps {
	useDarkColorForBackground: boolean;
	darkColor: ThemePickColor;
	lightColor: ThemePickColor;
}

const primaryColor: ThemePickColor = c => c.primaryA;
const nsfwColor: ThemePickColor = c => c.error;
const transparentColor: ThemePickColor = () => 'transparent';
const textColor: ThemePickColor = c => c.text;

const commonTagProps: { [key: string]: DynamicTagProps; } = {
	nsfw: {
		useDarkColorForBackground: true,
		lightColor: textColor,
		darkColor: nsfwColor
	},
	top: {
		useDarkColorForBackground: true,
		lightColor: textColor,
		darkColor: primaryColor
	},
	work: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	relaxation: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	adventure: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	party: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	travel: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	'turn it up': {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	'check the lyrics': {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	'personally meaningful': {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	'that\'s what i call music': {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	educational: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	comedy: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	music: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	fun: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	impressive: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	},
	art: {
		useDarkColorForBackground: false,
		lightColor: textColor,
		darkColor: primaryColor
	}
};

export function createTagProps(tags: string[], theme: Theme): TagProps[] {
	return tags.map<TagProps>((tag) => {

		const themeColor = theme.color;

		const dynamicTagProp = commonTagProps[tag.toLowerCase()];
		if (dynamicTagProp) {
			return {
				value: tag,
				lightColor: dynamicTagProp.lightColor(themeColor),
				darkColor: dynamicTagProp.darkColor(themeColor),
				useDarkColorForBackground: dynamicTagProp.useDarkColorForBackground
			};
		}

		return {
			value: tag,
			lightColor: transparentColor(themeColor),
			darkColor: primaryColor(themeColor),
			useDarkColorForBackground: false
		};
	});
}