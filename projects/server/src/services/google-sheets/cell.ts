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