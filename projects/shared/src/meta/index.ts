export interface IMeta {
	/** If not empty, shows a banner at the top of the page. */
	important: string[];
	/** If not empty, shows an error banner at the top of the page. */
	error: string[];
	/** If not empty, shows an error banner and prevents data from displaying. */
	shutdown: string[];
	spotifyLink: string;
	youTubeLink: string;
	dayNumber: number;
}