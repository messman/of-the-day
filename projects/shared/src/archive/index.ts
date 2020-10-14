import { IPost, IPostElementType, keysOfIPostElementType } from '../posts';
import { enumKeys } from '../utility';

export interface IArchiveRequest {
	filter: IArchiveFilter;
}

export interface IArchiveResponse {
	posts: IPost[];
}

export interface IArchiveFilter {
	types: IArchiveTypeSwitches;
	modifiers: IArchiveFilterModifierSwitches;
	range: IArchiveFilterRange;
	sort: IArchiveFilterSort;
	preset?: IArchiveFilterPreset;
}

export type IArchiveTypeSwitches = Record<keyof typeof IPostElementType, boolean>;

export enum IArchiveFilterModifier {
	includeOnlyWithTopTag,
	excludeWithNSFWTag
}
export const keysOfFilterModifier = enumKeys(IArchiveFilterModifier);

export type IArchiveFilterModifierSwitches = Record<keyof typeof IArchiveFilterModifier, boolean>;

export enum IArchiveFilterRange {
	random7Days,
	last7Days,
	last31Days,
	last93Days,
	all,
}
export const keysOfFilterRange = enumKeys(IArchiveFilterRange);

export enum IArchiveFilterPreset {
	random7Days,
	recentTop,
	recentMusic,
	recentVideo,
}
export const keysOfFilterPreset = enumKeys(IArchiveFilterPreset);

export enum IArchiveFilterSort {
	dayIncreasing,
	dayDecreasing,
	dayRandom,
	musicArtistIncreasing,
}
export const keysOfFilterSort = enumKeys(IArchiveFilterSort);

/**
 * Returns true if filter is exactly the same by value.
 * Note, this comparison should not be used for determining whether to refresh data (because of potential randomness).
 * Compares sort and presets.
*/
export function isFilterExactlyEqual(filterA: IArchiveFilter, filterB: IArchiveFilter, comparePreset: boolean): boolean {
	// Check by reference first.
	if (filterA === filterB) {
		return true;
	}
	if (!isFilterTypesEqual(filterA, filterB)) {
		return false;
	}
	if (!isFilterModifiersEqual(filterA, filterB)) {
		return false;
	}

	// Compare range
	if (filterA.range !== filterB.range) {
		return false;
	}
	// Compare sort
	if (filterA.sort !== filterB.sort) {
		return false;
	}
	// Compare preset
	if (comparePreset && filterA.preset !== filterB.preset) {
		return false;
	}
	return true;
}

/**
 * Returns true if filter is semantically the same, regardless of filter result data.
 * Use of randomness options will make filters unequal.
 * Does not compare sort or presets.
*/
export function isFilterSemanticallyEqual(filterA: IArchiveFilter, filterB: IArchiveFilter): boolean {
	// Check by reference first.
	if (filterA === filterB) {
		return true;
	}
	if (!isFilterTypesEqual(filterA, filterB)) {
		return false;
	}
	if (!isFilterModifiersEqual(filterA, filterB)) {
		return false;
	}

	// Compare range
	if (filterA.range !== filterB.range || filterA.range === IArchiveFilterRange.random7Days || filterB.range === IArchiveFilterRange.random7Days) {
		return false;
	}

	// Don't compare sort
	// Don't compare preset
	return true;
}

function isFilterTypesEqual(filterA: IArchiveFilter, filterB: IArchiveFilter): boolean {
	// Compare included post elements
	const typesA = filterA.types;
	const typesB = filterB.types;
	const areAllTypesEqual = keysOfIPostElementType.every((key) => {
		return !!typesA[key] === !!typesB[key];
	});
	return areAllTypesEqual;
}

function isFilterModifiersEqual(filterA: IArchiveFilter, filterB: IArchiveFilter): boolean {
	// Compare modifiers
	const modifiersA = filterA.modifiers;
	const modifiersB = filterB.modifiers;
	if (modifiersA.includeOnlyWithTopTag !== modifiersB.includeOnlyWithTopTag) {
		return false;
	}
	if (modifiersA.excludeWithNSFWTag !== modifiersB.excludeWithNSFWTag) {
		return false;
	}
	return true;
}

