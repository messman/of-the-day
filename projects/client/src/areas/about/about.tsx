import { Spacing, spacing, useResponsiveEdgeSpacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { tStyled } from '@/core/style/styled';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { Title, Subtitle, Paragraph } from '@/core/symbol/text';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import * as React from 'react';
import { Settings } from './settings';

export interface AboutProps {

}

export const About: React.FC<AboutProps> = () => {

	const edgeSpacing = useResponsiveEdgeSpacing();

	return (
		<AboutContainer>
			<Spacing margin={edgeSpacing.horizontal}>
				<Settings />
				<Spacing margin={edgeSpacing.top}>
					<div>
						<Title>About</Title>
						<Subtitle>The Plan</Subtitle>
						<Paragraph>
							After 5+ years in the software development industry, and with the support of my family, friends, and coworkers,
							I decided to leave my awesome job in Charlotte and take at least a year 'off'. During this time, I am focusing more
							on my own personal happiness and attempting to do the things I've never given myself the opportunity to do before:
							travel; extended time with the family that lives outside of North Carolina; hobbies, like music and photography; fitness;
							and most importantly, working on a long list of software development projects I've thought of over the years.
						</Paragraph>
						<Subtitle>Of The Day</Subtitle>
						<Paragraph>
							Of The Day is a way for family, friends, and coworkers to stay informed about what I'm up to, as well as a way for me to
							share things that are important to me. Above all, Of The Day acts as a pseudo-journal of my time. It's an important project for me
							regardless of whether anyone other than myself ever reads it.
						</Paragraph>
					</div>
					<div>
						<Title>F.A.Q.</Title>
						<Subtitle>What will you do after this plan ends?</Subtitle>
						<Paragraph>
							I don't know - I haven't ruled out anything. I'm confident in my skills, and I'm fortunate to be where I am. I'll
							figure out the next step when I get to it.
						</Paragraph>
						<Subtitle>Where do these songs and videos come from?</Subtitle>
						<Paragraph>
							Songs are handpicked out of my personal Spotify playlists. The main criteria for a song is that I like it and want to listen to it;
							I do not add songs solely because of their message or lyrics or how well they fit with a certain day. However, I do try to make sure my
							selections are varied and enjoyable by almost any audience. The song selection process is enjoyable, because I am passionate about music and
							pride myself in enjoying a relatively wide range of music.
						</Paragraph>
						<Paragraph>
							Videos are from deep dives into my decade-long YouTube viewing history. Like with songs, I try to vary the content of videos to hit different areas,
							like education or comedy. I also try to mix in newer videos with older ones.
							I reject more videos than I accept, because I audit the video to ensure it is as appropriate for my family as it is for my
							close friends.
						</Paragraph>
						<Subtitle>Will you add a certain song or video that I like?</Subtitle>
						<Paragraph>
							I appreciate and welcome all suggestions for songs and videos. It means a lot that people care enough to offer up items that are important to them.
							However, I will only accept suggestions if I am willing to put my name behind that suggestion as something shareable.
							Some songs or videos, even if they are my favorites, do not make the cut as shareable.
						</Paragraph>
						<Subtitle>How many people view this page?</Subtitle>
						<Paragraph>
							I don't check the statistics, and I don't care to. I know that a significant portion of my family checks this site, as
							they let me know when they like the things I share.
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
						<Subtitle>Design</Subtitle>
						<Paragraph>
							Andrew.
							</Paragraph>
						<Paragraph>
							(Also: Sketch, Noun Project.)
						</Paragraph>
						<Subtitle>Content</Subtitle>
						<Paragraph>
							Andrew.
							</Paragraph>
						<Paragraph>
							(Also: Spotify, YouTube.)
						</Paragraph>
						<Subtitle>Development</Subtitle>
						<Paragraph>
							Andrew.
							</Paragraph>
						<Paragraph>
							(Also: React, TypeScript, styled-components, Webpack, Storybook, VS Code.)
						</Paragraph>
						<Subtitle>Hosting</Subtitle>
						<Paragraph>
							Andrew.
							</Paragraph>
						<Paragraph>
							(Also: Google Sheets, Heroku.)
						</Paragraph>
					</div>
					<div>
						<Title>Contact</Title>
						<Paragraph>
							<Icon type={iconTypes.creator} height={spacing.grand.value} fillColor={c => c.accentFillOnBackground} />
						</Paragraph>
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
				</Spacing>
			</Spacing>
		</AboutContainer>
	);
};

const AboutContainer = tStyled.div`
	max-width: ${LayoutBreakpoint.tablet}px;
	margin: ${spacing.grand.value} auto;
`;