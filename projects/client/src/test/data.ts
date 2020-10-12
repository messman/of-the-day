import { IArchiveResponse, IMeta, IOtherResponse, IPostDayReference, IPostResponse } from 'oftheday-shared';

const meta: IMeta = {
	important: ['Test of the important section'],
	error: [],
	shutdown: []
};

export const otherTestData: IOtherResponse = {
	meta: meta,
	other: {
		checklistToDo: [
			'Swim with the sharks',
			'Climb the tallest peak',
			'Run with the cheetahs',
			'Do something so epic and so awesome that I have a fantastic story to tell for a long time that I never forget and this is just to take up a lot of line space',
		],
		checklistDone: [
			'Sit around on the couch',
			'Gain 50,000 pounds and then lose 50,0010 pounds and again here I am just trying to make the line length longer',
			'Stand up paddle board'
		],
		lookingForward: {
			text: `This project about lions. Aren't lions the best? I could talk about lions all the time. Day or night.`,
			linkText: 'The Lion Project',
			link: 'https://google.com',
		},
		workingOn: {
			text: 'This project about whales. Whales are the only thing better than lions. You best believe that whales are the tops.',
			linkText: 'The Whale Project',
			link: 'https://google.com',
		},
		spotifyLink: 'https://open.spotify.com/playlist/2PTdD08OlIVautOTP2okDj?si=20hM_FAnQhCW9Tc8zFuETw',
		youTubeLink: 'https://www.youtube.com/playlist?list=PLW7t8_pP6P55XvLxnZWJ1o0X2TaY3aagu',
		imageAlbumLink: '',
		imageAlbumLinkText: '',
		topArtists: [
			{
				text: 'Coldplay',
				count: 10
			},
			{
				text: 'John Mayer',
				count: 7
			},
			{
				text: 'Billy Joel',
				count: 4
			},
		],
		topLocations: [
			{
				text: 'Wells, Maine',
				count: 70
			},
			{
				text: 'Charlotte',
				count: 50
			},
			{
				text: 'Boston',
				count: 10
			}
		],
		topDayTypes: [
			{
				text: 'Relaxation',
				count: 111
			},
			{
				text: 'Work',
				count: 80
			},
			{
				text: 'Adventure',
				count: 20
			},
		],
		milesByBicycle: 300,
		milesByFoot: 462
	}
};

export const postsTestData: IPostResponse = {
	dayNumber: 456,
	meta: meta,
	posts: [
		{
			date: '08/27/2020',
			dateText: 'Thu, Aug 27',
			dayNumber: 456,
			dayReference: IPostDayReference.tomorrow,

			isDayOff: false,
			dayOffMessage: 'Here is a message about the day off',

			basics: {
				event: 'Black Friday',
				note: 'This is Black Friday. What a day. The excesses of the people shine for us all to see.',
				location: 'Wells, Maine',
				schedule: 'Run 50 miles; sign autographs; move a house; eat breakfast.',
				dayTypes: ['Work', 'Adventure'],
			},
			endThoughts: {
				value: 'Today was a great day. I had a great time doing some of this thing and some of that thing. Signing autographs while running 50 miles was a great time.',
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
				tags: ['Check The Lyrics'],
			},
			video: {
				customTitle: 'Walking 500 Miles',
				customTitleCreator: 'The Late Late Show With James Corden',
				originalTitle: 'Niall Horan & James Corden Would Walk 500 Miles',
				description: 'I imagine that being a writer for a late-night TV show must be a lot of stress and anxiety because you will not always have other people think your idea is funny. This, for example, was a shot in the dark that somehow worked.',
				link: 'https://youtu.be/aEWfPtxFm70',
				isNSFW: false,
				isTop: false,
				isRemoved: false,
				tags: [],
			},
			image: {
				description: 'Testing how it is to display photos here.',
				link: 'https://drscdn.500px.org/photo/1019496186/m%3D900/v2?sig=a21d2c3833b5997ba905355f1b6961dbf59e3a19739fa97a10ecea93191c02ed',
				sourceText: 'Google',
				sourceLink: 'https://google.com',
				isNSFW: false,
				isTop: false,
			},
			quote: {
				a: 'I have a rule that I never think of anything negative when I\'m running.',
				aVoice: 'Dr. Jill Biden',
				b: 'Same here, though running itself is a negative thought for me, so I don\'t do it.',
				bVoice: 'Stephen Colbert',
				sourceText: 'The Late Show with Stephen Colbert',
				sourceLink: 'https://youtu.be/yeFk2709fgY?t=612',
				isNSFW: false,
				isTop: false,
			},
			custom: {
				title: 'Joke',
				value: 'Did you hear about the actor who fell through the floorboards?',
				hiddenValue: 'He was just going through a stage.',
				linkText: '',
				link: '',
				isNSFW: false,
				isTop: false,
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
				location: '',
				note: '',
				schedule: 'Do some stuff; go on a walk around X; talk to Y',
				dayTypes: ['Relaxation', 'Adventure'],
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
			},
			video: {
				customTitle: 'MacGruber: Sensitivity Training',
				customTitleCreator: 'SNL',
				originalTitle: 'MacGruber: Sensitivity Training - SNL',
				description: 'MacGruber, one of my favorite recurring skits on SNL. These short skits would be interspersed throughout a single episode and leave me laughing after each one. The bomb could go off at any moment. (Also, relevant.)',
				link: 'https://youtu.be/ZPNZv8J94uA',
				isNSFW: true,
				isRemoved: false,
				isTop: false,
				tags: ['Fun', 'Impressive'],
			},
			image: {
				description: '',
				link: 'https://drscdn.500px.org/photo/1019496202/m%3D900/v2?sig=a8a2e58478162534eb4635c7ca1a792e245d20f2602446b633d664eae06059d2',
				sourceText: 'Google',
				sourceLink: 'https://google.com',
				isNSFW: false,
				isTop: false,
			},
			quote: {
				a: 'It is only by knowing yourself that you can be yourself.',
				aVoice: 'Some random person out there',
				b: '',
				bVoice: '',
				sourceText: '',
				sourceLink: '',
				isNSFW: false,
				isTop: true,
			},
			custom: {
				title: 'Shower Thought',
				value: 'Bees? Like, am I right?',
				hiddenValue: '',
				linkText: '',
				link: '',
				isNSFW: true,
				isTop: false,
			}
		},
		{
			date: '08/25/2020',
			dateText: 'Tue, Aug 25',
			dayNumber: 454,
			dayReference: IPostDayReference.yesterday,

			isDayOff: true,
			dayOffMessage: '',
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
			},
			quote: {
				a: 'Listen. Strange women lying in ponds distributing swords is no basis for a system of government. Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony.',
				aVoice: 'Dennis, 37',
				b: '',
				bVoice: '',
				sourceText: 'Monty Python and the Holy Grail',
				sourceLink: '',
				isNSFW: true,
				isTop: false,
			},
			custom: {
				title: 'Recommendation',
				value: 'I highly recommend people check out The Social Dilemma on Netflix. Social media can have deeply negative psychological effects on people.',
				hiddenValue: '',
				linkText: 'The Social Dilemma | Netflix',
				link: 'https://www.netflix.com/title/81254224',
				isNSFW: false,
				isTop: true,
			}
		}
	]
};

export const archiveTestData: IArchiveResponse = {
	posts: postsTestData.posts
};