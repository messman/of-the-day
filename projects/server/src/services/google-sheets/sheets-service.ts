import { sheets_v4, google } from 'googleapis';
import { Range } from './cell';

export interface SheetsService {
	get: (ranges: Range) => Promise<any[][]>;
	batchGet: (ranges: Range[]) => Promise<any[][][]>;
}

export function createSheetsService(credentials: { [index: string]: any; } | null, sheetId: string): SheetsService {
	if (!credentials) {
		throw new Error('Credentials are null. Cannot create service.');
	}
	const auth = new google.auth.GoogleAuth({
		credentials: {
			client_email: credentials['client_email'],
			private_key: credentials['private_key']
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
	});
	const sheets = google.sheets({ version: 'v4', auth });

	return {
		get: async (range) => {
			const result = await sheets.spreadsheets.values.get({
				spreadsheetId: sheetId,
				range: range.toText()
			});
			throwIfEmpty(result.data, result);
			return result.data.values!;
		},
		batchGet: async (ranges) => {
			const result = await sheets.spreadsheets.values.batchGet({
				spreadsheetId: sheetId,
				ranges: ranges.map((range) => {
					return range.toText();
				})
			});
			const valueRanges = result.data.valueRanges;
			if (!valueRanges || !valueRanges.length) {
				throw new Error('Empty result range on batch get');
			}
			const simpleValueRanges = valueRanges.map((valueRange) => {
				throwIfEmpty(valueRange, result);
				return valueRange.values!;
			});
			return simpleValueRanges;
		}
	};
}

function throwIfEmpty(valueRange: sheets_v4.Schema$ValueRange, result: any): void {
	if (!valueRange.values || !valueRange.values.length) {
		console.error(result);
		throw new Error(`Empty result on fetch for range '${valueRange.range}'`);
	}
}