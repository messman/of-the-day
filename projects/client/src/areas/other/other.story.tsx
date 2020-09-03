import * as React from 'react';
import { decorate } from '@/test/decorate';
import { MockArchive, MockAbout, MockPosts } from '@/areas/layout/layout-mock';
import { Layout } from '@/areas/layout/layout';
import { Other, OtherProps } from './other';
import { IOther } from 'oftheday-shared';

export default { title: 'Areas/Other/Other' };

export const OtherLayout = decorate('Other', () => {
	return (
		<Layout
			Posts={MockPosts}
			Other={TestOther}
			Archive={MockArchive}
			About={MockAbout}
		/>
	);
});


const TestOther: React.FC<OtherProps> = () => {

	const other: IOther = {
		checklistToDo: [
			'Swim with the sharks',
			'Climb the tallest peak',
			'Run with the cheetahs'
		],
		checklistDone: [
			'Sit around on the couch',
			'Run around Boston',
			'Stand up paddle board'
		],
		lookingForward: {
			text: 'This project about lions',
			linkText: 'The Lion Project',
			link: 'https://google.com',
		},
		workingOn: {
			text: 'This project about whales',
			linkText: 'The Whale Project',
			link: 'https://google.com',
		},
		spotifyLink: 'https://open.spotify.com/playlist/3B3vAu2JBk5mZQVT00UGab?si=up68kBTATxClJH08_vDYJA',
		youTubeLink: 'https://www.youtube.com/playlist?list=PLW7t8_pP6P55XvLxnZWJ1o0X2TaY3aagu',
		imageAlbumLink: 'https://google.com',
		imageAlbumLinkText: 'Album Link',
		topArtists: [
			{
				text: 'Sara Bareilles',
				count: 10
			},
			{
				text: 'Coldplay',
				count: 7
			}
		],
		topLocations: [
			{
				text: 'Wells, Maine',
				count: 70
			},
			{
				text: 'Charlotte',
				count: 50
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
			}
		],
		milesByBicycle: 100.5,
		milesByFoot: 312.89
	};

	return <Other overrideOther={other} />;
};