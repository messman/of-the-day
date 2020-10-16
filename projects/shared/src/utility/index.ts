/** 
 * Gets the keys of an enum as a string array.
 * Useful for looping to validate values or set values.
*/
export function enumKeys<T>(enumObject: T): (keyof T)[] {
	// Note: there are two isNaNs in this world. 
	return Object.keys(enumObject).filter(k => isNaN(Number(k))) as (keyof T)[];
}