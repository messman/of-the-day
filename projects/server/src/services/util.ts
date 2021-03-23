export function log(...args: any[]): void {
	console.log('> ', new Date().toLocaleTimeString(), ...args);
}

const isTruthy = <T>(item: T) => { return !!item; };
export function keepTruthy<T>(...items: T[]): T[] {
	return items.filter(isTruthy);
}

export function notNull<T>(value: T | null): value is T {
	return !!value;
}

export function splitToArray(value: string | null): string[] {
	if (!value) {
		return [];
	}
	return value
		.split('///')
		.map((newValue) => {
			return newValue.trim();
		})
		.filter(isTruthy);
}