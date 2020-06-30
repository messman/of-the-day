import * as React from 'react';
import { LocalStorageMigration, allMigrations } from './local-storage-migrations';
import { DEFINE } from '../define';

/** Using a wrapper object allows us to store falsy values. */
export interface LocalStorageItem<T> {
	i: T;
	/** Date.now (milliseconds UTC) */
	t: number;
	/** Version, to clear when we make changes */
	v: string;
}

/** Returns a function that will prefix the key to a namespace to avoid collisions. */
export function keyFactory(namespace: string): (key: string) => string {
	return function getKey(key: string) {
		return `${namespace}_${key}`;
	};
}

/**
 * Gets from LocalStorage. If no value exists, returns undefined.
 * Preserves falsy, empty string, and null.
 */
export function get<T>(key: string, migrations: LocalStorageMigration<T>[] | null): T | undefined {
	try {
		const stringItem = window.localStorage.getItem(key);
		if (stringItem) {
			const item = JSON.parse(stringItem) as LocalStorageItem<T>;
			let combinedMigrations = allMigrations;
			if (migrations && migrations.length) {
				combinedMigrations = [...allMigrations, ...migrations];
			}
			const migratedItem = runMigrations(key, item, combinedMigrations);
			if (!migratedItem) {
				remove(key);
			}
			if (migratedItem !== item) {
				set(key, migratedItem!.i);
			}
			return migratedItem!.i;
		}
	} catch (error) {
		console.log(error);
	}
	return undefined;
}

/** Sets to LocalStorage. */
export function set<T>(key: string, value: T): void {
	try {
		const wrapper: LocalStorageItem<T> = {
			i: value,
			t: Date.now(),
			v: DEFINE.buildVersion
		};
		window.localStorage.setItem(key, JSON.stringify(wrapper));
	} catch (error) {
		console.log(error);
	}
}

/** Removes from LocalStorage. */
export function remove(key: string): void {
	window.localStorage.removeItem(key);
}

function runMigrations<T>(key: string, item: LocalStorageItem<T> | undefined, migrations: LocalStorageMigration<T>[]): LocalStorageItem<T> | undefined {
	for (let i = 0; i < migrations.length - 1; i++) {
		if (item === undefined) {
			return undefined;
		}
		item = migrations[i](key, item);
	}
	return item;
}

export type UseLocalStorageReturn<T> = [T, (value: T) => void];

/**
 * Creates a state variable that also saves to LocalStorage.
 * Breaks when undefined is used as the value.
*/
export function useLocalStorage<T>(key: string, initialValue: T | (() => T), isValid: (value: T) => boolean, migrations: LocalStorageMigration<T>[] | null): UseLocalStorageReturn<T> {
	const [storedValue, setStoredValue] = React.useState(() => {
		let value: T | undefined = get<T>(key, migrations);
		if (value === undefined || (isValid && !isValid(value))) {
			value = initialValue instanceof Function ? initialValue() : initialValue;
			set(key, value);
		}
		return value;
	});

	function setValue(value: T): void {
		if (!Object.is(value, storedValue)) {
			setStoredValue(value);
			set(key, value);
		}
	};
	return [storedValue, setValue];
}