# Of The Day

A single page application I came up with to provide updates to the people in my life who are interested in what I'm doing with my year of adventure.

## Features

The page is connected to a Google Sheet that I load from using the Google Sheets API.
The Google Sheet has a row for each day and some additional pages for other storage like key-value pairs and checklist items.

I'm able to update the Google Sheet from my phone or computer. Google Sheets as a CMS is a great option when I need the ability to update instantly, on-the-go, and for free for a site where users access the data in a read-only fashion.

## Technologies

This project got me back into design, React, and `styled-components`. It'd been a while since I worked with those, and getting it all right took up most of the time.

- Client
	- React / Webpack / `npm`
	- `styled-components` for css-in-js
	- TypeScript
	- FontAwesome for the icons
	- Microsoft Azure static directory deploy
- Server
	- .NET
	- Google Sheets API
	- Microsoft Azure Functions (serverless)