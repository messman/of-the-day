import { IPostResponse, IPost, IPostDayReference } from 'oftheday-shared';
import { SheetsService } from '../../services/google-sheets/sheets-service';
import { getDayNumber } from '../../services/time';
import { postsColumnStop, parsePost, postsBaseFromCell } from './parse';
import { metaRange, parseMeta } from '../meta';
import { log } from '../../services/util';
import { Range } from '../../services/google-sheets/cell';
import { MemoryCache } from '../../services/memory';
import { settings } from '../../env';

const recentDaysToReturn = 14;

export async function getRecentPostsIncludingFuture(sheetsService: SheetsService): Promise<IPostResponse> {
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

export async function getPosts(sheetsService: SheetsService, includeFuture: boolean, dayNumber: number, daysToReturn: number): Promise<IPostResponse> {
	try {
		const postsRange = createPostsRange(dayNumber, daysToReturn, includeFuture);
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
			// Reverse so that most recent day (or future) is up top.
			// We know the rows exist, even if they are invalid. So
			// no need to do fancy validation logic just yet.
			let daysFromFutureToToday = includeFuture ? futureDaysToReturn : 0;
			for (let i = postRecords.length - 1; i >= 0; i--) {
				let dayReference = IPostDayReference.other;
				if (daysFromFutureToToday > 0) {
					dayReference = IPostDayReference.future;
				}
				else if (daysFromFutureToToday === 0) {
					dayReference = IPostDayReference.today;
				}
				else if (daysFromFutureToToday === -1) {
					dayReference = IPostDayReference.yesterday;
				}

				posts.push(parsePost(postRecords[i], dayReference));
				daysFromFutureToToday--;
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

export const futureDaysToReturn = 3;

/**
 * Creates a cell range to capture the data for the day inputs provided.
 * @param daysToReturn - days (including the day number) to return, moving backwards. if null, retrieves all days.
 */
export function createPostsRange(latestDayNumber: number, daysToReturn: number | null, includeFuture: boolean): Range {
	// Constrain our days to return to be the day number.
	daysToReturn = Math.min(daysToReturn || latestDayNumber, latestDayNumber);

	// start row, meaning, closer to top and earlier. This is the offset from the first row to our start row.
	let startRowOffset = latestDayNumber - daysToReturn;
	// Rows to capture from the start row.
	// Subtract 1, because our starting row already counts as a row in Google Sheets.
	let rowsUntilStop = daysToReturn - 1;

	// Including future means we return extra days (rows) instead of replacing days.
	if (includeFuture) {
		rowsUntilStop += futureDaysToReturn;
	}

	const postsFromCell = postsBaseFromCell.clone();
	postsFromCell.row += startRowOffset;
	const range = postsFromCell.toRangeAdditive(postsColumnStop, rowsUntilStop);

	if (settings.isDev) {
		//log('debug', { latestDayNumber, daysToReturn, includeFuture, rowsUntilStop, range: range.toText() });
	}
	return range;
}
