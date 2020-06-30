// Handles the music component rendering.

import * as React from 'react';
import { MusicRecord } from 'oftheday-shared';
// import { Quote } from './quote';
// // import { OutLink } from './link';
// import { Video } from './video';
// import { styled } from '@/core/style/styled';
import { Text } from '@/core/symbol/text';

interface MusicProps {
	record: MusicRecord;
}

export const Music: React.FC<MusicProps> = (props) => {
	const { record } = props;

	if (!record || !record.title) {
		return null;
	}

	// Take the URL we use for the track and turn it into an embed link.
	//const spotifyEmbedLink = record.spotifyLink.replace('/track', '/embed/track');

	return (
		<>
			<Text>{record.artist} - "{record.title}"</Text>

			{/* <div>
				<If show={!record.isYouTubePreferred}>
					{() =>
						<MusicContainer>
							<iframe src={spotifyEmbedLink} height="80" frameBorder="0" allow="encrypted-media"></iframe>
						</MusicContainer>
					}
				</If>
				<If show={record.isYouTubePreferred}>
					{() =>
						<Video link={record.youTubeLink} title={null} description={null} />
					}
				</If>
			</div>

			<If show={record.quote}>
				{() =>
					<div>
						<Quote text={record.quote} attribution={null} />
					</div>
				}
			</If>

			<If show={record.description}>
				{() =>
					<div>
						<Text>{record.description}</Text>
					</div>
				}
			</If>

			<div>
				<OutLink href={record.spotifyLink}>Spotify</OutLink>
				<Spacer />
				<OutLink href={record.youTubeLink}>YouTube</OutLink>
				<Spacer />
				<OutLink href={record.geniusLink}>Lyrics</OutLink>
			</div> */}
		</>
	);
};

// const MusicContainer = styled.div`
// 	iframe {
// 		width: 100%;
// 	}
// `;

// const Spacer = styled.span`
// 	display: inline-block;
// 	width: 2rem;
// `;