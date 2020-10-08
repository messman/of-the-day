
import { stringAt, tryParseInt } from '../../services/primitives';
import { columnsFrom, createCell } from '../../services/google-sheets/cell';
import { keepTruthy } from '../../services/util';
import { IPost, IPostBasics, IPostCustom, IPostDayReference, IPostEndThoughts, IPostImage, IPostMusic, IPostQuote, IPostVideo, isValidPostElement } from 'oftheday-shared';

export const postsColumnStart = 'A';
export const postsColumnStop = 'BG';
/** Where the Posts sheet's data actually starts. Clone and offset to get start of range. */
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

		basics: passBasics({
			event: stringAtCol('G'),
			note: stringAtCol('H'),
			location: stringAtCol('I'),
			schedule: stringAtCol('J'),
			dayTypes: keepTruthy(stringAtCol('K'), stringAtCol('L')),
		}),
		endThoughts: passEndThoughts({
			value: stringAtCol('M'),
		}),
		music: passMusic({
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
		}),
		video: passVideo({
			title: stringAtCol('AB'),
			originalTitle: stringAtCol('AC'),
			link: stringAtCol('AD'),
			description: stringAtCol('AE'),
			isRemoved: !!stringAtCol('AF'),
			isNSFW: !!stringAtCol('AG'),
			isTop: !!stringAtCol('AH'),
			tags: keepTruthy(stringAtCol('AI'), stringAtCol('AJ'), stringAtCol('AK')),
		}),
		quote: passQuote({
			a: stringAtCol('AL'),
			aVoice: stringAtCol('AM'),
			b: stringAtCol('AN'),
			bVoice: stringAtCol('AO'),
			source: stringAtCol('AP'),
			sourceLink: stringAtCol('AQ'),
			isNSFW: !!stringAtCol('AR'),
			isTop: !!stringAtCol('AS'),
		}),
		image: passImage({
			link: stringAtCol('AT'),
			description: stringAtCol('AU'),
			source: stringAtCol('AV'),
			sourceLink: stringAtCol('AW'),
			isNSFW: !!stringAtCol('AX'),
			isTop: !!stringAtCol('AY'),
		}),
		custom: passCustom({
			title: stringAtCol('AZ'),
			value: stringAtCol('BA'),
			link: stringAtCol('BB'),
			linkText: stringAtCol('BC'),
			previewLink: !!stringAtCol('BD'),
			hiddenValue: stringAtCol('BE'),
			isNSFW: !!stringAtCol('BF'),
			isTop: !!stringAtCol(postsColumnStop),
		})
	};
}

function passBasics(basics: IPostBasics): IPostBasics | undefined {
	return isValidPostElement.basics(basics) ? basics : undefined;
}

function passEndThoughts(endThoughts: IPostEndThoughts): IPostEndThoughts | undefined {
	return isValidPostElement.endThoughts(endThoughts) ? endThoughts : undefined;
}

function passMusic(music: IPostMusic): IPostMusic | undefined {
	return isValidPostElement.music(music) ? music : undefined;
}

function passVideo(video: IPostVideo): IPostVideo | undefined {
	return isValidPostElement.video(video) ? video : undefined;
}

function passImage(image: IPostImage): IPostImage | undefined {
	return isValidPostElement.image(image) ? image : undefined;
}

function passQuote(quote: IPostQuote): IPostQuote | undefined {
	return isValidPostElement.quote(quote) ? quote : undefined;
}

function passCustom(custom: IPostCustom): IPostCustom | undefined {
	return isValidPostElement.custom(custom) ? custom : undefined;
}