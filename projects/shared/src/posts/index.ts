import { IMeta } from '../meta';

export interface IPostReactionSummary {
	emoji: string[];
	replies: number;
}

export interface IPostResponse {
	meta: IMeta;
	posts: IPost[];
}

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
	reactionSummary?: IPostReactionSummary;
}

export interface IPostEndThoughts {
	value: string;
	reactionSummary?: IPostReactionSummary;
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
	reactionSummary?: IPostReactionSummary;
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
	reactionSummary?: IPostReactionSummary;
}

export interface IPostQuote {
	a: string;
	aVoice: string;
	b: string;
	bVoice: string;
	source: string;
	sourceLink: string;
	reactionSummary?: IPostReactionSummary;
}

export interface IPostImage {
	link: string;
	description: string;
	source: string;
	sourceLink: string;
	reactionSummary?: IPostReactionSummary;
}

export interface IPostCustom {
	title: string;
	value: string;
	link: string;
	linkText: string;
	previewLink: boolean;
	reactionSummary?: IPostReactionSummary;
}