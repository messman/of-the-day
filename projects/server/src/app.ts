import { Application, Request, Response, NextFunction } from 'express';
import { IPostResponse, IOtherResponse, IArchiveRequest, IArchiveResponse } from 'oftheday-shared';
import { createSheetsService } from './services/google-sheets/sheets-service';
import { getPosts, getRecentPosts, getRecentPostsIncludingTomorrow } from './features/posts';
import { settings } from './env';
import { getOther } from './features/other';
import { createMemoryCache, MemoryCache } from './services/memory';
import { minutes } from './services/time';
import { getArchive, IArchiveCache } from './features/archive';

function log(...args: any[]): void {
	console.log('>', ...args);
}

export function configureApp(app: Application): void {

	const sheetId = settings.GOOGLE_SPREADSHEET_ID!;
	const sheetsService = createSheetsService(settings.googleCredentials, sheetId);

	if (settings.isDev) {
		app.get('/posts-test', async (req: Request, response: Response<IPostResponse>, next: NextFunction) => {
			const includeTomorrow = req.query['tomorrow'] == '1';

			let serviceResponse: IPostResponse = null!;
			try {
				serviceResponse = await getPosts(sheetsService, includeTomorrow, 14, 10);
			}
			catch (e) {
				return next(e);
			}
			log('posts-test', includeTomorrow);
			return response.json(serviceResponse);
		});
	}

	// Create a memory cache for the recent posts.
	const memoryPosts: MemoryCache<IPostResponse> = createMemoryCache({
		isCaching: true,
		expiration: minutes(1.5)
	});

	app.get('/posts', async (req: Request, response: Response<IPostResponse>, next: NextFunction) => {
		const includeTomorrow = req.query['tomorrow'] == '1';

		let serviceResponse: IPostResponse = null!;
		try {
			if (includeTomorrow) {
				serviceResponse = await getRecentPostsIncludingTomorrow(sheetsService);
			}
			else {
				serviceResponse = await getRecentPosts(sheetsService, memoryPosts);
			}
		}
		catch (e) {
			return next(e);
		}
		log('posts', includeTomorrow);
		return response.json(serviceResponse);
	});

	app.get('/other', async (_: Request, response: Response<IOtherResponse>, next: NextFunction) => {

		let serviceResponse: IOtherResponse = null!;
		try {
			serviceResponse = await getOther(sheetsService);
		}
		catch (e) {
			return next(e);
		}
		log('other');
		return response.json(serviceResponse);
	});

	// Create a memory cache for the archive.
	const memoryArchive: MemoryCache<IArchiveCache> = createMemoryCache({
		isCaching: true,
		expiration: minutes(10)
	});

	app.post('/archive', async (req: Request<{}, any, IArchiveRequest>, response: Response<IArchiveResponse>, next: NextFunction) => {
		const archiveRequest = req.body;
		let serviceResponse: IArchiveResponse = null!;
		try {
			serviceResponse = await getArchive(sheetsService, archiveRequest, memoryArchive);
		}
		catch (e) {
			return next(e);
		}
		log('archive');
		return response.json(serviceResponse);
	});

	app.get('/', async (_: Request, res: Response) => {
		log('ready');
		return res.json({ status: 'ready' });
	});
}