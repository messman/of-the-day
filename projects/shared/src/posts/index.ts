import { Meta } from '../meta';

export interface PostReactionSummary {
	emoji: string[];
	replies: number;
}

export interface PostResponse {
	meta: Meta;
	posts: Post[];
}

export interface Post {
	date: string;
	dateText: string;
	dayNumber: number;
	isDayOff: boolean;
	dayOffMessage: string;

	basics: PostBasics;
	endThoughts: PostEndThoughts;
	music: PostMusic;
	video: PostVideo;
	quote: PostQuote;
	image: PostImage;
	custom: PostCustom;
}

export interface PostBasics {
	event: string;
	note: string;
	location: string;
	schedule: string;
	dayTypes: string[];
	reactionSummary: PostReactionSummary;
}

export interface PostEndThoughts {
	value: string;
	reactionSummary: PostReactionSummary;
}

export interface PostMusic {
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
	reactionSummary: PostReactionSummary;
}

export interface PostVideo {
	title: string;
	originalTitle: string;
	link: string;
	description: string;
	isRemoved: boolean;
	isNSFW: boolean;
	isTop: boolean;
	tags: string[];
	reactionSummary: PostReactionSummary;
}

export interface PostQuote {
	a: string;
	aVoice: string;
	b: string;
	bVoice: string;
	source: string;
	sourceLink: string;
	reactionSummary: PostReactionSummary;
}

export interface PostImage {
	link: string;
	description: string;
	source: string;
	sourceLink: string;
	reactionSummary: PostReactionSummary;
}

export interface PostCustom {
	title: string;
	value: string;
	link: string;
	linkText: string;
	previewLink: boolean;
	reactionSummary: PostReactionSummary;
}