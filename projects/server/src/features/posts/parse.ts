import { DailyRecord, MusicRecord, KeyVal } from 'oftheday-shared';
import { stringAt, tryParseInt } from '../../services/primitives';

export function parseDailyRecord(row: any[]): DailyRecord {
	return {
		day: stringAt(row, 0),
		dayAsText: stringAt(row, 1),
		dayNumber: tryParseInt(stringAt(row, 2), -1),
		specialEvent: stringAt(row, 3),
		location: stringAt(row, 4),
		note: stringAt(row, 5),
		schedule: stringAt(row, 6),
		quote: stringAt(row, 7),
		quoteBy: stringAt(row, 8),
		youTubeLink: stringAt(row, 9),
		youTubeLinkTitle: stringAt(row, 10),
		youTubeLinkDescription: stringAt(row, 11),
		howDidItGo: stringAt(row, 12)
	};
}

export function parseMusicRecord(row: any[]): MusicRecord {
	return {
		day: stringAt(row, 0),
		dayAsText: stringAt(row, 1),
		dayNumber: tryParseInt(stringAt(row, 2), -1),
		specialEvent: stringAt(row, 3),

		isFavorite: !!stringAt(row, 4),
		title: stringAt(row, 5),
		artist: stringAt(row, 6),
		spotifyLink: stringAt(row, 7),
		youTubeLink: stringAt(row, 8),
		isYouTubePreferred: !!stringAt(row, 9),
		geniusLink: stringAt(row, 10),
		description: stringAt(row, 11),
		quote: stringAt(row, 12)
	};
}

export function parseKeyVal(rows: any[][]): KeyVal {
	return {
		// Access each by index.
		importantInformation: stringAt(rows[0], 1),
		badInformation: stringAt(rows[1], 1),
		startDate: stringAt(rows[2], 1),
		workingOn: stringAt(rows[3], 1),
		lookingForwardTo: stringAt(rows[4], 1)
	};
}