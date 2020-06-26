export function stringAt(arr: any[], index: number): string {
	if (!arr) {
		return '';
	}
	return (arr[index] || '').toString();
}

export function tryParseInt(value: any, fallback: number): number {
	if (value === null || value === '' || value === undefined) {
		return fallback;
	}
	const parsed = parseInt(value, 10);
	return isNaN(parsed) ? fallback : parsed;
}