import { createCell } from '../../services/google-sheets/cell';
import { keepTruthy } from '../../services/util';
import { IMeta } from 'oftheday-shared';

/** The range of our meta items. */
export const metaRange = createCell('Read_Meta', 'B', 2).toRange('B', 7);

/** Takes in rows where each value in Meta is the first column of each row. */
export function parseMeta(rows: any[][]): IMeta {
	// Each row is a single column with our values.
	// Remember - Sheets will not return a row if all the cells inside it have no data.
	function tryRowSingleCell(rowNumber: number): any | null {
		const row = rows[rowNumber];
		return row ? row[0] : null;
	}

	return {
		important: keepTruthy(tryRowSingleCell(0), tryRowSingleCell(1)),
		error: keepTruthy(tryRowSingleCell(2), tryRowSingleCell(3)),
		shutdown: keepTruthy(tryRowSingleCell(4), tryRowSingleCell(5)),
	};
}