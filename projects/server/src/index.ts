import express = require('express');
import { NextFunction, Request, Response } from 'express';
import { configureApp } from './app';
import { settings } from './env';

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedDomain = settings.isDev ? '*' : 'https://tidy.andrewmessier.com';

console.log(settings.isDev ? 'Using open CORS settings for development' : `Restricting via CORS to '${allowedDomain}'`);
app.use(function (request: Request, response: Response, next: NextFunction) {
	response.header('Access-Control-Allow-Origin', allowedDomain);
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	if (request.method.toLowerCase() === 'options') {
		response.send(200);
	}
	else {
		next();
	}
});

configureApp(app);

// 404 handler
app.use(function (_request: Request, response: Response, _next: NextFunction) {
	response.status(404).send('Not Found');
});

// Error handler
app.use(function (error: Error, _request: Request, response: Response, _next: NextFunction) {
	console.error(error.stack);
	response.status(500).send('Server Error');
});

app.listen(port, () => {
	console.log('Listening on ' + port);
});