import { IMeta } from '../meta';
import { enumKeys } from '../utility';

export interface IPostResponse {
	meta: IMeta;
	posts: IPost[];
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
	basics: IPostBasics;
	endThoughts: IPostEndThoughts;
	music: IPostMusic;
	video: IPostVideo;
	quote: IPostQuote;
	image: IPostImage;
	custom: IPostCustom;
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

export interface IPostMusic {
	title: string;
	artist: string;
	year: number;
	isNSFW: boolean;
	isTop: boolean;
	tags: string[];
	spotifyLink: string;
	youTubeLink: string;
	useYouTube: boolean;
	geniusLink: string;
	description: string;
	quote: string;
}

export interface IPostVideo {
	title: string;
	originalTitle: string;
	link: string;
	description: string;
	isRemoved: boolean;
	isNSFW: boolean;
	isTop: boolean;
	tags: string[];
}

export interface IPostQuote {
	a: string;
	aVoice: string;
	b: string;
	bVoice: string;
	source: string;
	sourceLink: string;
	isNSFW: boolean;
	isTop: boolean;
}

export interface IPostImage {
	link: string;
	description: string;
	source: string;
	sourceLink: string;
	isNSFW: boolean;
	isTop: boolean;
}

export interface IPostCustom {
	title: string;
	value: string;
	hiddenValue: string;
	link: string;
	linkText: string;
	previewLink: boolean;
	isNSFW: boolean;
	isTop: boolean;
}