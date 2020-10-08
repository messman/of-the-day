/** Signifies a cell of a Google Sheet. */
export interface Cell {
	/** The name of the sheet. */
	sheet: string;
	/** The letter of the column. */
	column: string;
	/** The row number. */
	row: number;

	/** Creates a new cell from what exists. */
	clone: () => Cell;
	/** Transforms the cell into Google Sheets text representation. */
	toText: () => string;
	/** Creates a Range, but by adding rows instead of declaring the end row. */
	toRangeAdditive: (toColumn: string, addRows: number) => Range;
	/** Creates a Range in the same sheet. */
	toRange: (toColumn: string, toRow: number) => Range;
}

export function createCell(sheet: string, column: string, row: number): Cell {

	let cell: Cell = null!;
	cell = {
		sheet: sheet,
		column: column,
		row: row,
		clone: () => {
			return createCell(cell.sheet, cell.column, cell.row);
		},
		toText: () => {
			return `${cell.sheet}!${cell.column}${cell.row}`;
		},
		toRangeAdditive: (toColumn: string, addRows: number) => {
			return cell.toRange(toColumn, cell.row + addRows);
		},
		toRange: (toColumn: string, toRow: number) => {
			return createRange(cell, createCell(cell.sheet, toColumn, toRow));
		}
	};

	return cell;
}

/** Represents a range in a Google Sheet. */
export interface Range {
	from: Cell;
	to: Cell;

	/** Creates a text representation of the range for Google Sheets, using the first sheet name. */
	toText: () => string;
}

export function createRange(from: Cell, to: Cell): Range {
	let range: Range = null!;
	range = {
		from: from,
		to: to,
		toText: () => {
			const { from, to } = range;
			return `${from.sheet}!${from.column}${from.row}:${to.column}${to.row}`;
		},
	};
	return range;
}

/**
 * Returns a function that can be used to safely pass row numbers.
 * The start row number will be used to correctly index in the array.
 */
export function rowsFrom(startRowNumber: number): (rowNumber: number) => number {
	return function (rowNumber: number) {
		return rowNumber - startRowNumber;
	};
}

/**
 * Returns a function that can be used to safely pass column letters.
 * The start column letter will be used to correctly index in the array.
 */
export function columnsFrom(startColumnLetter: string): (columnLetter: string) => number {
	const startColumnNumber = columnNumber(startColumnLetter);
	return function (columnLetter: string) {
		return columnNumber(columnLetter) - startColumnNumber;
	};
}

/**
 * Returns a 1-based map of letters to numbers.
 * A = 1, B = 2 ... AA = 27
*/
function columnNumber(columnLetter: string): number {
	let totalColumnNumber = 0;
	const length = columnLetter.length;
	for (let i = 0; i < length; i++) {
		const rightIndexPlace = length - i - 1;
		const letter = columnLetter[i];
		const columnNumber = columnMap[letter.toLowerCase() as keyof typeof columnMap];
		totalColumnNumber += columnNumber * Math.pow(26, rightIndexPlace);
	}
	return totalColumnNumber;
}

const columnMap = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5,
	f: 6,
	g: 7,
	h: 8,
	i: 9,
	j: 10,
	k: 11,
	l: 12,
	m: 13,
	n: 14,
	o: 15,
	p: 16,
	q: 17,
	r: 18,
	s: 19,
	t: 20,
	u: 21,
	v: 22,
	w: 23,
	x: 24,
	y: 25,
	z: 26
};