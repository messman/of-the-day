import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Post } from './post';
import { IPost } from 'oftheday-shared';
import { Flex } from '@messman/react-common';

export default { title: 'Areas/Posts/Post' };

export const Posts = decorate('Post', () => {

	const post: IPost = {
		date: '01/01/2020',
		dateText: 'Wed, Jan 1',
		dayNumber: 287,

		isDayOff: false,
		dayOffMessage: 'Here is a message about the day off',

		basics: {
			event: 'This is a special event!',
			location: 'Wells, Maine',
			note: 'Here is a note!',
			schedule: 'Do some stuff!',
			dayTypes: ['Work', 'play'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		endThoughts: {
			value: 'The day was good!',
			reactionSummary: { emoji: [], replies: 0 }
		},
		music: {
			title: 'This is America',
			artist: 'Childish Gambino',
			year: 2016,
			spotifyLink: 'https://open.spotify.com/track/0b9oOr2ZgvyQu88wzixux9?si=XJ4XBBfQQ-m8FfcqOeWFgQ',
			youTubeLink: 'https://youtu.be/VYOjWnS4cMY',
			useYouTube: true,
			geniusLink: 'https://genius.com/Childish-gambino-this-is-america-lyrics',
			description: `Art, in case you haven't seen it. I highly recommend taking a look at the Genius Lyrics (linked) to dive deep into the meaning and references.`,
			quote: 'You just a black man in this world',
			isNSFW: true,
			isTop: true,
			tags: ['hello', 'goodbye'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		video: {
			title: 'Cornbread | Basics with Babish',
			originalTitle: 'Cornbread | Basics with Babish',
			description: '\'Binging with Babish\' is a great cooking channel on YouTube. As a person who enjoys making and eating cornbread, I was very interested to see the different ways it can be made. (Links to recipes are in the video description.) The cornbread I make is more similar to the northern style.',
			link: 'https://youtu.be/nAtCqHJofJk',
			isNSFW: false,
			isRemoved: false,
			isTop: false,
			tags: ['up', 'down'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		image: {
			description: 'A shot of my dog.',
			link: 'https://google.com',
			source: 'Google',
			sourceLink: 'Bingo',
			reactionSummary: { emoji: [], replies: 0 }
		},
		quote: {
			a: 'Well this is a thing',
			aVoice: 'Sgt. Pepper',
			b: 'Yeah, I guess so',
			bVoice: 'Colonel Salt',
			source: 'Nowhere',
			sourceLink: '',
			reactionSummary: { emoji: [], replies: 0 }
		},
		custom: {
			title: 'Hey Now',
			value: 'Yes, you!',
			linkText: 'Google',
			link: 'https://google.com',
			previewLink: false,
			reactionSummary: { emoji: [], replies: 0 }
		}
	};

	return (
		<Flex>
			<Post
				post={post}
			/>
		</Flex>
	);
});