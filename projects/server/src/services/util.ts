export function log(...args: any[]): void {
	console.log('>', ...args);
}

const isTruthy = <T>(item: T) => { return !!item; };
export function keepTruthy<T>(...items: T[]): T[] {
	return items.filter(isTruthy);
}