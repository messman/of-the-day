import { IPost, IPostReactionSummary } from 'oftheday-shared';
import { stringAt, tryParseInt } from '../../services/primitives';
import { columnsFrom } from '../../services/google-sheets/cell';
import { keepTruthy } from '../../services/util';

export function parsePost(row: any[]): IPost {
	const col = columnsFrom('A');
	function stringAtCol(columnLetter: string): string {
		return stringAt(row, col(columnLetter));
	}

	return {
		date: stringAtCol('A'),
		dateText: stringAtCol('B'),
		dayNumber: tryParseInt(stringAtCol('C'), -1),
		isDayOff: !!stringAtCol('E'),
		dayOffMessage: stringAtCol('F'),

		basics: {
			event: stringAtCol('G'),
			note: stringAtCol('H'),
			location: stringAtCol('I'),
			schedule: stringAtCol('J'),
			dayTypes: keepTruthy(stringAtCol('K'), stringAtCol('L')),
			reactionSummary: createEmptyReactionSummary()
		},
		endThoughts: {
			value: stringAtCol('M'),
			reactionSummary: createEmptyReactionSummary()
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
			reactionSummary: createEmptyReactionSummary()
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
			reactionSummary: createEmptyReactionSummary()
		},
		quote: {
			a: stringAtCol('AL'),
			aVoice: stringAtCol('AM'),
			b: stringAtCol('AN'),
			bVoice: stringAtCol('AO'),
			source: stringAtCol('AP'),
			sourceLink: stringAtCol('AQ'),
			reactionSummary: createEmptyReactionSummary()
		},
		image: {
			link: stringAtCol('AR'),
			description: stringAtCol('AS'),
			source: stringAtCol('AT'),
			sourceLink: stringAtCol('AU'),
			reactionSummary: createEmptyReactionSummary()
		},
		custom: {
			title: stringAtCol('AV'),
			value: stringAtCol('AW'),
			link: stringAtCol('AX'),
			linkText: stringAtCol('AY'),
			previewLink: !!stringAtCol('AZ'),
			reactionSummary: createEmptyReactionSummary()
		}
	};
}

function createEmptyReactionSummary(): IPostReactionSummary {
	return {
		emoji: [],
		replies: 0
	};
}