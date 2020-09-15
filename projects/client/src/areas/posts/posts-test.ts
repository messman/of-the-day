import { IPost, IPostDayReference } from 'oftheday-shared';

export const postsTestData: IPost[] = [
	{
		date: '08/27/2020',
		dateText: 'Thu, Aug 27',
		dayNumber: 456,
		dayReference: IPostDayReference.tomorrow,

		isDayOff: false,
		dayOffMessage: 'Here is a message about the day off',

		basics: {
			event: 'This is a special event!',
			location: 'Wells, Maine',
			note: 'Here is a note!',
			schedule: 'Do some stuff!',
			dayTypes: ['Work', 'Play'],
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
			tags: ['Hello', 'That Is Right!'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		video: {
			title: 'Cornbread | Basics with Babish',
			originalTitle: 'Cornbread by by by Basics with Babish',
			description: '\'Binging with Babish\' is a great cooking channel on YouTube. As a person who enjoys making and eating cornbread, I was very interested to see the different ways it can be made. (Links to recipes are in the video description.) The cornbread I make is more similar to the northern style.',
			link: 'https://youtu.be/Bpu0TIXzI1w',
			isNSFW: false,
			isRemoved: false,
			isTop: false,
			tags: ['Holy Granola', 'You Better Believe It'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		image: {
			description: 'A shot of my dog.',
			link: 'https://drscdn.500px.org/photo/1019496186/m%3D900/v2?sig=a21d2c3833b5997ba905355f1b6961dbf59e3a19739fa97a10ecea93191c02ed',
			source: 'Google',
			sourceLink: 'https://google.com',
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
			hiddenValue: 'Hello!',
			linkText: 'Google',
			link: 'https://google.com',
			previewLink: false,
			reactionSummary: { emoji: [], replies: 0 }
		}
	},
	{
		date: '08/28/2020',
		dateText: 'Fri, Aug 28',
		dayNumber: 457,
		dayReference: IPostDayReference.today,

		isDayOff: false,
		dayOffMessage: '',

		basics: {
			event: '',
			location: 'Boston',
			note: '',
			schedule: 'Do some stuff; go on a walk around X; talk to Y',
			dayTypes: ['Relaxation', 'Adventure'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		endThoughts: {
			value: '',
			reactionSummary: { emoji: [], replies: 0 }
		},
		music: {
			title: 'Armor',
			artist: 'Sara Bareilles',
			year: 2019,
			spotifyLink: 'https://open.spotify.com/track/4kO1W2nNKj6C9h5vm31sdX?si=c0qrhE6FR8-mxUUBgO1cLw',
			youTubeLink: 'https://youtu.be/QkNym9S8uMw',
			useYouTube: true,
			geniusLink: 'https://genius.com/Childish-gambino-this-is-america-lyrics',
			description: `Sara back with some empowerment and "F the patriarchy" energy.`,
			quote: `The unforgettable, incredible ones who came before me/brought poetry, brought science/sowed quiet seeds of self-reliance`,
			isNSFW: false,
			isTop: true,
			tags: ['Turn It Up', 'F The Patriarchy'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		video: {
			title: 'MacGruber: Sensitivity Training',
			originalTitle: 'MacGruber: Sensitivity Training - SNL',
			description: 'MacGruber, one of my favorite recurring skits on SNL. These short skits would be interspersed throughout a single episode and leave me laughing after each one. The bomb could go off at any moment. (Also, relevant.)',
			link: 'https://youtu.be/ZPNZv8J94uA',
			isNSFW: true,
			isRemoved: false,
			isTop: false,
			tags: ['Fun', 'Impressive'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		image: {
			description: 'A boat.',
			link: 'https://drscdn.500px.org/photo/1019496202/m%3D900/v2?sig=a8a2e58478162534eb4635c7ca1a792e245d20f2602446b633d664eae06059d2',
			source: 'Google',
			sourceLink: 'https://google.com',
			reactionSummary: { emoji: [], replies: 0 }
		},
		quote: {
			a: 'It is only by knowing yourself that you can be yourself.',
			aVoice: '',
			b: '',
			bVoice: '',
			source: '',
			sourceLink: '',
			reactionSummary: { emoji: [], replies: 0 }
		},
		custom: {
			title: 'Shower Thought',
			value: 'Bees? Like, am I right?',
			hiddenValue: '',
			linkText: '',
			link: '',
			previewLink: false,
			reactionSummary: { emoji: [], replies: 0 }
		}
	},
	{
		date: '08/29/2020',
		dateText: 'Sat, Aug 29',
		dayNumber: 458,
		dayReference: IPostDayReference.yesterday,

		isDayOff: true,
		dayOffMessage: '',

		basics: {
			event: '',
			location: '',
			note: '',
			schedule: '',
			dayTypes: [],
			reactionSummary: { emoji: [], replies: 0 }
		},
		endThoughts: {
			value: '',
			reactionSummary: { emoji: [], replies: 0 }
		},
		music: {
			title: '',
			artist: '',
			year: -1,
			spotifyLink: '',
			youTubeLink: '',
			useYouTube: true,
			geniusLink: '',
			description: ``,
			quote: ``,
			isNSFW: false,
			isTop: false,
			tags: [],
			reactionSummary: { emoji: [], replies: 0 }
		},
		video: {
			title: '',
			originalTitle: '',
			description: '',
			link: '',
			isNSFW: true,
			isRemoved: false,
			isTop: false,
			tags: [],
			reactionSummary: { emoji: [], replies: 0 }
		},
		image: {
			description: '',
			link: '',
			source: '',
			sourceLink: '',
			reactionSummary: { emoji: [], replies: 0 }
		},
		quote: {
			a: '',
			aVoice: '',
			b: '',
			bVoice: '',
			source: '',
			sourceLink: '',
			reactionSummary: { emoji: [], replies: 0 }
		},
		custom: {
			title: '',
			value: '',
			hiddenValue: '',
			linkText: '',
			link: '',
			previewLink: false,
			reactionSummary: { emoji: [], replies: 0 }
		}
	}


];