// Handles the music component rendering.

import * as React from 'react';
import { IPostMusic } from 'oftheday-shared';
import { RegularText, Subtitle, Title } from '@/core/symbol/text';
import { spacing, Spacing } from '@/core/layout/common';
import { YouTubeVideoFrame } from './video';
import { TagList } from './tag';
import { tStyled } from '@/core/style/styled';
import { OutLink } from '@/core/link';
import { FlexRow, Flex } from '@messman/react-common';
import { MusicQuote } from './quote';
import { ElementRoot } from '../post';
import { borderRadiusStyle } from '@/core/style/common';

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

	const yearSuffix = year ? <RegularText margin={spacing.nudge.top}>{year}</RegularText> : <></>;

	const embedRender: JSX.Element = useYouTube ? <YouTubeVideoFrame url={youTubeLink} /> : <SpotifyEmbedFrame url={spotifyLink} />;

	const sectionMargin = spacing.large.vertical;

	return (
		<ElementRoot>
			<FlexRow>
				<Flex flex={.6}>
					<Spacing margin={spacing.large.bottom}>
						<Subtitle margin={spacing.small.bottom}>Music</Subtitle>
						<Title isItalic={true}>{title}</Title>
						<Title>{artist}</Title>
						{yearSuffix}
					</Spacing>
					<Spacing margin={sectionMargin}>
						<TagList margin={spacing.medium.bottom} tags={tagStrings} />
						<RegularText margin={spacing.medium.bottom} show={description}>
							{description}
						</RegularText>
						<MusicOutLinks music={music} />
					</Spacing>
					<Spacing show={quote} margin={spacing.large.value}>
						<MusicQuote lyric={quote} />
					</Spacing>
					<Spacing margin={spacing.large.top}>
						<SeeMoreButton>
							<RegularText color={c => c.buttonActionText}>See All Music</RegularText>
						</SeeMoreButton>
					</Spacing>
				</Flex>
				<Flex>
					<Spacing margin={spacing.medium.left}>
						{embedRender}
					</Spacing>
				</Flex>
			</FlexRow>
		</ElementRoot>
	);
};

const SeeMoreButton = tStyled.button`
	padding: ${spacing.medium.value} ${spacing.large.value};
	${borderRadiusStyle};
	border: none;
	background-color: ${p => p.theme.color.buttonActionBackground};
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

const EmbedContainer = tStyled.div`
	iframe {
		width: 100%;
	}
`;

const MusicOutLinks: React.FC<MusicProps> = (props) => {
	const { spotifyLink, youTubeLink, geniusLink } = props.music;
	if (!spotifyLink || !youTubeLink || !geniusLink) {
		return null;
	}

	const linkSpacing = spacing.medium.right;

	return (
		<div>
			<RegularText isInline={true} margin={linkSpacing}>
				<OutLink href={spotifyLink}>Spotify</OutLink>
			</RegularText>
			<RegularText isInline={true} margin={linkSpacing}>
				<OutLink href={youTubeLink}>YouTube</OutLink>
			</RegularText>
			<RegularText isInline={true}>
				<OutLink href={geniusLink}>Lyrics</OutLink>
			</RegularText>
		</div>
	);
};