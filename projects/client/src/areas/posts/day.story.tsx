import * as React from 'react';
import { decorate } from '@/test/storybook/decorate';
import { Day } from './day';
import { MusicRecord, DailyRecord } from 'oftheday-shared';

export default { title: 'areas/posts' };

export const Days = decorate(() => {

	const day: DailyRecord = {
		day: '06/26/2020',
		dayAsText: 'Fri, Jun 26',
		dayNumber: 93,
		specialEvent: '',
		location: 'Wells, Maine',
		note: '',
		schedule: '',
		quote: '',
		quoteBy: '',
		youTubeLink: 'https://youtu.be/nAtCqHJofJk',
		youTubeLinkTitle: 'Cornbread | Basics with Babish',
		youTubeLinkDescription: '\'Binging with Babish\' is a great cooking channel on YouTube. As a person who enjoys making and eating cornbread, I was very interested to see the different ways it can be made. (Links to recipes are in the video description.) The cornbread I make is more similar to the northern style.',
		howDidItGo: ''
	};

	const dayMusic: MusicRecord = {
		day: "06/26/2020",
		dayAsText: "Fri, Jun 26",
		dayNumber: 93,
		specialEvent: "",
		isFavorite: false,
		title: "This is America",
		artist: "Childish Gambino",
		spotifyLink: "https://open.spotify.com/track/0b9oOr2ZgvyQu88wzixux9?si=XJ4XBBfQQ-m8FfcqOeWFgQ",
		youTubeLink: "https://youtu.be/VYOjWnS4cMY",
		isYouTubePreferred: true,
		geniusLink: "https://genius.com/Childish-gambino-this-is-america-lyrics",
		description: "Art, in case you haven't seen it. I highly recommend taking a look at the Genius Lyrics (linked) to dive deep into the meaning and references.",
		quote: "You just a black man in this world"
	};

	return (
		<Day
			day={day}
			dayMusic={dayMusic}
		/>
	);
});