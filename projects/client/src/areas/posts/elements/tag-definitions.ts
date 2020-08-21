import { TagProps } from './tag';
import { Theme } from '@/core/style/theme';

interface DynamicTagProps {
	useDarkColorForBackground: boolean;
	darkColor: (theme: Theme) => string;
	lightColor: (theme: Theme) => string;
}

const primaryColor = (theme: Theme) => theme.color.primary;
const successColor = (theme: Theme) => theme.color.success;
const transparentColor = (_: Theme) => 'transparent';
const textColor = (theme: Theme) => theme.color.textAndIcon;

const commonTagProps: { [key: string]: DynamicTagProps; } = {
	nsfw: {
		useDarkColorForBackground: true,
		lightColor: textColor,
		darkColor: successColor
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

		const dynamicTagProp = commonTagProps[tag.toLowerCase()];
		if (dynamicTagProp) {
			return {
				value: tag,
				lightColor: dynamicTagProp.lightColor(theme),
				darkColor: dynamicTagProp.darkColor(theme),
				useDarkColorForBackground: dynamicTagProp.useDarkColorForBackground
			};
		}

		return {
			value: tag,
			lightColor: transparentColor(theme),
			darkColor: primaryColor(theme),
			useDarkColorForBackground: false
		};
	});
}