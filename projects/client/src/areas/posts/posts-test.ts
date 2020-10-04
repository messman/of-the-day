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
			event: 'Halfway Point',
			note: 'Halfway there - isn\'t that crazy? Though really, with how my budget\'s been going, I\'m in a better position than I thought.',
			location: 'Wells, Maine',
			schedule: 'Do some stuff; play some ping pong; work on my daily affirmations',
			dayTypes: ['Work', 'Play'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		endThoughts: {
			value: 'The day was good! It was a good time doing this and that; I really enjoyed the part where I did Y and Z together.',
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
			description: 'A shot of my dog. I got this shot when I was out late at night.',
			link: 'https://drscdn.500px.org/photo/1019496186/m%3D900/v2?sig=a21d2c3833b5997ba905355f1b6961dbf59e3a19739fa97a10ecea93191c02ed',
			source: 'Google',
			sourceLink: 'https://google.com',
			reactionSummary: { emoji: [], replies: 0 }
		},
		quote: {
			a: 'I have a rule that I never think of anything negative when I\'m running.',
			aVoice: 'Dr. Jill Biden',
			b: 'Same here, though running itself is a negative thought for me, so I don\'t do it.',
			bVoice: 'Stephen Colbert',
			source: 'The Late Show with Stephen Colbert',
			sourceLink: 'https://youtu.be/yeFk2709fgY?t=612',
			reactionSummary: { emoji: [], replies: 0 }
		},
		custom: {
			title: 'Joke',
			value: 'Did you hear about the actor who fell through the floorboards?',
			hiddenValue: 'He was just going through a stage.',
			linkText: '',
			link: '',
			previewLink: false,
			reactionSummary: { emoji: [], replies: 0 }
		}
	},
	{
		date: '08/26/2020',
		dateText: 'Wed, Aug 26',
		dayNumber: 455,
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
		date: '08/25/2020',
		dateText: 'Tue, Aug 25',
		dayNumber: 454,
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
	},
	{
		date: '08/24/2020',
		dateText: 'Mon, Aug 24',
		dayNumber: 453,
		dayReference: IPostDayReference.other,

		isDayOff: false,
		dayOffMessage: '',

		basics: {
			event: 'James\' Birthday',
			note: 'Happy Birthday to James! I hope you have an awesome time with the family!',
			location: 'Colorado Springs, Colorado',
			schedule: 'Drive over to Colorado Springs to see what has changed in the past 5 years; Stop by some of my old common hangout spots and see some friends.',
			dayTypes: ['Relaxation', 'Adventure'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		endThoughts: {
			value: '',
			reactionSummary: { emoji: [], replies: 0 }
		},
		music: {
			title: 'Dirty Deeds Done Dirt Cheap',
			artist: 'AC/DC',
			year: 2050,
			spotifyLink: 'https://open.spotify.com/track/2d4e45fmUnguxh6yqC7gNT?si=v69lcBmyTj-q8ja6kIIVjQ',
			youTubeLink: 'https://youtu.be/UIE4UjBtx-o',
			useYouTube: true,
			geniusLink: 'https://genius.com/Ac-dc-dirty-deeds-done-dirt-cheap-lyrics',
			description: `A classic. Performing some dishonest acts at a fair and reasonable price.`,
			quote: 'Neckties, contracts, high voltage!',
			isNSFW: true,
			isTop: true,
			tags: ['Turn It Up'],
			reactionSummary: { emoji: [], replies: 0 }
		},
		video: {
			title: '',
			originalTitle: '',
			description: '',
			link: '',
			isNSFW: false,
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
			a: 'Listen. Strange women lying in ponds distributing swords is no basis for a system of government. Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony.',
			aVoice: 'Dennis, 37',
			b: '',
			bVoice: '',
			source: 'Monty Python and the Holy Grail',
			sourceLink: '',
			reactionSummary: { emoji: [], replies: 0 }
		},
		custom: {
			title: 'Recommendation',
			value: 'I highly recommend people check out The Social Dilemma on Netflix. Social media can have deeply negative psychological effects on people.',
			hiddenValue: '',
			linkText: 'The Social Dilemma | Netflix',
			link: 'https://www.netflix.com/title/81254224',
			previewLink: false,
			reactionSummary: { emoji: [], replies: 0 }
		}
	}


];