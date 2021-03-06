module.exports = async function getDefine(isDevelopment, isCosmos) {

	/////////////////////////////////////////////////
	// TEST WITHOUT SERVER instead of with a production or development server
	const testWithoutServer = false;
	/////////////////////////////////////////////////

	const buildTime = (new Date()).getTime();
	const packageJson = require('./package.json');
	const buildVersion = packageJson.version;

	/*
		Should match code in the source directory.
		Note, when using DefinePlugin, webpack will parse the JS, not do a simple find-and-replace.
	*/
	const DEFINE = {
		buildVersion: JSON.stringify(buildVersion),
		buildTime: JSON.stringify(buildTime),
		isDevelopment: JSON.stringify(isDevelopment),
		isCosmos: JSON.stringify(isDevelopment && isCosmos),
		isLocalData: JSON.stringify(isDevelopment && testWithoutServer),

		// Overwritten by dev/prod builds
		serverBase: JSON.stringify(null),
	};

	if (isDevelopment) {
		DEFINE.serverBase = JSON.stringify('http://192.168.86.114:8000');
	}
	else {
		DEFINE.serverBase = JSON.stringify('https://oftheday.andrewmessier.com');
	}

	return DEFINE;
};