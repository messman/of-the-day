# Of The Day

A blog-style web application from Andrew Messier to track his time off from work.
Time off started on March 25, 2020.

## Status

- Version 2: published October 14, 2020. Stable. See lower sections for discussion of what's left to do.

## Features

- "Weekly" page - shows my schedule, notes, thoughts, etc for the most recent 7 days, as well as any music, videos, quotes, articles, etc that I share during those days.
- "Info" page - shows aggregate information (such as my total miles run or my most commonly-shared musical artist) and planning (short-term and long-term).
- "Archive" page - searches through past days to show shared music, videos, quotes, articles, etc.
- "About" page - explains the application, my plans, and allows for changing the theme.

## Tech

### Data / Server

Data is hosted in... Google Sheets! Data is retrieved with Node using the Google Sheets API.

Decision to use Google Sheets was based on this reasoning:
- This is a small project where one person is updating the data.
- That person wants to update the data from their computer or phone without hassle.
- Free, please.

By using Google Sheets, I save time setting up the 'edit' side of the database. I can also check the database easily whenever I like to fix issues. Individual sections of data are in different pages.

The server uses TypeScript, Node, and Express. It hosts the front-end code statically. Deployment is through Heroku and Cloudflare.

See more information on the [server README](./server/README.md).

### Client / Design

Design is hard. I'm happier with the desktop design than the mobile design. Design was through Sketch. Symbols come from the Noun Project (licensed account).

Front-end was fun. React (with React-Router), TypeScript, Webpack (with a custom builder application I wrote), a custom React UI library I wrote, and styled-components.

## Future Work

- Refine the mobile experience (tighter)
- Clean up and optimize code (for example - styled-components performance, react-spring performance)