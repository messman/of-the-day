import { LocalStorageItem } from './local-storage';

export interface LocalStorageMigration<T> {
	(key: string, item: LocalStorageItem<T>): LocalStorageItem<T> | undefined;
}

export const allMigrations: LocalStorageMigration<any>[] = [
	(_, i) => i
];