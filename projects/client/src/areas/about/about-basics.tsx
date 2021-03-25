import { OutLink } from '@/core/link';
import { Title, Subtitle, Paragraph, InlineWeight } from '@/core/symbol/text';
import { IMeta } from 'oftheday-shared';
import * as React from 'react';

export interface AboutBasicsProps {
	meta: IMeta | null;
}

/**
* Top-level layout component for the 'About' page.
*/
export const AboutBasics: React.FC<AboutBasicsProps> = (props) => {

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
				Almost all videos from Of The Day are available on <OutLink href={meta.youTubeLink}>this YouTube Playlist</OutLink>.
			</Paragraph>
		) : null;
	}

	return (
		<div>
			<div>
				<Title>About</Title>
				<Subtitle>"The Plan"</Subtitle>
				<Paragraph>
					On March 25, 2020, with the support of my family, friends, and coworkers,
					I left my job in Charlotte to take at least a year off of work.
					During this time, I am focusing on things for which I haven't given myself enough time:
					travel; visiting with extended family; hobbies, like music and photography; fitness;
					and most importantly, working on independent software development projects.
				</Paragraph>
				<Subtitle>Of The Day</Subtitle>
				<Paragraph>
					This site, Of The Day, started as a way for family, friends, and coworkers to stay informed about what I'm up to.
					It also served as a personal blog for myself, such that it didn't matter who read it.
					Due to the 2020+ pandemic, I haven't had the opportunity to do the exciting things I planned.
					Instead, Of The Day has become a platform for me to share media content I enjoy: music, videos, quotes, and more.
					This site has also been an interesting and challenging software development project.
					As the world re-opens, I expect Of The Day to reach some balance between media content and personal content.
				</Paragraph>
			</div>
			<div>
				<Title>F.A.Q.</Title>
				<Subtitle>What will you do after this time ends? Is it just a year?</Subtitle>
				<Paragraph>
					I'm confident in my skills, and I'm fortunate to be where I am. I'll figure out the next step when I am ready.
					The original plan was indeed a year, but the actual length of the plan rests on these factors:
					the money in my bank account;
					my ability to cope with not having a permanent place for myself and all my belongings;
					and whether I find a project that I would rather work on full-time instead of continuing this plan.
				</Paragraph>
				<Subtitle>Where does the media content come from?</Subtitle>
				<Paragraph>
					Songs I share are typically songs I've known for a long time. Occasionally, they are songs I have recently
					discovered through friends or family. Every song on Of The Day is a recommendation.
					I listen to almost all the songs regularly. Music is my favorite content to share.
				</Paragraph>
				{spotifyPlaylistRender}
				<Paragraph>
					Videos are from YouTube. Videos are more difficult to find, because I try to stay away from hard-to-follow or niche
					content. I also try to vary the types of videos I share to include artistic and educational content.
				</Paragraph>
				{youTubePlaylistRender}
				<Paragraph>
					I appreciate and welcome all suggestions of media content to share. However, not all content is suitable for Of The Day.
					Generally, content must follow a theme of positivity, empowerment, education, joy, or motivation. Content is not
					just my favorite stuff.
				</Paragraph>
				<Subtitle>How popular is Of The Day?</Subtitle>
				<Paragraph>
					I don't check the statistics. The number of daily viewers is low enough that I don't have to worry about server load.
					I only know someone has viewed Of The Day if they contact me to let me know that they enjoyed something I've shared.
					If you liked something I've shared, let me know!
				</Paragraph>
				<Subtitle>How much time have you put into this project?</Subtitle>
				<Paragraph>
					I've definitely put in more time to this project than I originally intended. The jobs are many: content curation,
					design, development of client and server, deployment, and bug-fixing. The project has been a good
					way to improve my design and development skills, so any time spent in those roles has been rewarding.
					Media content curation, however, has caused a lot of stress.
					Finding media content just for the sake of having something to share (to 'fill a quota')
					can take up about three extra hours per week.
				</Paragraph>
				<Subtitle>Will you continue to add features to Of The Day?</Subtitle>
				<Paragraph>
					No. While I originally intended to add accounts, likes, and comments to this site, I now see
					that it works best as a simple sharing site.
					I also have higher-priority projects to work on these days.
				</Paragraph>
			</div>
			<div>
				<Title>Credits</Title>
				<Paragraph>
					All design, content curation, and development is by me, Andrew Messier.
					Thanks to all family, friends, and colleagues for encouragement and ideas.
				</Paragraph>
				<Subtitle>Tools</Subtitle>
				<Paragraph>
					<InlineWeight.Bold>Designed </InlineWeight.Bold>
					with Sketch. Icons from the Noun Project (licensed).
				</Paragraph>
				<Paragraph>
					<InlineWeight.Bold>Content </InlineWeight.Bold>
					sourced from Spotify, YouTube, Google, and my personal photography.
				</Paragraph>
				<Paragraph>
					<InlineWeight.Bold>Development </InlineWeight.Bold>
					with React, TypeScript, styled-components, Webpack, Storybook, VS Code, and more.
				</Paragraph>
				<Paragraph>
					<InlineWeight.Bold>Data and hosting </InlineWeight.Bold>
					through Heroku and Google Sheets. I keep the data for Of The Day in Google Sheets
					so that I can edit content from my phone.
				</Paragraph>
				<Paragraph>
					This site is fully responsive and can be accessed from your phone or a desktop browser. On mobile devices,
					you can add the website to your home screen. The website will automatically refresh to show new content.
				</Paragraph>
			</div>
		</div>
	);
};