import { log } from './services/util';

export interface ProcessEnv {
	PORT: number;
	NODE_ENV: string;
	GOOGLE_CREDENTIALS_PATH: string;
	GOOGLE_SPREADSHEET_ID: string;
	TEST_VALUE: string;
}

export interface Settings extends Partial<ProcessEnv> {
	isDev: boolean;
}

let processEnv = (process.env || {}) as unknown as Partial<ProcessEnv>;
const isDev = processEnv.NODE_ENV === 'dev';
if (isDev && !processEnv.TEST_VALUE) {
	// Load other settings from JSON
	try {
		processEnv = Object.assign({}, processEnv, require('../env-dev.json'));
	}
	catch (e) {
		log(e);
	}
}

export const settings: Settings = {
	...processEnv,
	isDev: isDev
};

log('process.env.TEST_VALUE', settings.TEST_VALUE);