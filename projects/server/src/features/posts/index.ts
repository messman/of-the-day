import { IPostResponse, IPost, IPostDayReference } from 'oftheday-shared';
import { SheetsService } from '../../services/google-sheets/sheets-service';
import { getDayNumber } from '../../services/time';
import { postsColumnStop, parsePost, postsBaseFromCell } from './parse';
import { metaRange, parseMeta } from '../meta';
import { log } from '../../services/util';

const recentDaysToReturn = 7;

export async function getRecentPosts(sheetsService: SheetsService, includeTomorrow: boolean): Promise<IPostResponse> {
	const dayNumber = getDayNumber();
	return getPosts(sheetsService, includeTomorrow, dayNumber, recentDaysToReturn);
}

export async function getPosts(sheetsService: SheetsService, includeTomorrow: boolean, dayNumber: number, daysToReturn: number): Promise<IPostResponse> {
	try {
		// 0 means really 1 row, so subtract 1. 
		let extraRows = Math.min(dayNumber, daysToReturn) - 1;
		// Remove 1 for 0-based counting.
		let rowOffset = dayNumber - 1 - extraRows;
		// Including tomorrow means we return an extra day instead of replacing a day.
		if (includeTomorrow) {
			extraRows++;
		}
		const totalRows = extraRows + 1;

		const postsFromCell = postsBaseFromCell.clone();
		postsFromCell.row += rowOffset;
		const postsRange = postsFromCell.toRangeAdditive(postsColumnStop, extraRows);

		const ranges = [postsRange, metaRange];
		const values = await sheetsService.batchGet(ranges);

		const postResponse: IPostResponse = {
			meta: null!,
			posts: null!
		};

		// 0 - Posts
		{
			const postRecords = values[0];
			const posts: IPost[] = [];
			// Reverse so that most recent day (or tomorrow) is up top.
			let dayReferenceIndex = includeTomorrow ? -1 : 0;
			for (let i = totalRows - 1; i >= 0; i--) {
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
