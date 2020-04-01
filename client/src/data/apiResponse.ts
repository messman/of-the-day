/**
 * Matches the C# definition. 
 */
export interface OfTheDayData {
	keyVal: KeyVal;

	checklistDone: string[];
	checklistToDo: string[];

	today: DailyRecord;
	yesterday: DailyRecord;

	todayMusic: MusicRecord;
	yesterdayMusic: MusicRecord;
}

export interface KeyVal {
	importantInformation: string;
	badInformation: string;
	startDate: string;
	workingOn: string;
	lookingForwardTo: string;
}

export interface SharedDayRecord {
	day: string;
	dayAsText: string;
	dayNumber: number;
	specialEvent: string;
}

export interface DailyRecord extends SharedDayRecord {
	location: string;
	note: string;
	schedule: string;
	quote: string;
	quoteBy: string;
	youTubeLink: string;
	youTubeLinkTitle: string;
	youTubeLinkDescription: string;
	howDidItGo: string;
}

export interface MusicRecord extends SharedDayRecord {
	isFavorite: boolean;
	title: string;
	artist: string;
	spotifyLink: string;
	youTubeLink: string;
	isYouTubePreferred: boolean;
	geniusLink: string;
	description: string;
	quote: string;
}