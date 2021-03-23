
import { stringAt, stringsAt, tryParseInt } from '../../services/primitives';
import { columnsFrom, createCell } from '../../services/google-sheets/cell';
import { keepTruthy } from '../../services/util';
import { IPost, IPostCustom, IPostDayReference, IPostImage, IPostMusic, IPostPersonal, IPostQuote, IPostVideo, isValidPostElement } from 'oftheday-shared';

export const postsColumnStart = 'A';
export const postsColumnStop = 'BG';
/** Where the Posts sheet's data actually starts. Clone and offset to get start of range. */
export const postsBaseFromCell = createCell('Read_Posts', postsColumnStart, 3);

export function parsePost(row: any[], dayReference: IPostDayReference): IPost {
	const col = columnsFrom(postsColumnStart);
	function stringAtCol(columnLetter: string): string {
		return stringAt(row, col(columnLetter));
	}

	function stringsAtCol(columnLetter: string): string[] {
		return stringsAt(row, col(columnLetter));
	}

	return {
		date: stringAtCol(postsColumnStart),
		dateText: stringAtCol('B'),
		dayNumber: tryParseInt(stringAtCol('C'), -1),
		dayReference: dayReference,
		isDayOff: !!stringAtCol('E'),
		dayOffMessage: stringAtCol('F'),

		personal: passPersonal({
			event: stringAtCol('G'),
			note: stringsAtCol('H'),
			location: stringAtCol('I'),
			schedule: stringAtCol('J'),
			dayTypes: keepTruthy(stringAtCol('K'), stringAtCol('L')),
			/*
				Note: in March 2021 this changed from *today* thoughts to
				*yesterday* thoughts.
			*/
			previousDayThoughts: stringsAtCol('M')
		}),
		music: passMusic({
			title: stringAtCol('N'),
			artist: stringAtCol('O'),
			year: stringAtCol('P'),
			isNSFW: !!stringAtCol('Q'),
			isTop: !!stringAtCol('R'),
			tags: keepTruthy(stringAtCol('S'), stringAtCol('T'), stringAtCol('U')),
			spotifyLink: stringAtCol('V'),
			youTubeLink: stringAtCol('W'),
			useYouTube: !!stringAtCol('X'),
			geniusLink: stringAtCol('Y'),
			description: stringsAtCol('Z'),
			quote: stringAtCol('AA'),
		}),
		video: passVideo({
			customTitle: stringAtCol('AB'),
			customTitleCreator: stringAtCol('AC'),
			originalTitle: stringAtCol('AD'),
			link: stringAtCol('AE'),
			description: stringsAtCol('AF'),
			isRemoved: !!stringAtCol('AG'),
			isNSFW: !!stringAtCol('AH'),
			isTop: !!stringAtCol('AI'),
			tags: keepTruthy(stringAtCol('AJ'), stringAtCol('AK'), stringAtCol('AL')),
		}),
		quote: passQuote({
			a: stringAtCol('AM'),
			aVoice: stringAtCol('AN'),
			b: stringAtCol('AO'),
			bVoice: stringAtCol('AP'),
			sourceText: stringAtCol('AQ'),
			sourceLink: stringAtCol('AR'),
			isNSFW: !!stringAtCol('AS'),
			isTop: !!stringAtCol('AT'),
		}),
		image: passImage({
			link: stringAtCol('AU'),
			description: stringsAtCol('AV'),
			sourceLink: stringAtCol('AW'),
			sourceText: stringAtCol('AX'),
			isNSFW: !!stringAtCol('AY'),
			isTop: !!stringAtCol('AZ'),
		}),
		custom: passCustom({
			title: stringAtCol('BA'),
			value: stringsAtCol('BB'),
			link: stringAtCol('BC'),
			linkText: stringAtCol('BD'),
			hiddenValue: stringAtCol('BE'),
			isNSFW: !!stringAtCol('BF'),
			isTop: !!stringAtCol(postsColumnStop),
		})
	};
}

function passPersonal(personal: IPostPersonal): IPostPersonal | undefined {
	return isValidPostElement.personal(personal) ? personal : undefined;
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