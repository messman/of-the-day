const path = require('path');

// Output our credentials file to the log as JSON so it can be placed in production server configs.
const devEnv = require('../env-dev.json');
const credentialsPath = devEnv.GOOGLE_CREDENTIALS_PATH;
if (!credentialsPath) {
	console.log('No credentials path specified');
	return;
}

const fullPath = path.join('../', credentialsPath);
const credentials = require(fullPath);
console.log(JSON.stringify(credentials));