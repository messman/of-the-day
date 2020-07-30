import { Meta } from '../meta';

export interface OtherResponse {
	meta: Meta;

	workingOn?: OtherWorkingOn;
	lookingForward?: OtherLookingForward;

	spotifyLink?: string;
	youTubeLink?: string;
	imageAlbumLink?: string;
	imageAlbumLinkText?: string;

	miles?: number;

	topLocations?: Count[];
	topDayTypes?: Count[];
	topArtists?: Count[];

	checklistDone: string[];
	checklistToDo: string[];
}

export interface Count {
	text: string;
	count: number;
}

export interface OtherWorkingOn {
	text?: string;
	link?: string;
	linkText?: string;
}

export interface OtherLookingForward {
	text?: string;
	link?: string;
	linkText?: string;
}