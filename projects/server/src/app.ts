import { Router, Application, Request, Response, NextFunction } from 'express';
import { IPostResponse, IOtherResponse, IArchiveRequest, IArchiveResponse, IArchiveFilterRange, IArchiveFilterSort } from 'oftheday-shared';
import { createSheetsService } from './services/google-sheets/sheets-service';
import { getPosts, getRecentPosts, getRecentPostsIncludingTomorrow } from './features/posts';
import { settings } from './env';
import { getOther } from './features/other';
import { createMemoryCache, MemoryCache } from './services/memory';
import { minutes } from './services/time';
import { getArchive, IArchiveCache } from './features/archive';
import { log } from './services/util';

export function configureApp(app: Application): void {

	// Route into the '/api/' path
	const router = Router();

	const sheetId = settings.GOOGLE_SPREADSHEET_ID!;
	const sheetsService = createSheetsService(settings.googleCredentials, sheetId);

	if (settings.isDev) {
		router.get('/posts-test', async (_req: Request, response: Response<IPostResponse>, next: NextFunction) => {
			let serviceResponse: IPostResponse = null!;
			try {
				serviceResponse = await getPosts(sheetsService, false, 14, 10);
			}
			catch (e) {
				return next(e);
			}
			log('posts-test');
			return response.json(serviceResponse);
		});
	}

	// Create a memory cache for the recent posts.
	const memoryPosts: MemoryCache<IPostResponse> = createMemoryCache({
		isCaching: true,
		expiration: minutes(2)
	});

	router.get('/posts', async (req: Request, response: Response<IPostResponse>, next: NextFunction) => {
		// ...?tomorrow=1
		const includeTomorrow = req.query['tomorrow'] == '1';

		log('--- posts', includeTomorrow ? 'tomorrow' : '');
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
		return response.json(serviceResponse);
	});

	// Create a memory cache for the other information.
	const memoryOther: MemoryCache<IOtherResponse> = createMemoryCache({
		isCaching: true,
		expiration: minutes(2)
	});

	router.get('/other', async (_: Request, response: Response<IOtherResponse>, next: NextFunction) => {

		log('--- other');
		let serviceResponse: IOtherResponse = null!;
		try {
			serviceResponse = await getOther(sheetsService, memoryOther);
		}
		catch (e) {
			return next(e);
		}
		return response.json(serviceResponse);
	});

	// Create a memory cache for the archive.
	const memoryArchive: MemoryCache<IArchiveCache> = createMemoryCache({
		isCaching: true,
		expiration: minutes(10)
	});

	router.post('/archive', async (req: Request<{}, any, IArchiveRequest>, response: Response<IArchiveResponse>, next: NextFunction) => {
		let serviceResponse: IArchiveResponse = null!;
		log('--- archive');
		try {
			const archiveRequest = req.body;
			if (!req.body || !req.body.filter) {
				throw new Error('No valid body provided');
			}
			serviceResponse = await getArchive(sheetsService, archiveRequest, memoryArchive);
		}
		catch (e) {
			return next(e);
		}
		return response.json(serviceResponse);
	});

	if (settings.isDev) {
		router.get('/archive-test', async (_: Request<{}, any, IArchiveRequest>, response: Response<IArchiveResponse>, next: NextFunction) => {
			let serviceResponse: IArchiveResponse = null!;
			try {
				serviceResponse = await getArchive(sheetsService, {
					filter: {
						types: {
							notes: false,
							schedule: false,
							location: false,
							endThoughts: false,
							music: true,
							video: true,
							image: true,
							quote: true,
							custom: true
						},
						modifiers: {
							includeOnlyWithTopTag: false,
							excludeWithNSFWTag: false,
						},
						range: IArchiveFilterRange.all,
						sort: IArchiveFilterSort.dayDecreasing
					}
				}, memoryArchive);
			}
			catch (e) {
				return next(e);
			}
			log('archive');
			return response.json(serviceResponse);
		});
	}

	router.get('/', async (_: Request, res: Response) => {
		log('ready');
		return res.json({ status: 'ready' });
	});

	app.use('/api', router);
}