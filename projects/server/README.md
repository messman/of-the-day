# Of The Day - Server

## Environment Variables

See the `env.ts` file. `process.env` is used and overlaid with additional environment variables from `env-dev.json`. 

### Google Credentials

We require Google credentials in order to read from the Google Spreadsheet that holds our data. We don't want to check those credentials into source control.
Unfortunately, Heroku only reads from source control and environment variables. This means we need to store the credentials in our environment variables.

Numerous articles out there try to solve this problem with these steps (source):
1. Put the credentials into your production key-value environment variables (through the Heroku GUI).
2. On startup in production, write this string to a file.
3. Pass the path to the file to Google to load it.
[source 1](https://medium.com/@nwkeeley/a-better-solution-would-be-to-4fde38db8401), [source 2](https://medium.com/@dilushadasanayaka/a-better-way-to-authenticate-google-cloud-services-on-heroku-for-node-js-app-93a0751967dc), [source 3](https://stackoverflow.com/questions/47446480/how-to-use-google-api-credentials-json-on-heroku)

I disagree with this strategy - you're dealing with file paths and writing to files on a production server. It would be easier to just read from env and pass those credentials as a JS object right to Google. Just store the credentials as a JSON string in Heroku.

So our strategy is:
- Development:
	1. Read from the google-credentials.json file.
	2. Parse that JSON into object.
	3. Pass that directly to Google.
- Production:
	1. Read from the ENV variable. 
	2. Parse that into an object. (Should be JSON.)
	3. Pass that directly to Google.
No writing to disk.


[googleapis npm package docs](https://www.npmjs.com/package/googleapis#service-account-credentials)