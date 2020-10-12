import { IArchiveFilter, IArchiveFilterSort, IPost } from 'oftheday-shared';

export function sortPosts(filter: IArchiveFilter, posts: IPost[]): IPost[] {

	switch (filter.sort) {
		case IArchiveFilterSort.dayDecreasing:
			// This is already how posts are returned from the server.
			return posts.sort(sortByDayDecreasing);
		case IArchiveFilterSort.dayIncreasing:
			return posts.sort(sortByDayIncreasing);
		case IArchiveFilterSort.dayRandom:
			return sortRandom(posts);
		case IArchiveFilterSort.musicArtistIncreasing:
			return posts.sort(sortByMusicArtistIncreasing);
	}
}

function sortByDayDecreasing(a: IPost, b: IPost): number {
	return b.dayNumber - a.dayNumber;
}

function sortByDayIncreasing(a: IPost, b: IPost): number {
	return a.dayNumber - b.dayNumber;
}

function sortByMusicArtistIncreasing(a: IPost, b: IPost): number {
	if (!a.music && !b.music) {
		return 0;
	}
	if (!a.music) {
		return 1;
	}
	if (!b.music) {
		return -1;
	}

	if (a.music.artist === b.music.artist) {
		return 0;
	}
	return a.music.artist > b.music.artist ? 1 : -1;
}

export function sortRandom<T>(arr: T[]): T[] {
	const arrayCopy = [...arr];

	for (let i = arrayCopy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
	}

	return arrayCopy;
}