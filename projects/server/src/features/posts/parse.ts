
import { stringAt, tryParseInt } from '../../services/primitives';
import { columnsFrom, createCell } from '../../services/google-sheets/cell';
import { keepTruthy } from '../../services/util';
import { IPost, IPostDayReference } from 'oftheday-shared';

export const postsColumnStart = 'A';
export const postsColumnStop = 'BG';
/** Where the Posts sheet's data actually starts. Cloned and offset to get start of range. */
export const postsBaseFromCell = createCell('Read_Posts', postsColumnStart, 3);

export function parsePost(row: any[], dayReference: IPostDayReference): IPost {
	const col = columnsFrom(postsColumnStart);
	function stringAtCol(columnLetter: string): string {
		return stringAt(row, col(columnLetter));
	}

	return {
		date: stringAtCol(postsColumnStart),
		dateText: stringAtCol('B'),
		dayNumber: tryParseInt(stringAtCol('C'), -1),
		dayReference: dayReference,
		isDayOff: !!stringAtCol('E'),
		dayOffMessage: stringAtCol('F'),

		basics: {
			event: stringAtCol('G'),
			note: stringAtCol('H'),
			location: stringAtCol('I'),
			schedule: stringAtCol('J'),
			dayTypes: keepTruthy(stringAtCol('K'), stringAtCol('L')),
		},
		endThoughts: {
			value: stringAtCol('M'),
		},
		music: {
			title: stringAtCol('N'),
			artist: stringAtCol('O'),
			year: tryParseInt(stringAtCol('P'), -1),
			isNSFW: !!stringAtCol('Q'),
			isTop: !!stringAtCol('R'),
			tags: keepTruthy(stringAtCol('S'), stringAtCol('T'), stringAtCol('U')),
			spotifyLink: stringAtCol('V'),
			youTubeLink: stringAtCol('W'),
			useYouTube: !!stringAtCol('X'),
			geniusLink: stringAtCol('Y'),
			description: stringAtCol('Z'),
			quote: stringAtCol('AA'),
		},
		video: {
			title: stringAtCol('AB'),
			originalTitle: stringAtCol('AC'),
			link: stringAtCol('AD'),
			description: stringAtCol('AE'),
			isRemoved: !!stringAtCol('AF'),
			isNSFW: !!stringAtCol('AG'),
			isTop: !!stringAtCol('AH'),
			tags: keepTruthy(stringAtCol('AI'), stringAtCol('AJ'), stringAtCol('AK')),
		},
		quote: {
			a: stringAtCol('AL'),
			aVoice: stringAtCol('AM'),
			b: stringAtCol('AN'),
			bVoice: stringAtCol('AO'),
			source: stringAtCol('AP'),
			sourceLink: stringAtCol('AQ'),
			isNSFW: !!stringAtCol('AR'),
			isTop: !!stringAtCol('AS'),
		},
		image: {
			link: stringAtCol('AT'),
			description: stringAtCol('AU'),
			source: stringAtCol('AV'),
			sourceLink: stringAtCol('AW'),
			isNSFW: !!stringAtCol('AX'),
			isTop: !!stringAtCol('AY'),
		},
		custom: {
			title: stringAtCol('AZ'),
			value: stringAtCol('BA'),
			link: stringAtCol('BB'),
			linkText: stringAtCol('BC'),
			previewLink: !!stringAtCol('BD'),
			hiddenValue: stringAtCol('BE'),
			isNSFW: !!stringAtCol('BF'),
			isTop: !!stringAtCol(postsColumnStop),
		}
	};
}