import { IResponseWithMeta } from '../base';
import { enumKeys } from '../utility';

/** Response object from server to client for Posts page. */
export interface IPostResponse extends IResponseWithMeta {
	posts: IPost[];
	dayNumber: number;
}

/** Types of elements (subsections) of a Post. */
export enum IPostElementType {
	personal,
	music,
	video,
	image,
	quote,
	custom
}
export const keysOfIPostElementType = enumKeys(IPostElementType);

/** A Post = A Day */
export interface IPost {
	/** 01/01/2020 */
	date: string;
	/** Sun, Jan 1 */
	dateText: string;
	/** Day number since start of project. */
	dayNumber: number;
	/** Relative reference to the post's day (today, tomorrow, yesterday, etc) */
	dayReference: IPostDayReference;
	/** If true, don't display any elements; show a message instead. */
	isDayOff: boolean;
	/** The message to show if it's a day off. */
	dayOffMessage: string;
	/** Personal - notes, schedule, location, end thoughts. Not available in archives. */
	personal?: IPostPersonal;
	music?: IPostMusic;
	video?: IPostVideo;
	quote?: IPostQuote;
	image?: IPostImage;
	/** Catch-all - article, joke, spoiler, link, etc. */
	custom?: IPostCustom;
}

export interface IPostTopElement {
	/** Shows a 'top' start tag and is visible in the 'top' archive section. */
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
export const keysOfIPostDayReference = enumKeys(IPostDayReference);

export interface IPostPersonal {
	/** Event, like 'Christmas' or 'Birthday' */
	event: string;
	/** Notes on the event or the day in general */
	note: string[];
	/** Location */
	location: string;
	/** General schedule */
	schedule: string;
	/** Tags that describe the schedule */
	dayTypes: string[];
	/** End-of-day thoughts on the previous day. */
	previousDayThoughts: string[];
}

export interface IPostMusic extends IPostTopElement, IPostNSFWElement {
	title: string;
	artist: string;
	/** May hold multiple years for a cover, like '1968 / 2019'. */
	year: string;
	/** Tags beyond 'top' and NSFW */
	tags: string[];
	spotifyLink: string;
	youTubeLink: string;
	useYouTube: boolean;
	geniusLink: string;
	description: string[];
	quote: string;
}

export interface IPostVideo extends IPostTopElement, IPostNSFWElement {
	/** May be unspecified. Custom name that is more readable. */
	customTitle: string;
	/** May be unspecified. Custom creator name that is more readable. */
	customTitleCreator: string;
	/** Required. Original title copied from YouTube. */
	originalTitle: string;
	link: string;
	/** May be unspecified. Description. */
	description: string[];
	/** If true, video isn't on YouTube or is private or can't be embedded. */
	isRemoved: boolean;
	tags: string[];
}

export interface IPostQuote extends IPostTopElement, IPostNSFWElement {
	/** The first (sometimes only) part of the quote. */
	a: string;
	/** The first voice. */
	aVoice: string;
	/** The second part of the quote. */
	b: string;
	/** The speaker of the second part. */
	bVoice: string;
	/** The source of the quote, like a book or movie or show. */
	sourceText: string;
	/** A link to the source, if available. */
	sourceLink: string;
}

export interface IPostImage extends IPostTopElement, IPostNSFWElement {
	link: string;
	description: string;
	sourceLink: string;
	sourceText: string;
}

export interface IPostCustom extends IPostTopElement, IPostNSFWElement {
	/** Custom title, like 'Article' or 'Joke'. */
	title: string;
	/** Text value. */
	value: string[];
	/** Originally-hidden value. Joke punchline, spoiler, etc. */
	hiddenValue: string;
	link: string;
	linkText: string;
}