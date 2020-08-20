import * as path from 'path';
import { log } from './services/util';

export interface ProcessEnv {
	PORT: number;
	NODE_ENV: string;
	DEV_GOOGLE_CREDENTIALS_PATH: string;
	PROD_GOOGLE_CREDENTIALS: string;
	GOOGLE_SPREADSHEET_ID: string;
	TEST_VALUE: string;
}

export interface Settings extends Partial<ProcessEnv> {
	isDev: boolean;
	googleCredentials: { [index: string]: any; } | null;
}

let processEnv = (process.env || {}) as unknown as Partial<ProcessEnv>;
let googleCredentials: { [index: string]: any; } | null = null;

const isDev = processEnv.NODE_ENV === 'dev';
if (isDev && !processEnv.TEST_VALUE) {
	// Load other settings from JSON
	try {
		processEnv = Object.assign({}, processEnv, require('../env-dev.json'));
	}
	catch (e) {
		log(e);
	}

	if (processEnv.DEV_GOOGLE_CREDENTIALS_PATH) {
		// Load Google Credentials from physical file on machine
		try {
			googleCredentials = require(path.join('../', processEnv.DEV_GOOGLE_CREDENTIALS_PATH!));
		}
		catch (e) {
			log(e);
		}
	}
}

if (!isDev && processEnv.PROD_GOOGLE_CREDENTIALS) {
	// Load Google Credentials from env variable. Credentials should be JSON.
	try {
		googleCredentials = JSON.parse(processEnv.PROD_GOOGLE_CREDENTIALS!);
	}
	catch (e) {
		log(e);
	}
}

export const settings: Settings = {
	...processEnv,
	isDev: isDev,
	googleCredentials: googleCredentials
};

log('process.env.TEST_VALUE', settings.TEST_VALUE);