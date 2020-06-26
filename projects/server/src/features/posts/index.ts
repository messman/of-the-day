import { createCell } from '../../services/google-sheets/cell';
import { OfTheDayData, DailyRecord, MusicRecord } from 'oftheday-shared';
import { SheetsService } from '../../services/google-sheets/sheets-service';
import { getDayNumber } from '../../services/time';
import { checklistRange, keyValRange } from '../other';
import { parseDailyRecord, parseMusicRecord, parseKeyVal } from './parse';
import { stringAt } from '../../services/primitives';

/** Where the "Daily" sheet's data actually starts. Cloned and offset to get start of range. */
const dailyBaseFromCell = createCell('Daily', 'A', 3);
/** Where the row data for the Music sheet starts. */
const musicBaseFromCell = createCell('Music', 'A', 3);
const daysToReturn = 7;

export async function getRecentPosts(sheetsService: SheetsService, includeTomorrow: boolean): Promise<OfTheDayData> {
	try {
		const dayNumber = getDayNumber();

		// 0 means really 1 row, so subtract 1. 
		let extraRows = Math.min(dayNumber, daysToReturn) - 1;
		// Remove 1 for 0-based counting.
		let rowOffset = dayNumber - 1 - extraRows;
		if (includeTomorrow) {
			extraRows++;
		}
		const totalRows = extraRows + 1;

		const dailyFromCell = dailyBaseFromCell.clone();
		dailyFromCell.row += rowOffset;
		const dailyRange = dailyFromCell.toRangeAdditive('M', extraRows);

		const musicFromCell = musicBaseFromCell.clone();
		musicFromCell.row += rowOffset;
		const musicRange = musicFromCell.toRangeAdditive('M', extraRows);

		const ranges = [dailyRange, musicRange, checklistRange, keyValRange];
		const values = await sheetsService.batchGet(ranges);

		const data: OfTheDayData = {
			dailyRecords: null!,
			musicRecords: null!,
			keyVal: null!,
			checklistToDo: null!,
			checklistDone: null!
		};

		// 0 and 1 - Day and Music records
		{
			const dayRecordsValues = values[0];
			const musicRecordsValues = values[1];

			const dailyRecords: DailyRecord[] = [];
			const musicRecords: MusicRecord[] = [];

			// Reverse so that most recent day is up top.
			for (let i = totalRows - 1; i >= 0; i--) {
				dailyRecords.push(parseDailyRecord(dayRecordsValues[i]));
				musicRecords.push(parseMusicRecord(musicRecordsValues[i]));
			}

			data.dailyRecords = dailyRecords;
			data.musicRecords = musicRecords;
		}

		// 2 - Checklist records
		{
			const checklistRecordsValues = values[2];

			const toDo: string[] = [];
			const done: string[] = [];
			checklistRecordsValues.forEach((row) => {
				const toDoItem = stringAt(row, 0);
				if (toDoItem) {
					toDo.push(toDoItem);
				}
				const doneItem = stringAt(row, 1);
				if (doneItem) {
					done.push(doneItem);
				}
			});

			data.checklistToDo = toDo;
			data.checklistDone = done;
		}

		// 3 - KeyVal records
		{
			var keyValRecordsValues = values[3];
			data.keyVal = parseKeyVal(keyValRecordsValues);
		}

		return data;
	}
	catch (e) {
		console.error('Could not get all information');
		throw e;
	}
}