import { IPost, IArchiveFilter, IArchiveResponse, IArchiveRequest, IArchiveFilterRange, isFilterValid, IPostDayReference } from 'oftheday-shared';
import { SheetsService } from '../../services/google-sheets/sheets-service';
import { log, notNull } from '../../services/util';
import { MemoryCache } from '../../services/memory';
import { getDayNumber } from '../../services/time';
import { createPostsRange } from '../posts';
import { settings } from '../../env';
import { parsePost } from '../posts/parse';

export async function getArchive(sheetsService: SheetsService, request: IArchiveRequest, memory: MemoryCache<IArchiveCache>): Promise<IArchiveResponse> {
	try {

		/*
			There are two primary ways we could do this.
			First way:
				Use the filters to create our range, then contact the Sheets service to get just that range. Then filter it down.
			Second way:
				Always get *everything*, and cache everything in memory. Then filter it down, with slightly more work.
	
			It's a memory tradeoff, and the preference right now is to try it the second way and see if we run into memory issues.
			We could use a true external cache like Redis, but I think that's overkill for right now.
		*/
		/*
			Client side code will be responsible for sorting.
			Server is just filtering down.
		*/
		const { filter } = request;
		if (!isFilterValid(filter)) {
			log('archive', 'invalid filter');
			return {
				posts: []
			};
		}

		let posts = await getAllPosts(sheetsService, memory);
		if (posts.length === 0) {
			log('archive', 'no posts from all');
			return {
				posts: posts
			};
		}

		posts = filterByRange(posts, filter);
		posts = filterByTypeAndModifier(posts, filter);

		// Log it!
		log('archive', `${posts.length} posts`, settings.isDev ? filter : (filter.preset || 'custom'));

		return {
			posts: posts
		};
	}
	catch (e) {
		log('Could not get all information');
		throw e;
	}
}

export interface IArchiveCache {
	posts: IPost[];
	dayNumber: number;
}

async function getAllPosts(sheetsService: SheetsService, memory: MemoryCache<IArchiveCache>): Promise<IPost[]> {
	const dayNumber = getDayNumber();

	const hit = memory.registerHit();
	if (hit.cacheItemValue) {

		// Verify the cache item.
		if (hit.cacheItemValue.dayNumber === dayNumber) {
			log('archive', `cached - ${hit.timeRemainingInCache}ms remaining`);
			return hit.cacheItemValue.posts;
		}
		else {
			log('archive', 'cached - invalid day');
		}
	}

	const postsRange = createPostsRange(dayNumber, null, false);
	const values = await sheetsService.get(postsRange);

	const postRecords = values;
	const posts: IPost[] = [];
	// Reverse so that most recent day is up top.
	for (let i = postRecords.length; i >= 0; i--) {
		// Don't worry about the day reference in this view.
		posts.push(parsePost(postRecords[i], IPostDayReference.other));
	}

	const isCaching = memory.isCaching && posts.length > 0;
	if (isCaching) {
		memory.setCacheItemValue({
			dayNumber: dayNumber,
			posts: posts
		});
	}
	log('archive', isCaching ? `new - caching for ${memory.cacheExpiration}ms` : 'new - not caching');
	return posts;
}

function filterByRange(posts: IPost[], filter: IArchiveFilter): IPost[] {
	const { range } = filter;

	let rangeBeginEnd = [0, posts.length - 1];
	switch (range) {
		case IArchiveFilterRange.random7Days:
			// Get a random week - but don't make it the first week if possible.
			let startOffset = posts.length >= 21 ? 7 : Math.max(0, posts.length - 14);
			let startRange = posts.length >= 21 ? posts.length - 14 : (posts.length - startOffset - 7);
			let days = Math.min(7, posts.length);
			const randomWeekFirstIndex = Math.floor(Math.random() * startRange) + startOffset;
			rangeBeginEnd = [randomWeekFirstIndex, randomWeekFirstIndex + days - 1];
			break;
		case IArchiveFilterRange.last7Days:
			rangeBeginEnd = [0, 6];
			break;
		case IArchiveFilterRange.last31Days:
			rangeBeginEnd = [0, 30];
			break;
		case IArchiveFilterRange.last93Days:
			rangeBeginEnd = [0, 92];
			break;
		case IArchiveFilterRange.all:
		default:
			break;
	}

	const [rangeBegin, rangeEnd] = rangeBeginEnd;
	return posts.filter((_: IPost, i) => {
		return i >= rangeBegin && i <= rangeEnd;
	});
}

function filterByTypeAndModifier(posts: IPost[], filter: IArchiveFilter): IPost[] {
	const { types, modifiers } = filter;

	return posts
		.map<IPost | null>((post: IPost) => {
			if (post.isDayOff) {
				return null;
			}

			// Don't edit - copy.
			// The below code is gross, but it works.

			let music = (!!types.music && post.music && (!modifiers.excludeWithNSFWTag || !post.music.isNSFW) && (!modifiers.includeOnlyWithTopTag || post.music.isTop)) ? post.music : undefined;

			let video = (!!types.video && post.video && (!modifiers.excludeWithNSFWTag || !post.video.isNSFW) && (!modifiers.includeOnlyWithTopTag || post.video.isTop)) ? post.video : undefined;

			let image = (!!types.image && post.image && (!modifiers.excludeWithNSFWTag || !post.image.isNSFW) && (!modifiers.includeOnlyWithTopTag || post.image.isTop)) ? post.image : undefined;

			let quote = (!!types.quote && post.quote && (!modifiers.excludeWithNSFWTag || !post.quote.isNSFW) && (!modifiers.includeOnlyWithTopTag || post.quote.isTop)) ? post.quote : undefined;

			let custom = (!!types.custom && post.custom && (!modifiers.excludeWithNSFWTag || !post.custom.isNSFW) && (!modifiers.includeOnlyWithTopTag || post.custom.isTop)) ? post.custom : undefined;

			if (music || video || image || quote || custom) {
				return {
					...post,
					basics: undefined,
					endThoughts: undefined,
					music: music,
					video: video,
					image: image,
					quote: quote,
					custom: custom
				};
			}
			return null;
		})
		.filter(notNull);
}