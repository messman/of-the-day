import { OutLink } from '@/core/link';
import { Title, Subtitle, Paragraph, InlineItalic } from '@/core/symbol/text';
import { IMeta } from 'oftheday-shared';
import * as React from 'react';

export interface AboutYearProps {
	meta: IMeta | null;
}

/**
* Sub-page under "About" for the one-year update.
*/
export const AboutYear: React.FC<AboutYearProps> = (_props) => {

	return (
		<div>
			<div>
				<Title>A Year Of The Day</Title>
				<Paragraph>
					March 25, 2021, marks one year from the start of my plan to take time off work.
					My feelings about my journey have changed throughout the year, just like Of The Day itself.
					This update reflects on this project at its one-year mark and talks about what's ahead.
				</Paragraph>
				<div>
					<Subtitle>Version 1: New And Naïve</Subtitle>
					<Paragraph>
						The very first version of Of The Day was completed in about a week.
						There was no information page to show trends or larger updates. There were no images
						or custom links.
						There was also no archive; posts disappeared completely after three days.
						I wanted to keep the experience very 'in-the-moment'.
						I thought I'd spend about ten minutes per night typing up what would show the next day,
						and everyone who wanted to read it would read it that next day. Posts would contain both personal information
						&mdash; such as my location, schedule, and thoughts &mdash; as well as media content. During a
						trip to London, for example, I could post about which museums I would be exploring that day,
						an educational video about the Tower of London, a song from Elton John, and a quote from Churchill.
						I wanted Of The Day to replace the functionality of a social media site like Facebook or Twitter.
						I hoped that my posts would actually encourage myself to do more exciting and adventurous things
						(the "Do it so I can post about it so that people know I'm succeeding" mentality).
						I was optimistic, both about my plan and about Of The Day.
				</Paragraph>
					<Paragraph>
						I quickly learned it wasn't going to work that way for long. I didn't have the time or
						motivation to update the site each night, and those who wanted to view content didn't have the time
						or memory to check it each day. I also didn't have any trips to London to post about, thanks to the pandemic.
				</Paragraph>
					<Paragraph>
						Still, the early days of Of The Day were some of the best for content. I am used to sharing songs and videos with
						those around me, so I already had playlists worth of shareable content at the ready.
						In terms of personal content, I could still share
						my plans around packing up my apartment, getting healthcare, designing t-shirts,
						planning smaller trips to see family, and wandering around Charlotte. Once I traveled to Maine for the summer,
						I could share about trips to the beach.
						It wasn't what I originally planned for my year or my Of The Day content, but it was still pretty good.
				</Paragraph>
					<Paragraph>
						The first version of Of The Day worked well until mid-summer. At that point, I began to run out of
						readily-available media content. My days also started to look more and more similar. Looking to change things up
						and get back into development, I decided to rework Of The Day into a second version.
				</Paragraph>
				</div>
				<div>
					<Subtitle>Version 2: Go Big And Go Home</Subtitle>
					<Paragraph>
						I wanted the second version of Of The Day to be bigger and better. I was frustrated with the design and
						wanted to rework it entirely. Design is one of my weakest areas in web development, so I looked forward to
						learning from the challenge. I also wanted to add in a page to view trends about where I've been, what I've shared,
						and what I've done or planned to do. Similarly, in my life, I wanted to shake things up and show that I'm actively
						doing things.
					</Paragraph>
					<Paragraph>
						Design ended up stalling me for weeks. I constantly revised the design back to earlier stages because I was unhappy
						with what I had created. I also routinely committed a sin of software development:
						instead of splitting design and development into two separate phases, I tried to design as I developed new features.
						This added more unnecessary time to the rewrite. I cannot think of a time where I was so in control of the development
						process and also so frustrated.
					</Paragraph>
					<Paragraph>
						Eventually, <OutLink href='https://youtu.be/X2wLP0izeJE'>this video of Ira Glass</OutLink> helped me push through to the
						end of the project. The video was important for two reasons: one, Ira perfectly described the feeling I had of
						<InlineItalic>knowing</InlineItalic> that what I had created wasn't good but not knowing how to make it better; and two,
						Ira related that the best way to get past that feeling was to <InlineItalic>keep going</InlineItalic> anyway.
						It's better to have 'failed' designs to learn from than to keep trying to perfect one design when I don't yet have
						the skills to perfect it. I finished my crappy designs and built out the rest of the application. Version two went live
						around mid-October, and it's the version that you saw until late March 2021.
					</Paragraph>
					<Paragraph>
						This publishing of version two aligned with my plans to go back to North Carolina to
						work as a voting assistant in the 2020 general election.
						Back in North Carolina, I was reinvigorated by working and by seeing friends and family.
						I got a new MacBook and started designing more as part of work on some Christmas gifts.
						I finally started working on my next big development project. Things were going well.
					</Paragraph>
					<Paragraph>
						Then, of course, the pandemic worsened in the late fall in early winter.
						Staying indoors thanks to the cold and increased cases, I spent most of my days writing code.
						As much as I love to write and talk about programming, it's not really all that exciting as content
						for Of The Day. I also was running dry on videos and quotes to post alongside music.
						Version two of Of The Day, which I had designed to seem less 'empty' when I didn't post,
						actually ended up looking more empty.
						I set quotas for myself of content to post to keep the page somewhat alive. Filling those quotas
						took more and more of my limited free time.
					</Paragraph>
				</div>
				<div>
					<Subtitle>Version 3: Past To Future</Subtitle>
					<Paragraph>
						Before I knew it, it was mid-March, The anniversary of my plan approached. I knew I didn't want to keep Of The Day
						in this state any longer. The home page, with few new posts, now looked unappealing. My to-do lists
						and planning sections laid untouched with no immediate hope for change. I was tired of finding new content.
						I felt trapped by Of The Day and the quotas I set for myself.
					</Paragraph>
					<Paragraph>
						Version three, the version you see today, is designed to help me move past the trapped feeling I had in earlier
						versions. There is no longer a 'plans' or 'to-do' section for me to look at unhappily.
						The design of the main page no longer gives so much importance to a post being from
						<InlineItalic>today</InlineItalic> specifically,
						so I no longer need to stress over finding content to fill each day. The design itself is cleaner and tighter.
						I removed features instead of adding new ones.
						I ended up deleting much more code than I wrote for this version.
					</Paragraph>
					<Paragraph>
						I will not be posting to Of The Day as often. I will post when I feel like it and when I have something worth sharing.
						Despite my earlier beliefs, a lack of posts and content of Of The Day is not a sign that I'm not making the most
						of my time. Some things that I'm doing - like web development - are just not a good fit for
						sharing here. I'm still busy every day, and I'm still looking forward to executing all the plans I originally made.
					</Paragraph>
					<Paragraph>
						In summary: thanks for visiting Of The Day. It's not dead, but it is scaling down quite a bit.
						Feel free to check it a little less often than you usually do. Be safe, and be well.
					</Paragraph>
				</div>
			</div>
		</div>
	);
};