/**
 * Returns true if filter is semantically the same, regardless of filter result data.
 * Use of randomness options will make filters unequal.
 * Does not compare sort or presets.
*/
export function isFilterSortSemanticallyEqual(filterA: IArchiveFilter, filterB: IArchiveFilter): boolean {
	return !!filterA && !!filterB && filterA.sort === filterB.sort && filterA.sort !== IArchiveFilterSort.dayRandom && filterB.sort !== IArchiveFilterSort.dayRandom;
}

/** Returns true if the filter would return any data. **/
export function isFilterValid(filter: IArchiveFilter): boolean {
	if (!filter) {
		return false;
	}

	// Return if any element type is selected.
	return keysOfIPostElementType.some((type) => {
		return !!filter.types[type];
	});
}

/** An invalid starting filter. */
export const defaultInvalidFilter: IArchiveFilter = {
	types: {
		notes: false,
		schedule: false,
		location: false,
		endThoughts: false,
		music: false,
		video: false,
		image: false,
		quote: false,
		custom: false
	},
	modifiers: {
		includeOnlyWithTopTag: false,
		excludeWithNSFWTag: false,
	},
	range: IArchiveFilterRange.last7Days,
	sort: IArchiveFilterSort.dayDecreasing,
};

export function cloneFilter(filter: IArchiveFilter): IArchiveFilter {

	const types: IArchiveTypeSwitches = {} as unknown as IArchiveTypeSwitches;
	keysOfIPostElementType.forEach((type) => {
		types[type] = filter.types[type];
	});

	return {
		types: types,
		modifiers: {
			includeOnlyWithTopTag: filter.modifiers.includeOnlyWithTopTag,
			excludeWithNSFWTag: filter.modifiers.excludeWithNSFWTag
		},
		range: filter.range,
		sort: filter.sort,
		preset: filter.preset
	};
}

export const filterPresets: Record<keyof typeof IArchiveFilterPreset, IArchiveFilter> = {
	random7Days: {
		types: {
			notes: false,
			schedule: false,
			location: false,
			endThoughts: false,
			music: true,
			video: true,
			image: true,
			quote: true,
			custom: true
		},
		modifiers: {
			includeOnlyWithTopTag: false,
			excludeWithNSFWTag: false
		},
		range: IArchiveFilterRange.random7Days,
		sort: IArchiveFilterSort.dayIncreasing,
		preset: IArchiveFilterPreset.random7Days
	},
	recentTop: {
		types: {
			notes: false,
			schedule: false,
			location: false,
			endThoughts: false,
			music: true,
			video: true,
			image: true,
			quote: true,
			custom: true
		},
		modifiers: {
			includeOnlyWithTopTag: true,
			excludeWithNSFWTag: false
		},
		range: IArchiveFilterRange.last93Days,
		sort: IArchiveFilterSort.dayDecreasing,
		preset: IArchiveFilterPreset.recentTop
	},
	recentMusic: {
		types: {
			notes: false,
			schedule: false,
			location: false,
			endThoughts: false,
			music: true,
			video: false,
			image: false,
			quote: false,
			custom: false
		},
		modifiers: {
			includeOnlyWithTopTag: false,
			excludeWithNSFWTag: false
		},
		range: IArchiveFilterRange.last93Days,
		sort: IArchiveFilterSort.dayDecreasing,
		preset: IArchiveFilterPreset.recentMusic
	},
	recentVideo: {
		types: {
			notes: false,
			schedule: false,
			location: false,
			endThoughts: false,
			music: false,
			video: true,
			image: false,
			quote: false,
			custom: false
		},
		modifiers: {
			includeOnlyWithTopTag: false,
			excludeWithNSFWTag: false
		},
		range: IArchiveFilterRange.last93Days,
		sort: IArchiveFilterSort.dayDecreasing,
		preset: IArchiveFilterPreset.recentVideo
	}
};
