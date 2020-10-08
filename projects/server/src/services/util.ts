export function log(...args: any[]): void {
	console.log('>', ...args);
}

const isTruthy = <T>(item: T) => { return !!item; };
export function keepTruthy<T>(...items: T[]): T[] {
	return items.filter(isTruthy);
}

export function notNull<T>(value: T | null): value is T {
	return !!value;
}