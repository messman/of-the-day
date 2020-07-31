import { Application, Request, Response, NextFunction } from 'express';
import { PostResponse } from 'oftheday-shared';
import { createSheetsService } from './services/google-sheets/sheets-service';
import { getPosts } from './features/posts';
import { settings } from './env';

function log(...args: any[]): void {
	console.log('>', ...args);
}

export function configureApp(app: Application): void {

	const credentialsPath = settings.GOOGLE_CREDENTIALS_PATH!;
	const sheetId = settings.GOOGLE_SPREADSHEET_ID!;
	const sheetsService = createSheetsService(credentialsPath, sheetId);

	app.get('/posts', async (req: Request, response: Response<PostResponse>, next: NextFunction) => {
		const includeTomorrow = req.query['tomorrow'] == '1';

		let postResponse: PostResponse = null!;
		try {
			postResponse = await getPosts(sheetsService, includeTomorrow, 14, 10);
		}
		catch (e) {
			return next(e);
		}
		log('posts', includeTomorrow);
		return response.json(postResponse);
	});

	app.get('/', async (_: Request, res: Response) => {
		log('ready');
		return res.json({ status: 'ready' });
	});
}