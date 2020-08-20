// Handles the music component rendering.

import * as React from 'react';
import { IPostMusic } from 'oftheday-shared';
// import { Quote } from './quote';
// // import { OutLink } from './link';
// import { Video } from './video';
// import { styled } from '@/core/style/styled';
import { Text } from '@/core/symbol/text';
//import { createSpotifyEmbedLink } from '@/services/media/link';
import { LabelValue, postValueMargin, Value } from '@/core/layout/common';

interface MusicProps {
	music: IPostMusic;
}

export const Music: React.FC<MusicProps> = (props) => {
	const { music } = props;

	const { title, artist, description, isTop, isNSFW, tags, spotifyLink, geniusLink, youTubeLink, useYouTube, quote } = music;
	// Required properties:
	if (!title || !artist || !spotifyLink || !geniusLink || !youTubeLink) {
		return null;
	}

	// Take the URL we use for the track and turn it into an embed link.
	//const spotifyEmbedLink = createSpotifyEmbedLink(spotifyLink);

	return (
		<>
			<LabelValue margin={postValueMargin} label='Song'>
				<MusicTitle music={music} />
			</LabelValue>
			<Value margin={postValueMargin}>{description}</Value>
			<Value margin={postValueMargin}>{isTop} {isNSFW} {tags.join()} {useYouTube} {quote}</Value>

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



export const MusicTitle: React.FC<MusicProps> = (props) => {
	const { music } = props;
	// Year is optional, others are required.
	const { title, artist, year } = music;

	const yearSuffix = year ? ` (${year})` : '';

	return (
		<Text><em>{title}</em> by {artist}{yearSuffix}</Text>
	);
};