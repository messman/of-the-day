export function enumKeys<T>(enumObject: T): (keyof T)[] {
	return Object.keys(enumObject).filter(k => isNaN(Number(k))) as (keyof T)[];
}