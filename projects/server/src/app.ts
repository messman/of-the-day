import { Application, Request, Response, NextFunction } from 'express';
import { OfTheDayData } from 'oftheday-shared';
import { createSheetsService } from './services/google-sheets/sheets-service';
import { getRecentPosts } from './features/posts';
import { Settings } from './services/settings';

function log(...args: any[]): void {
	console.log('>', ...args);
}

export function configureApp(app: Application, settings: Settings): void {

	const credentialsPath = settings.GoogleSheetsCredentialsPath;
	const sheetId = settings.GoogleSheetsSpreadsheetID;
	const sheetsService = createSheetsService(credentialsPath, sheetId);

	app.get('/daily', async (req: Request, response: Response<OfTheDayData>, next: NextFunction) => {
		const includeTomorrow = req.query['tomorrow'] == '1';

		let dailyRecords: OfTheDayData = null!;
		try {
			dailyRecords = await getRecentPosts(sheetsService, includeTomorrow);
		}
		catch (e) {
			return next(e);
		}
		log('daily', includeTomorrow);
		return response.json(dailyRecords);
	});

	app.get('/', async (_: Request, res: Response) => {
		log('ready');
		return res.json({ status: 'ready' });
	});
}