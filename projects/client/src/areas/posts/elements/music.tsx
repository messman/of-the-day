// Handles the music component rendering.

import * as React from 'react';
import { IPostMusic } from 'oftheday-shared';
import { Text, Subtitle, Title } from '@/core/symbol/text';
import { Value, DynamicMargin } from '@/core/layout/common';
import { spacing } from '@/core/style/common';
import { YouTubeVideoFrame } from './video';
import { TagList } from './tag';
import { styled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { FlexRow, Flex } from '@messman/react-common';
import { MusicQuote } from './quote';
import { ElementRoot } from '../post';

interface MusicProps {
	music: IPostMusic;
}

export const Music: React.FC<MusicProps> = (props) => {
	const { music } = props;

	const { title, artist, description, isTop, isNSFW, tags, spotifyLink, geniusLink, youTubeLink, useYouTube, quote, year } = music;

	const tagStrings = React.useMemo(() => {
		return ([isTop ? 'top' : '', isNSFW ? 'NSFW' : '', ...tags]).filter(x => !!x);
	}, [tags, isTop, isNSFW]);

	// Required properties:
	if (!title || !artist || !spotifyLink || !geniusLink || !youTubeLink) {
		return null;
	}

	const yearSuffix = year ? <Text margin={spacing.nudge.top}>{year}</Text> : <></>;

	const embedRender: JSX.Element = useYouTube ? <YouTubeVideoFrame url={youTubeLink} /> : <SpotifyEmbedFrame url={spotifyLink} />;

	const sectionMargin = spacing.large.vertical;

	return (
		<ElementRoot>
			<FlexRow>
				<Flex flex={.6}>
					<DynamicMargin margin={spacing.large.bottom}>
						<Subtitle isBold={true} margin={spacing.small.bottom}>Music</Subtitle>
						<ItalicTitle isBold={true}>{title}</ItalicTitle>
						<Title isBold={true}>{artist}</Title>
						{yearSuffix}
					</DynamicMargin>
					<DynamicMargin margin={sectionMargin}>
						<TagList tags={tagStrings} />
					</DynamicMargin>
					<Value show={description} margin={sectionMargin}>
						{description}
					</Value>
					<Value show={quote} margin={sectionMargin}>
						<MusicQuote lyric={quote} />
					</Value>
					<DynamicMargin margin={sectionMargin}>
						<MusicOutLinks music={music} />
					</DynamicMargin>
				</Flex>
				<Flex >
					<DynamicMargin margin={spacing.medium.left}>
						{embedRender}
					</DynamicMargin>
				</Flex>
			</FlexRow>
		</ElementRoot>
	);
};

const ItalicTitle = styled(Title)`
	font-style: italic;
`;

interface SpotifyEmbedFrameProps {
	url: string;
}

const SpotifyEmbedFrame: React.FC<SpotifyEmbedFrameProps> = (props) => {
	const { url } = props;
	if (!url) {
		return null;
	}

	// Create an embed url.
	const embedUrl = url.replace('/track', '/embed/track');

	return (
		<EmbedContainer>
			<iframe src={embedUrl} height="80" frameBorder="0" allow="encrypted-media"></iframe>
		</EmbedContainer>
	);
};

const EmbedContainer = styled.div`
	iframe {
		width: 100%;
	}
`;

const MusicOutLinks: React.FC<MusicProps> = (props) => {
	const { spotifyLink, youTubeLink, geniusLink } = props.music;
	if (!spotifyLink || !youTubeLink || !geniusLink) {
		return null;
	}

	return (
		<Text>
			<FlexRow justifyContent='space-around'>
				<OutLink href={spotifyLink}>Spotify</OutLink>
				<OutLink href={youTubeLink}>YouTube</OutLink>
				<OutLink href={geniusLink}>Lyrics</OutLink>
			</FlexRow>
		</Text>
	);
};