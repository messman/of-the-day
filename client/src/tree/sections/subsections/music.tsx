import * as React from "react";
import styled from "@/styles/theme";
import { useAppDataContext } from "@/tree/appData";
import * as Common from "@/styles/common";
import { TextPlaceholder } from "@/styles/placeholder";
import { RenderIf } from "@/unit/components/renderIf";
import { DailyRecord, MusicRecord } from "@/data/apiResponse";
import { TabLink } from "@/unit/components/tabLink";
import { Quote } from "./quote";

interface MusicProps {
	isLoading: boolean
	record: MusicRecord
}

export const Music: React.FC<MusicProps> = (props) => {
	const { isLoading, record } = props;
	if (!isLoading && !record) {
		return null;
	}

	let spotifyEmbedLink = null;
	if (record && record.spotifyLink) {
		spotifyEmbedLink = record.spotifyLink.replace("/track", "/embed/track");
	}

	let youTubeEmbedLink = null;
	if (record && record.youTubeLink) {
		youTubeEmbedLink = record.youTubeLink.replace("https://youtu.be/", "https://www.youtube.com/embed/");
	}

	return (
		<>
			<Common.SubTitle>
				<TextPlaceholder show={isLoading} length={6}>
					{() => <>Song</>}
				</TextPlaceholder>
			</Common.SubTitle>
			<Common.Text>
				<TextPlaceholder show={isLoading} length={16}>
					{() => <>{record.artist} - "{record.title}"</>}
				</TextPlaceholder>
			</Common.Text>

			<Common.Bump>
				<RenderIf show={!!record && !record.isYouTubePreferred}>
					{() =>
						<iframe src={spotifyEmbedLink} width="300" height="80" frameBorder="0" allow="encrypted-media"></iframe>
					}
				</RenderIf>
				<RenderIf show={!!record && record.isYouTubePreferred}>
					{() =>
						<iframe src={youTubeEmbedLink} width="560" height="315" frameBorder="0" allow="encrypted-media" allowFullScreen></iframe>
					}
				</RenderIf>
			</Common.Bump>


			<RenderIf show={!!record && !!record.quote}>
				{() =>
					<Common.Bump>
						<Quote text={record.quote} attribution={null} />
					</Common.Bump>
				}
			</RenderIf>

			<RenderIf show={isLoading || !!record.description}>
				{() =>
					<Common.Bump>
						<Common.Text>
							<TextPlaceholder show={isLoading} length={14}>
								{() => <>{record.description}</>}
							</TextPlaceholder>
						</Common.Text>
					</Common.Bump>
				}
			</RenderIf>

			<RenderIf show={!!record}>
				{() =>
					<Common.Bump>
						<TabLink title="Spotify" url={record.spotifyLink} />
						<TabLink title="YouTube" url={record.youTubeLink} />
						<TabLink title="Genius Lyrics" url={record.geniusLink} />
					</Common.Bump>
				}
			</RenderIf>
		</>
	);
}







