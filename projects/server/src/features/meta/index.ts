import { createCell } from '../../services/google-sheets/cell';
import { keepTruthy } from '../../services/util';
import { Meta } from 'oftheday-shared';

/** The range of our meta items. */
export const metaRange = createCell('Read_Meta', 'B', 2).toRange('B', 7);

/** Takes in rows where each value in Meta is the first column of each row. */
export function mapMetaFromRows(rows: any[][]): Meta {

	// Each row is a single column with our values.
	return {
		important: keepTruthy(rows[0][0], rows[1][0]),
		error: keepTruthy(rows[2][0], rows[3][0]),
		shutdown: keepTruthy(rows[4][0], rows[5][0]),
	};
}