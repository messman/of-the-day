export function createSpotifyEmbedLink(link: string): string {
	return link.replace('/track', '/embed/track');
}