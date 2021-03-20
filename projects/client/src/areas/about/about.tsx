import { Spacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { Title, Subtitle, Paragraph } from '@/core/symbol/text';
import { useMeta } from '@/services/data/data-context';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import * as React from 'react';
import { Settings } from './settings';

export interface AboutProps {

}

/**
 * Top-level layout component for the 'About' page.
 */
export const About: React.FC<AboutProps> = () => {

	const meta = useMeta();
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
		<AboutContainer>
			<Settings />
			<div>
				<Title>About</Title>
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
				<Subtitle>What will you do after this plan ends? Is it just a year?</Subtitle>
				<Paragraph>
					I don't know - I haven't ruled out anything. I'm confident in my skills, and I'm fortunate to be where I am. I'll
					figure out the next step when I get to it. The original plan was indeed a year. The actual length of the plan rests on these factors:
					the money in my bank account (that I've been fortunate to be able to save up for years); my ability to cope with not having
					a permanent home; and whether I find a project that I would rather work on instead of continuing this plan.
						</Paragraph>
				<Subtitle>Where do these songs and videos come from?</Subtitle>
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
				<Subtitle>Do you accept suggestions?</Subtitle>
				<Paragraph>
					I appreciate and welcome all suggestions for songs, videos, or webpages. It means a lot that people care enough to offer up items that are important to them.
					However, I will only accept suggestions if I am willing to put my name behind that suggestion as something shareable.
					Some songs or videos, even if they are my favorites, do not make the cut as shareable. Please do not take offense if I am unable to put your suggestion
					on the page.
						</Paragraph>
				<Subtitle>How many people view this page?</Subtitle>
				<Paragraph>
					I don't check the statistics, and I don't really care to. I know that a significant portion of my family checks this site, as
					they let me know when they like the things I share. The number of daily viewers is low enough that I don't have to worry about server load.
						</Paragraph>
				<Subtitle>How much time do you put into this project?</Subtitle>
				<Paragraph>
					Too damn much. Design is the most difficult part, and has cost me multiple weeks. Finding the right content to put here also takes about 1 full day out of each month.
						</Paragraph>
				<Subtitle>Will you add likes and comments?</Subtitle>
				<Paragraph>
					For now, no. I think they would be cool additions, but I would prefer to let the dust settle on this project for awhile.
					I am also opposed to this site becoming too much like a social media site, as that is not its purpose.
						</Paragraph>
			</div>
			<div>
				<Title>Credits</Title>
				<Paragraph>Design, Content, and Development by Andrew Messier.</Paragraph>
				<Paragraph>Thanks to all family, friends, and colleagues who helped me get here.</Paragraph>
				<Subtitle>Tools</Subtitle>
				<Paragraph>
					Designed with Sketch. Icons from the Noun Project (licensed).
						</Paragraph>
				<Paragraph>
					Content sourced from Spotify, YouTube, Google, and my personal photography.
							</Paragraph>
				<Paragraph>
					Development with React, TypeScript, styled-components, Webpack, Storybook, VS Code, and many more.
							</Paragraph>
				<Paragraph>
					Data hosted in Google Sheets so that I can update it from my phone. Code hosted through Heroku.
						</Paragraph>
			</div>
			<div>
				<Title>Contact</Title>
				<Paragraph>
					I am <OutLink href='https://andrewmessier.com'>Andrew Messier</OutLink>.
						</Paragraph>
				<Paragraph>
					Reach me on <OutLink href='https://linkedin.com/in/andrewgmessier'>LinkedIn</OutLink> or <OutLink href='https://twitter.com/AndrewGMessier'>Twitter</OutLink>.
						</Paragraph>
				<Paragraph>
					See the code or file a bug on <OutLink href='https://github.com/messman/of-the-day'>GitHub</OutLink>.
						</Paragraph>
			</div>
			<IconContainer>
				<Icon type={iconTypes.creator} height={Spacing.hut56} fillColor={c => c.textRegular} />
			</IconContainer>
		</AboutContainer>
	);
};

const AboutContainer = tStyled.div`
	max-width: ${LayoutBreakpointRem.e50}rem;
	padding: ${Spacing.dog16};
	margin: auto;
`;

const IconContainer = tStyled.div`
	text-align: center;
	margin: ${Spacing.fan32} 0;
`;