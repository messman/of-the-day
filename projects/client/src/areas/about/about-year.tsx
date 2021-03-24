import { OutLink } from '@/core/link';
import { Title, Subtitle, Paragraph } from '@/core/symbol/text';
import { IMeta } from 'oftheday-shared';
import * as React from 'react';

export interface AboutYearProps {
	meta: IMeta | null;
}

/**
* Sub-page under "About" for the one-year update.
*/
export const AboutYear: React.FC<AboutYearProps> = (props) => {

	const { meta } = props;
	let spotifyPlaylistRender: JSX.Element | null = null;
	let youTubePlaylistRender: JSX.Element | null = null;
	if (meta) {
		spotifyPlaylistRender = meta.spotifyLink ? (
			<Paragraph>
				All the songs from Of The Day are available on <OutLink href={meta.spotifyLink}>this Spotify Playlist</OutLink>.
			</Paragraph>
		) : null;

		youTubePlaylistRender = meta.youTubeLink ? (
			<Paragraph>
				All videos from Of The Day (that have not been removed) are available on <OutLink href={meta.youTubeLink}>this YouTube Playlist</OutLink>.
			</Paragraph>
		) : null;
	}

	return (
		<div>
			<div>
				<Title>A Year Of The Day</Title>
				<Subtitle>The Plan</Subtitle>
				<Paragraph>
					After 5+ years in the software development industry, and with the support of my family, friends, and coworkers,
					I decided to leave my awesome job in Charlotte and take at least a year 'off'. During this time, I am focusing more
					on my own personal happiness. I am also attempting to do things I haven't given myself enough opportunity to do before:
					travel; extended time with the family that lives outside of North Carolina; hobbies, like music and photography; fitness;
					and most importantly, working on a long list of software development projects I've thought of over the years.
				</Paragraph>
				<Subtitle>Of The Day</Subtitle>
				<Paragraph>
					Of The Day is a way for family, friends, and coworkers to stay informed about what I'm up to, as well as a way for me to
					share things that are important to me. Above all, however, Of The Day acts as a pseudo-journal of my time. It's an important project for me
					regardless of whether anyone other than myself ever reads it.
				</Paragraph>
			</div>
			<div>
				<Title>F.A.Q.</Title>
				<Paragraph>
					Songs are handpicked out of my personal Spotify playlists. The main criteria for a song is that I like it and want to listen to it.
					I do not add songs solely because of their message or lyrics or how well they fit with a certain day. However, I do try to make sure my
					selections are varied and enjoyable by almost any audience. The song selection process is enjoyable, because I am passionate about music and
					pride myself in enjoying a relatively wide range of music.
				</Paragraph>
				{spotifyPlaylistRender}
				<Paragraph>
					Videos are from deep dives into my decade-long YouTube viewing history. Like with songs, I try to vary the content of videos to hit different areas,
					like education or comedy. I also try to mix in newer videos with older ones.
					I reject more videos than I accept, because I audit each video to ensure it is as appropriate for my family as it is for my
					close friends.
				</Paragraph>
				{youTubePlaylistRender}
			</div>
		</div>
	);
};