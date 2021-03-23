import { createCell, rowsFrom } from '../../services/google-sheets/cell';
import { keepTruthy } from '../../services/util';
import { IMeta } from 'oftheday-shared';

const metaRangeStartRow = 2;
const metaRangeLastRow = 9;
/** The range of our meta items. */
export const metaRange = createCell('Read_Meta', 'B', metaRangeStartRow).toRange('B', metaRangeLastRow);

/** Takes in rows where each value in Meta is the first column of each row. */
export function parseMeta(rows: any[][]): IMeta {
	const row = rowsFrom(metaRangeStartRow);

	// Each row is a single column with our values.
	// Remember - Sheets will not return a row if all the cells inside it have no data.
	function tryRowSingleCell(rowNumber: number): string {
		const rowArr = rows[row(rowNumber)];
		return rowArr ? (rowArr[0] || '') : '';
	}

	return {
		// These should have really just been one cell with a splitter pattern... but I'd rather not change it.
		important: keepTruthy(tryRowSingleCell(metaRangeStartRow), tryRowSingleCell(3)),
		error: keepTruthy(tryRowSingleCell(4), tryRowSingleCell(5)),
		shutdown: keepTruthy(tryRowSingleCell(6), tryRowSingleCell(7)),
		spotifyLink: tryRowSingleCell(8) || '',
		youTubeLink: tryRowSingleCell(metaRangeLastRow) || '',
	};
}