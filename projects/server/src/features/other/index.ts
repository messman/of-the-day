import { createCell } from '../../services/google-sheets/cell';

/** The full range of our checklist items - only 10 rows allowed. */
export const checklistRange = createCell('Checklist', 'A', 2).toRange('B', 11);
/** The full range of our key-value pairs. */
export const keyValRange = createCell('KeyVal', 'A', 1).toRange('B', 5);

// export async function getRecentPosts(sheetsService: SheetsService, includeTomorrow: boolean): Promise<PostResponse> {
// 	try {
// 		const dayNumber = getDayNumber();

// 		// 0 means really 1 row, so subtract 1. 
// 		let extraRows = Math.min(dayNumber, daysToReturn) - 1;
// 		// Remove 1 for 0-based counting.
// 		let rowOffset = dayNumber - 1 - extraRows;
// 		// Including tomorrow means we return an extra day instead of replacing a day.
// 		if (includeTomorrow) {
// 			extraRows++;
// 		}
// 		const totalRows = extraRows + 1;

// 		const postsFromCell = postsBaseFromCell.clone();
// 		postsFromCell.row += rowOffset;
// 		const dailyRange = postsFromCell.toRangeAdditive('AZ', extraRows);

// 		const ranges = [dailyRange, metaRange];
// 		const values = await sheetsService.batchGet(ranges);

// 		const data: OfTheDayData = {
// 			dailyRecords: null!,
// 			musicRecords: null!,
// 			keyVal: null!,
// 			checklistToDo: null!,
// 			checklistDone: null!
// 		};

// 		// 0 and 1 - Day and Music records
// 		{
// 			const dayRecordsValues = values[0];
// 			const musicRecordsValues = values[1];

// 			const dailyRecords: DailyRecord[] = [];
// 			const musicRecords: MusicRecord[] = [];

// 			// Reverse so that most recent day is up top.
// 			for (let i = totalRows - 1; i >= 0; i--) {
// 				dailyRecords.push(parseDailyRecord(dayRecordsValues[i]));
// 				musicRecords.push(parseMusicRecord(musicRecordsValues[i]));
// 			}

// 			data.dailyRecords = dailyRecords;
// 			data.musicRecords = musicRecords;
// 		}

// 		// 2 - Checklist records
// 		{
// 			const checklistRecordsValues = values[2];

// 			const toDo: string[] = [];
// 			const done: string[] = [];
// 			checklistRecordsValues.forEach((row) => {
// 				const toDoItem = stringAt(row, 0);
// 				if (toDoItem) {
// 					toDo.push(toDoItem);
// 				}
// 				const doneItem = stringAt(row, 1);
// 				if (doneItem) {
// 					done.push(doneItem);
// 				}
// 			});

// 			data.checklistToDo = toDo;
// 			data.checklistDone = done;
// 		}

// 		// 3 - KeyVal records
// 		{
// 			var keyValRecordsValues = values[3];
// 			data.keyVal = parseKeyVal(keyValRecordsValues);
// 		}

// 		return data;
// 	}
// 	catch (e) {
// 		console.error('Could not get all information');
// 		throw e;
// 	}
// }