import { IMeta } from '../meta';
import { enumKeys } from '../utility';

export interface IPostResponse {
	meta: IMeta;
	posts: IPost[];
	dayNumber: number;
}

export enum IPostElementType {
	notes,
	schedule,
	location,
	endThoughts,
	music,
	video,
	image,
	quote,
	custom
}
export const keysOfIPostElementType = enumKeys(IPostElementType);

export interface IPost {
	date: string;
	dateText: string;
	dayNumber: number;
	dayReference: IPostDayReference;
	isDayOff: boolean;
	dayOffMessage: string;
	basics?: IPostBasics;
	endThoughts?: IPostEndThoughts;
	music?: IPostMusic;
	video?: IPostVideo;
	quote?: IPostQuote;
	image?: IPostImage;
	custom?: IPostCustom;
}

export interface IPostTopElement {
	isTop: boolean;
}

export interface IPostNSFWElement {
	isNSFW: boolean;
}

export enum IPostDayReference {
	other,
	today,
	yesterday,
	tomorrow
}

export interface IPostBasics {
	event: string;
	note: string;
	location: string;
	schedule: string;
	dayTypes: string[];
}

export interface IPostEndThoughts {
	value: string;
}

export interface IPostMusic extends IPostTopElement, IPostNSFWElement {
	title: string;
	artist: string;
	/** May hold multiple years for a cover. */
	year: string;
	tags: string[];
	spotifyLink: string;
	youTubeLink: string;
	useYouTube: boolean;
	geniusLink: string;
	description: string;
	quote: string;
}

export interface IPostVideo extends IPostTopElement, IPostNSFWElement {
	/** May be unspecified. */
	customTitle: string;
	/** May be unspecified. */
	customTitleCreator: string;
	/** Required. */
	originalTitle: string;
	link: string;
	description: string;
	isRemoved: boolean;
	tags: string[];
}

export interface IPostQuote extends IPostTopElement, IPostNSFWElement {
	a: string;
	aVoice: string;
	b: string;
	bVoice: string;
	sourceText: string;
	sourceLink: string;
}

export interface IPostImage extends IPostTopElement, IPostNSFWElement {
	link: string;
	description: string;
	sourceLink: string;
	sourceText: string;
}

export interface IPostCustom extends IPostTopElement, IPostNSFWElement {
	title: string;
	value: string;
	hiddenValue: string;
	link: string;
	linkText: string;
}