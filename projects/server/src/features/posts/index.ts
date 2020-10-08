import { IPostResponse, IPost, IPostDayReference } from 'oftheday-shared';
import { SheetsService } from '../../services/google-sheets/sheets-service';
import { getDayNumber } from '../../services/time';
import { postsColumnStop, parsePost, postsBaseFromCell } from './parse';
import { metaRange, parseMeta } from '../meta';
import { log } from '../../services/util';
import { Range } from '../../services/google-sheets/cell';
import { MemoryCache } from '../../services/memory';

const recentDaysToReturn = 7;

export async function getRecentPostsIncludingTomorrow(sheetsService: SheetsService): Promise<IPostResponse> {
	return getPosts(sheetsService, true, getDayNumber(), recentDaysToReturn);
}

export async function getRecentPosts(sheetsService: SheetsService, memory: MemoryCache<IPostResponse>): Promise<IPostResponse> {
	const dayNumber = getDayNumber();

	const hit = memory.registerHit();
	if (hit.cacheItemValue) {

		// Verify the cache item.
		if (hit.cacheItemValue.dayNumber === dayNumber) {
			log('posts', `cached - ${hit.timeRemainingInCache}ms remaining`);
			return hit.cacheItemValue;
		}
		else {
			log('posts', 'cached - invalid day');
		}
	}

	const response = await getPosts(sheetsService, false, dayNumber, recentDaysToReturn);
	memory.setCacheItemValue(response);
	log('posts', memory.isCaching ? `new - caching for ${memory.cacheExpiration}ms` : 'new - not caching');
	return response;
}

export async function getPosts(sheetsService: SheetsService, includeTomorrow: boolean, dayNumber: number, daysToReturn: number): Promise<IPostResponse> {
	try {
		const postsRange = createPostsRange(dayNumber, daysToReturn, includeTomorrow);
		const ranges = [postsRange, metaRange];
		const values = await sheetsService.batchGet(ranges);

		const postResponse: IPostResponse = {
			meta: null!,
			posts: null!,
			dayNumber: dayNumber
		};

		// 0 - Posts
		{
			const postRecords = values[0];
			const posts: IPost[] = [];
			// Reverse so that most recent day (or tomorrow) is up top.
			let dayReferenceIndex = includeTomorrow ? -1 : 0;
			for (let i = postRecords.length; i >= 0; i--) {
				let dayReference: IPostDayReference = null!;
				switch (dayReferenceIndex) {
					case -1:
						dayReference = IPostDayReference.tomorrow;
						break;
					case 0:
						dayReference = IPostDayReference.today;
						break;
					case 1:
						dayReference = IPostDayReference.yesterday;
						break;
					default:
						dayReference = IPostDayReference.other;
				}

				posts.push(parsePost(postRecords[i], dayReference));
				dayReferenceIndex++;
			}
			postResponse.posts = posts;
		}

		// 1 - Meta
		{
			const metaRecords = values[1];
			postResponse.meta = parseMeta(metaRecords);
		}

		return postResponse;
	}
	catch (e) {
		log('Could not get all information');
		throw e;
	}
}

/**
 * Creates a cell range to capture the data for the day inputs provided.
 * @param daysToReturn - days (including the day number) to return, moving backwards. if null, retrieves all days.
 */
export function createPostsRange(latestDayNumber: number, daysToReturn: number | null, includeTomorrow: boolean): Range {
	// Constrain our days to return to be the day number.
	daysToReturn = Math.min(daysToReturn || latestDayNumber, latestDayNumber);

	// start row, meaning, closer to top and earlier. This is the offset from the first row to our start row.
	let startRowOffset = latestDayNumber - daysToReturn;
	// Rows to capture from the start row.
	// Subtract 1, because our starting row already counts as a row in Google Sheets.
	let rowsUntilStop = daysToReturn - 1;

	// Including tomorrow means we return an extra day instead of replacing a day.
	if (includeTomorrow) {
		rowsUntilStop++;
	}

	const postsFromCell = postsBaseFromCell.clone();
	postsFromCell.row += startRowOffset;
	const range = postsFromCell.toRangeAdditive(postsColumnStop, rowsUntilStop);

	log('debug', { latestDayNumber, daysToReturn, includeTomorrow, rowsUntilStop, range: range.toText() });
	return range;
}
