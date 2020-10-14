import { IOtherResponse } from 'oftheday-shared';
import { SheetsService } from '../../services/google-sheets/sheets-service';
import { MemoryCache } from '../../services/memory';
import { log } from '../../services/util';
import { parseMeta, metaRange } from '../meta';
import { otherChecklistRange, otherTopRange, otherValueRange, parseOther } from './parse';

export async function getOther(sheetsService: SheetsService, memory: MemoryCache<IOtherResponse>): Promise<IOtherResponse> {
	try {
		const hit = memory.registerHit();
		if (hit.cacheItemValue) {
			log('other', `cached - ${hit.timeRemainingInCache}ms remaining`);
			return hit.cacheItemValue;
		}

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

		memory.setCacheItemValue(response);
		log('other', memory.isCaching ? `new - caching for ${memory.cacheExpiration}ms` : 'new - not caching');

		return response;
	}
	catch (e) {
		log('Could not get all information');
		throw e;
	}
}