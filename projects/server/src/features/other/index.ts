import { IOtherResponse } from 'oftheday-shared';
import { SheetsService } from '../../services/google-sheets/sheets-service';
import { log } from '../../services/util';
import { parseMeta, metaRange } from '../meta';
import { otherChecklistRange, otherTopRange, otherValueRange, parseOther } from './parse';

export async function getOther(sheetsService: SheetsService): Promise<IOtherResponse> {
	try {
		const ranges = [otherValueRange, otherChecklistRange, otherTopRange, metaRange];
		const values = await sheetsService.batchGet(ranges);

		const response: IOtherResponse = {
			meta: null!,
			other: null!
		};

		// 0, 1, 2 - Other
		{
			response.other = parseOther(values[0], values[1], values[2]);
		}

		// 3 - Meta
		{
			const metaRecords = values[3];
			response.meta = parseMeta(metaRecords);
		}

		return response;
	}
	catch (e) {
		log('Could not get all information');
		throw e;
	}
}